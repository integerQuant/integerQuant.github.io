import { deviconFor } from "../lib/devicon";

export default function Header() {
  const githubIcon = deviconFor("github");

  return (
    <header className="site container site-header">
      <div className="header-container">
        <div className="brand">
          <span className="name">RMTB</span>
          <span className="desc">full stack quant developer</span>
          <span className="desc loc">São Paulo | Brazil</span>
          <span className="desc con">
            get in touch{" "}
            <a className="mail" href="mailto:rodrigomtorresb@gmail.com">
              rodrigomtorresb@gmail.com
            </a>
          </span>
        </div>

        {githubIcon && (
          <a
            href="https://github.com/integerQuant"
            className="github-link"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={githubIcon.url}
              alt={githubIcon.title}
              className="github-icon"
            />
          </a>
        )}
      </div>
    </header>
  );
}
