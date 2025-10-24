type Props = {
  name?: string;
  bio?: string | null;
  avatar?: string;
};

// export default function Hero({ name, bio }: Props) {
export default function Hero({ }: Props) {
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
          <div className="badges reveal">
            <span className="badge">Quant Research</span>
            <span className="badge">Trading</span>
            <span className="badge">Risk</span>
            <span className="badge">Portfolio Management</span>
            <span className="badge"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
