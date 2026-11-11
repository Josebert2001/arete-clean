// @vitest-environment node
import { describe, expect, it } from 'vitest';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import preserveUtilityCascade from '../../scripts/postcss/preserveUtilityCascade.mjs';

async function compile() {
  const result = await postcss([tailwindcss({ optimize: false }), preserveUtilityCascade()]).process(`
    @theme {
      --breakpoint-sm: 40rem;
      --text-3xl: 1.875rem;
      --text-3xl--line-height: 2.25rem;
      --text-4xl: 2.25rem;
      --text-4xl--line-height: 2.5rem;
      --leading-relaxed: 1.625;
    }
    @theme inline { --color-paper: rgb(var(--paper)); }
    @tailwind utilities source(none);
    @source inline("text-3xl sm:text-4xl leading-relaxed sm:leading-relaxed bg-paper/80");
    .display-heading { line-height: 1.05; }
  `, { from: undefined });
  return result.root;
}

describe('Tailwind migration cascade', () => {
  it('preserves sRGB brand channels for opacity modifiers without an Oklab conversion', async () => {
    const root = await compile();
    const backgrounds = [];
    root.walkDecls('background-color', declaration => backgrounds.push(declaration.value));
    expect(backgrounds).toContain('rgb(var(--paper) / 0.8)');
    expect(backgrounds.some(value => value.includes('color-mix(in oklab'))).toBe(false);
  });

  it('keeps the mobile heading override before desktop typography variants', async () => {
    const root = await compile();
    const selectors = [];
    root.walkRules(rule => selectors.push(rule.selector));
    expect(selectors.indexOf('.text-3xl')).toBeLessThan(selectors.indexOf('.display-heading'));
    expect(selectors.indexOf('.display-heading')).toBeLessThan(selectors.indexOf('.sm\\:text-4xl'));
    expect(selectors.indexOf('.sm\\:text-4xl')).toBeGreaterThan(-1);
  });

  it('lets responsive font sizes replace base leading, with a responsive leading override last', async () => {
    const root = await compile();
    const rules = [];
    root.walkRules(rule => rules.push(rule));
    const text = rules.find(node => node.selector === '.sm\\:text-4xl');
    const leading = rules.find(node => node.selector === '.sm\\:leading-relaxed');
    const resets = [];
    text.walkDecls('--tw-leading', declaration => resets.push(declaration.value));
    expect(resets).toContain('initial');
    expect(rules.indexOf(text)).toBeLessThan(rules.indexOf(leading));
    const values = [];
    leading.walkDecls('line-height', declaration => values.push(declaration.value));
    expect(values).toContain('var(--leading-relaxed)');
  });
});
