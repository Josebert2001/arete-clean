import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RichText from '../components/RichText';

// RichText renders the Markdown subset the AI endpoints emit. The model output
// is untrusted, so the load-bearing security property is: it is NEVER treated as
// HTML. The parser builds React elements (which auto-escape), and there is no
// dangerouslySetInnerHTML anywhere. These tests pin that, plus the basic
// structural rendering the UI relies on.

describe('RichText — XSS safety', () => {
  it('renders HTML tags as literal text, never as live DOM', () => {
    const { container } = render(<RichText text={'<script>alert(1)</script>'} />);
    // The script tag must not become a real element…
    expect(container.querySelector('script')).toBeNull();
    // …it appears as escaped text instead.
    expect(container.textContent).toContain('<script>alert(1)</script>');
  });

  it('does not execute an injected img onerror handler', () => {
    const { container } = render(<RichText text={'<img src=x onerror=alert(1)>'} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders a javascript: URL as inert text, not a link', () => {
    const { container } = render(<RichText text={'[click](javascript:alert(1))'} />);
    expect(container.querySelector('a')).toBeNull();
  });
});

describe('RichText — markdown rendering', () => {
  it('renders a fenced code block', () => {
    const { container } = render(<RichText text={'```java\nint x = 5;\n```'} />);
    expect(container.textContent).toContain('int x = 5;');
  });

  it('renders **bold** as a <strong> element', () => {
    const { container } = render(<RichText text={'This is **important** text'} />);
    const strong = container.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong.textContent).toBe('important');
  });

  it('renders inline `code` as a <code> element', () => {
    const { container } = render(<RichText text={'Use the `print()` function'} />);
    const code = container.querySelector('code');
    expect(code).not.toBeNull();
    expect(code.textContent).toBe('print()');
  });

  it('renders a bulleted list as <ul><li>', () => {
    const { container } = render(<RichText text={'- one\n- two\n- three'} />);
    expect(container.querySelector('ul')).not.toBeNull();
    expect(container.querySelectorAll('li')).toHaveLength(3);
  });

  it('renders a numbered list as <ol>', () => {
    const { container } = render(<RichText text={'1. first\n2. second'} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('renders a heading line', () => {
    const { container } = render(<RichText text={'## Section title'} />);
    expect(container.textContent).toContain('Section title');
    // heading markup (##) is consumed, not shown literally
    expect(container.textContent).not.toContain('##');
  });

  it('handles empty / nullish input without throwing', () => {
    expect(() => render(<RichText text={''} />)).not.toThrow();
    expect(() => render(<RichText text={undefined} />)).not.toThrow();
  });
});
