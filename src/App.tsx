import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RepoGrid from "./components/RepoGrid";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import BackgroundFX from "./components/BackgroundFX";
import LangPills from "./components/LangPills";
import { fetchReposSortedByRecent, fetchUserStats, type Repo } from "./lib/github";

export default function App() {
  const [repos, setRepos] = React.useState<Repo[] | null>(null);
  const [stats, setStats] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const langList = [
            "Python",
            "Pandas",
            "NumPy",
            "FastAPI",
            "Selenium",
            "PostgreSQL",
            "DuckDB",
            "Rust",
            "TypeScript",
            "React",
            "AWS",
            "Docker"
          ]

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [r, s] = await Promise.all([fetchReposSortedByRecent(), fetchUserStats()]);
        if (!cancelled) {
          setRepos(r);
          setStats(s);
          sessionStorage.setItem("gh-cache-v1", JSON.stringify({ repos: r, stats: s }));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load GitHub data");
      } finally {
      }
    }
    // Try cache first
    const cached = sessionStorage.getItem("gh-cache-v1");
    if (cached) {
      const parsed = JSON.parse(cached);
      setRepos(parsed.repos);
      setStats(parsed.stats);
      load();
    } else {
      load();
    }
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <BackgroundFX />
      <Header />
      {stats ? <Hero name={stats.name} bio={stats.bio} avatar={stats.avatar_url} /> : <Hero />}
      <main>
        {error && <div className="container card" role="alert">Error: {error}</div>}
        {stats && <LangPills langs={langList} />}
        {stats && <Stats data={stats} />}
        {repos && <RepoGrid repos={repos} />}
      </main>
      <Footer />
    </>
  );
}
