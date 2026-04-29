const badges = [
  "Quant Research",
  "Trading",
  "Risk",
  "Portfolio Management",
  "Full Stack"
];

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="reveal">RODRIGO BARROS</h1>
          <p className="reveal">
            {
              "Hello. I’m currently working at the intersection of software and quantitative finance as a junior quantitative trader. I design and ship tools for research, risk, portfolio management, and trading. I enjoy solving complex problems with fast and reliable systems. I often publish open-source code that replicates financial papers and explores quantitative finance research."
              }
          </p>
          <div className="badges">
                {badges.map((label, i) => (
                  <span
                    key={label}
                    className="badge reveal"
                    style={{ animationDelay: `${120 + i * 60}ms` }}
                  >
                    {label}
                  </span>
                ))}
              </div>
        </div>
      </div>
    </section>
  );
}
