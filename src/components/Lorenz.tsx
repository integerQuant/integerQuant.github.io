import React from "react";
import p5 from "p5";

export default function Lorenz({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const instanceRef = React.useRef<p5 | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      // Tunables
      const SCALE = 10;       
      const MAX_POINTS = 100; 
      let STEPS_PER_FRAME = 1;
      const PD = 1;           

      // Lorenz params
      const sigma = 10;
      const rho = 28;
      const beta = 8 / 3;

      // State
      let x = 0, y = -10, z = 100;
      const dt = 0.005;
      let angle = 0;

      const pts: p5.Vector[] = new Array(MAX_POINTS);
      let count = 0;
      let start = 0;
      const pushPoint = (v: p5.Vector) => {
        if (count < MAX_POINTS) {
          pts[(start + count) % MAX_POINTS] = v;
          count++;
        } else {
          pts[start] = v;
          start = (start + 1) % MAX_POINTS;
        }
      };

      const forEachPoint = (cb: (v: p5.Vector, i: number) => void) => {
        for (let i = 0; i < count; i++) {
          const idx = (start + i) % MAX_POINTS;
          cb(pts[idx], i);
        }
      };

      const getSize = () => {
        const el = containerRef.current!;
        return { w: el.clientWidth || 400, h: el.clientHeight || 300 };
      };

      p.setup = () => {
        p.setAttributes({
          alpha: true,
          antialias: true,
          depth: false,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        });

        const { w, h } = getSize();
        const canvas = p.createCanvas(w, h, p.WEBGL);
        canvas.style("display", "block");
        canvas.style("background", "transparent");

        p.pixelDensity(PD);
        p.noFill();
        p.stroke(255, 230);
        p.strokeWeight(1);
        p.frameRate(60);
        p.clear();
      };

      p.windowResized = () => {
        const { w, h } = getSize();
        p.resizeCanvas(w, h);
      };

      p.draw = () => {
        // Keep the canvas transparent
        p.clear();

        // Light adaptive step count. Eases up when frame time is high.
        const target = 1000 / 60;
        if (p.deltaTime > target * 1.5 && STEPS_PER_FRAME > 1) STEPS_PER_FRAME--;
        else if (p.deltaTime < target * 0.9 && STEPS_PER_FRAME < 6) STEPS_PER_FRAME++;

        // Integrate a few steps per frame
        for (let i = 0; i < STEPS_PER_FRAME; i++) {
          const dx = sigma * (y - x);
          const dy = x * (rho - z) - y;
          const dz = x * y - beta * z;
          x += dx * dt;
          y += dy * dt;
          z += dz * dt;
          pushPoint(p.createVector(x, y, z));
        }

        p.push();
        p.scale(SCALE);
        p.rotateY(angle * 0.5);
        p.rotateX(angle * 0.2);

        // One path, one stroke. Much cheaper than many line calls with varying alpha.
        p.beginShape();
        forEachPoint(v => p.vertex(v.x, v.y, v.z));
        p.endShape();

        p.pop();
        angle += 0.01;
      };
    };

    const inst = new p5(sketch, containerRef.current);
    instanceRef.current = inst;
    return () => { instanceRef.current?.remove(); instanceRef.current = null; };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", position: "relative" }}
      aria-hidden="true"
    />
  );
}
