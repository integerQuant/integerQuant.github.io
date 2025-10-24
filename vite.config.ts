// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // For user site or custom domain, leave base undefined.
  // For a project site at username.github.io/repo, set:
  // base: "/repo/"
});
