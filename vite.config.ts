import vinext from "vinext";
import { defineConfig } from "vite";

// Netlify static site: vinext only (no Cloudflare worker bindings).
export default defineConfig({
  plugins: [vinext()],
});
