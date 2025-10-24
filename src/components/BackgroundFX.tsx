import React from "react";

export default function BackgroundFX() {
  React.useEffect(() => {
    const root = document.documentElement;

    // center by default
    const setCenter = () => {
      root.style.setProperty("--mx", "50%");
      root.style.setProperty("--my", "40%");
    };

    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };

    setCenter();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", setCenter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", setCenter);
    };
  }, []);

  return <div className="bgfx" aria-hidden="true" />;
}
