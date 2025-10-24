type StatsProps = {
  data: {
    followers: number;
    following: number;
    public_repos: number;
    totals: { stars: number; forks: number };
    topLanguages: { name: string; count: number }[];
    login: string;
  };
};

export default function Stats({ data }: StatsProps) {
  const { followers, public_repos, totals } = data;

  const tiles = [
    { title: "Total stars", value: `★ ${totals.stars}` },
    { title: "Total forks", value: `⑂ ${totals.forks}` },
    { title: "Followers", value: `${followers}` },
    { title: "Public repos", value: `${public_repos}` },
  ];

  return (
    <section id="stats" className="container">
      <h2 className="section-title reveal">stats</h2>

      <div className="stats-tiles">
        {tiles.map((t, i) => (
          <article
            key={t.title}
            className="card stat-tile reveal"
            style={{ animationDelay: `${80 + i * 80}ms` }}
          >
            <div className="stat-number">{t.value}</div>
            <div className="stat-title">{t.title}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
