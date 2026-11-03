import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CodeBlock from '../components/CodeBlock';

// Text of every token rendered in the given syntax colour.
function tokensOfColour(container, colour) {
  return [...container.querySelectorAll('code span')]
    .filter((el) => el.getAttribute('style')?.includes(`var(--syntax-${colour})`))
    .map((el) => el.textContent);
}

describe('CodeBlock — MATLAB', () => {
  it('labels the block MATLAB', () => {
    const { getByText } = render(<CodeBlock code="x = 1;" language="matlab" />);
    expect(getByText('MATLAB')).toBeInTheDocument();
  });

  it('reads % as a comment and highlights MATLAB keywords', () => {
    const { container } = render(
      <CodeBlock code={'for i = 1:3 % loop\n    disp(i)\nend'} language="matlab" />
    );
    expect(tokensOfColour(container, 'com')).toEqual(['% loop']);
    expect(tokensOfColour(container, 'kw')).toEqual(['for', 'end']);
  });

  // ' after a value is the transpose operator. Read as a quote, it would open a
  // "string" that swallows the rest of the line — trans_A = A'; would turn ';
  // and everything after it string-coloured.
  it('treats a quote after a value as transpose, not a string', () => {
    const { container } = render(
      <CodeBlock code={"trans_A = A'; y = x(1)'; disp('done')"} language="matlab" />
    );
    expect(tokensOfColour(container, 'str')).toEqual(["'done'"]);
  });

  it('still reads a quote after ( or a space as a char array', () => {
    const { container } = render(
      <CodeBlock code={"msg = [name, ' World']; fprintf('%d\\n', n)"} language="matlab" />
    );
    expect(tokensOfColour(container, 'str')).toEqual(["' World'", "'%d\\n'"]);
  });
});
