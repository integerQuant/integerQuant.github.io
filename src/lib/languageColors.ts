
const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Sass: "#a53b70",

  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#D34516",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",

  "Jupyter Notebook": "#DA5B0B",
  R: "#198CE7",
  Shell: "#89e051",
  PowerShell: "#012456",

  React: "#61dafb",
  "Next.js": "#ffffff",
  "Tailwind CSS": "#38bdf8",
  Vite: "#bd34fe",
  Electron: "#9feaf9",
  Remotion: "#f43f5e",
  "TanStack Query": "#ff4154",
  "Plotly.js": "#3f4f75",
  "Node.js": "#5fa04e",
  pnpm: "#f69220",
  Zod: "#3e67b1",

  Haskell: "#5e5086",
  Julia: "#a270ba",
  TeX: "#3D6117",
  Lua: "#000080",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Erlang: "#B83998",

  PostgreSQL: "#2d75afff",
  DuckDB: "#fff100",
  Supabase: "#3ecf8e",
  "Upstash Redis": "#00e9a3",
  Sentry: "#8a5cf5",
  Vercel: "#ffffff",
  OpenAI: "#10a37f",
  "GitHub Actions": "#2088ff",
  Vitest: "#6e9f18",
  Playwright: "#45ba4b",
  Jupyter: "#f37626",
  "scikit-learn": "#f89939",
  statsmodels: "#4b6f95",
  PyArrow: "#e8412e",
  uv: "#de5fe9",
  PyO3: "#ffd43b",
  maturin: "#8b5cf6",
  "ESP-IDF": "#e7352c",
  CMake: "#064f8c",

  aws: "#FF9900",
  docker: "#2496ed",

  pandas: "#8d79dd",
  numpy: "#427f94ff",
  fastapi: "#009688",
  selenium: "#cf0a2b",
  sklearn: "#ffb83e",
  scipy: "#8ca9d1",



};

export function getLanguageColor(name?: string): string | undefined {
  if (!name) return;
  if (languageColors[name]) return languageColors[name];
  const key = Object.keys(languageColors).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? languageColors[key] : undefined;
}
