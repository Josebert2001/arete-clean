import tailwindcss from '@tailwindcss/postcss';
import preserveUtilityCascade from './scripts/postcss/preserveUtilityCascade.mjs';

export default {
  plugins: [tailwindcss({ optimize: false }), preserveUtilityCascade()],
};
