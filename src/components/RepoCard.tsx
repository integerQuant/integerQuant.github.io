import React from "react";
import type { Repo } from "../lib/github";
import { clsx } from "clsx";
import { getLanguageColor } from "../lib/languageColors";

export default function RepoCard({
  repo,
  className,
  style
}: {
  repo: Repo;
  className?: string;
  style?: React.CSSProperties;
}) {
  const topics = (repo.topics || []).slice(0, 4);
  const langColor = getLanguageColor(repo.language ?? undefined);

  return (
    <article className={clsx("card", "repo", className)} style={style}>
      <h3>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
      </h3>

      {repo.description && <p>{repo.description}</p>}

      <div className="meta">
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>

        {repo.language && (
          <span
            className="lang"
            style={
              langColor ? ({ ["--lang-color" as any]: langColor } as React.CSSProperties) : undefined
            }
            title={repo.language}
          >
            {repo.language}
          </span>
        )}

        {topics.map(t => (
          <span key={t}>#{t}</span>
        ))}
      </div>
    </article>
  );
}
