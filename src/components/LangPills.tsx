import React from "react";
import { getLanguageColor } from "../lib/languageColors";
import { deviconFor } from "../lib/devicon";

type Lang = string;

export default function LangPills({ langs }: { langs: Lang[] }) {
  return (
    <section id="langs" className="container">
      <h2 className="section-title reveal">langs and tools</h2>
      <div className="lang-pills">
        {langs.map((name, i) => {
          const color = getLanguageColor(name) ?? "var(--accent)";
          const icon = deviconFor(name); // null if not found
          return (
            <span
              key={name}
              className="pill reveal"
              style={{
                ["--pill-color" as any]: color,
                animationDelay: `${40 + i * 40}ms`
              } as React.CSSProperties}
              title={name}
            >
              {icon ? (
                <img
                  className="pill-icon-img"
                  src={icon.url}
                  alt=""
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="pill-icon-fallback" aria-hidden="true" />
              )}
              <span className="pill-name">{name}</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
