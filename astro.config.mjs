import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import tailwind from '@astrojs/tailwind';
import svelte from "@astrojs/svelte";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  env: {
    TOKEN: process.env.TOKEN
  },
  integrations: [tailwind(), svelte()]
});