
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
  Rust: "#dea584",
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

  Haskell: "#5e5086",
  Julia: "#a270ba",
  TeX: "#3D6117",
  Lua: "#000080",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Erlang: "#B83998",

  PostgreSQL: "#336791",
  DuckDB: "#fff100",

  aws: "#FF9900",
  docker: "#2496ed",

  pandas: "#8d79dd",
  numpy: "#013243",
  fastapi: "#009688",
  selenium: "#cf0a2b",



};

export function getLanguageColor(name?: string): string | undefined {
  if (!name) return;
  if (languageColors[name]) return languageColors[name];
  const key = Object.keys(languageColors).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? languageColors[key] : undefined;
}
