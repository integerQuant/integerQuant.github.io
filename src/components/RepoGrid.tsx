import RepoCard from "./RepoCard";
import type { Repo } from "../lib/github";

export default function RepoGrid({ repos }: { repos: Repo[] }) {
  return (
    <section id="projects" className="container">
      <h2 className="section-title reveal">projects</h2>
      <div className="grid">
        {repos.map((r, i) => (
          <RepoCard
            key={r.id}
            repo={r}
            className="reveal"
            style={{ animationDelay: `${80 + i * 110}ms` }}
          />
        ))}
      </div>
    </section>
  );
}
