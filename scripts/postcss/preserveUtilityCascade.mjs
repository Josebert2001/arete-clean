// Tailwind 3 put base utilities at @tailwind utilities and variants at the end
// of the stylesheet. Existing app styles depend on that order: for example,
// display-heading overrides text-3xl, while sm:text-4xl overrides the heading.
// Keep this ordering during the v4 migration without changing component CSS.
export default function preserveUtilityCascade() {
  return {
    postcssPlugin: 'arete-preserve-utility-cascade',
    OnceExit(root) {
      // The brand palette uses sRGB channels. Avoid an Oklab round trip for
      // opacity-only modifiers, which otherwise changes a few rendered pixels.
      root.walkDecls(declaration => {
        declaration.value = declaration.value.replace(
          /color-mix\(in oklab,\s*rgb\(var\((--[a-z0-9-]+)\)\)\s+([\d.]+)%,\s*transparent\)/g,
          (_, channels, percent) => `rgb(var(${channels}) / ${Number(percent) / 100})`,
        );
      });

      // In v3 a font-size utility with a default line height also replaced a
      // preceding leading-* value. V4 otherwise keeps that value via a variable.
      root.walkDecls('font-size', declaration => {
        const lineHeight = declaration.parent.nodes.find(node =>
          node.type === 'decl' && node.prop === 'line-height' && node.value.includes('var(--tw-leading,'),
        );
        if (lineHeight) declaration.cloneBefore({ prop: '--tw-leading', value: 'initial' });
      });

      // Move responsive/supports wrappers along with their utility rules. Keep
      // authored media queries (which have no escaped variant class) in place.
      // optimize:false prevents Tailwind from merging these with authored CSS;
      // Vite still optimizes the final stylesheet afterwards.
      const variants = root.nodes.filter(node => {
        if (node.type === 'rule' && node.selector.includes('\\:')) return true;
        let containsVariant = false;
        node.walkRules?.(rule => { if (rule.selector.includes('\\:')) containsVariant = true; });
        return containsVariant;
      });
      for (const node of variants) root.append(node);
    },
  };
}
