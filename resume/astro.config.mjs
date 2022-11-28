import { defineConfig } from 'astro/config';
import prebuild from './prebuild.mjs';
import mdx from '@astrojs/mdx';

/**
 * @type{import('astro').AstroIntegration}
 * */
const myIntegration = {
  name: 'custom-integration',
  hooks: {
    'astro:config:setup': async () => {
      console.log('astro:config:setup');
      await prebuild();
    },
    'astro:build:start': async () => {
      console.log('astro:build:start');
      await prebuild();
    },
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), myIntegration],
  server: { port: 8000 },
});
