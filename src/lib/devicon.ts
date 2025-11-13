// Map common names and aliases to devicon slugs and variants
// reference: https://devicon.dev/ naming (e.g. react, typescript, python)
const ALIASES: Record<string, { slug: string; variant?: "original" | "plain" | "plain-colored" | "line" | "original-wordmark" | "plain-wordmark"}> = {
  python: { slug: "python", variant: "original" },
  pandas : { slug: "pandas", variant: "original" },
  numpy : { slug: "numpy", variant: "original" },
  fastapi : { slug: "fastapi", variant: "plain" },
  selenium : { slug: "selenium", variant: "original" },
  sklearn : { slug: "scikitlearn", variant: "original" },
  scipy : { slug: "scipy", variant: "original" },


  sql: { slug: "postgresql", variant: "original" },  
  postgres: { slug: "postgresql", variant: "original" },
  postgresql: { slug: "postgresql", variant: "original" },
  mysql: { slug: "mysql", variant: "original" },
  sqlite: { slug: "sqlite", variant: "original" },
  duckdb: { slug: "duckdb", variant: "original" },

  docker: { slug: "docker", variant: "plain" },

  rust: { slug: "rust", variant: "original" },

  typescript: { slug: "typescript", variant: "original" },
  ts: { slug: "typescript", variant: "original" },

  javascript: { slug: "javascript", variant: "original" },
  js: { slug: "javascript", variant: "original" },

  react: { slug: "react", variant: "original" },
  reactjs: { slug: "react", variant: "original" },

  html: { slug: "html5", variant: "original" },
  css: { slug: "css3", variant: "original" },
  sass: { slug: "sass", variant: "original" },
  scss: { slug: "sass", variant: "original" },

  go: { slug: "go", variant: "original" },
  golang: { slug: "go", variant: "original" },

  aws: { slug: "amazonwebservices", variant: "plain-wordmark" },

  java: { slug: "java", variant: "original" },
  cpp: { slug: "cplusplus", variant: "original" },
  "c++": { slug: "cplusplus", variant: "original" },
  csharp: { slug: "csharp", variant: "original" },
  "c#": { slug: "csharp", variant: "original" },
  c: { slug: "c", variant: "original" },

  github: { slug: "github", variant: "original" },

};

function normalize(name: string) {
  return name.toLowerCase().replace(/\+/g, "p").replace(/[^a-z0-9]/g, "");
}

export function deviconFor(name?: string): { url: string; title: string } | null {
  if (!name) return null;
  const key = normalize(name);
  const hit = ALIASES[key];
  if (!hit) return null;
  const variant = hit.variant ?? "original";
  // devicon SVG url pattern
  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${hit.slug}/${hit.slug}-${variant}.svg`;
  return { url, title: name };
}
