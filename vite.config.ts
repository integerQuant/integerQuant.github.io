import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load .env files for the current mode
  // Looks for .env, .env.local, .env.development, etc. in the project root
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      // Inline as literals so they are always present in the bundle
      "import.meta.env.GITHUB_USERNAME": JSON.stringify(env.GITHUB_USERNAME ?? ""),
      "import.meta.env.GITHUB_TOKEN": JSON.stringify(env.GITHUB_TOKEN ?? "")
    }
  };
});
