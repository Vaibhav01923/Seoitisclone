"use client";
import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; sp: number; ph: number };
type Seed = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; s: number; ph: number };
type Fly = { x: number; y: number; ph: number; sp: number; amp: number; drift: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * Animated hero backdrop: twinkling stars, drifting dandelion seeds,
 * pulsing fireflies and the occasional meteor. Fills its nearest
 * positioned ancestor; pauses off-screen; static under reduced motion.
 */
export function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let stars: Star[] = [];
    let seeds: Seed[] = [];
    let flies: Fly[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = 3500;
    let running = false;
    let raf = 0;

    function newSeed(anywhere: boolean): Seed {
      return {
        x: anywhere ? Math.random() * W : -30,
        y: anywhere ? Math.random() * H * 0.75 : H * 0.3 + Math.random() * H * 0.5,
        vx: 0.22 + Math.random() * 0.4,
        vy: -(0.08 + Math.random() * 0.18),
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.012,
        s: 0.55 + Math.random() * 0.75,
        ph: Math.random() * Math.PI * 2,
      };
    }

    function seedField() {
      stars = Array.from({ length: Math.round((W * H) / 9000) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.82,
        r: 0.4 + Math.random() * 1.3,
        a: 0.25 + Math.random() * 0.6,
        sp: 0.4 + Math.random() * 1.4,
        ph: Math.random() * Math.PI * 2,
      }));
      seeds = Array.from({ length: Math.min(16, Math.round(W / 90)) }, () => newSeed(true));
      flies = Array.from({ length: 9 }, () => ({
        x: Math.random() * W,
        y: H * 0.55 + Math.random() * H * 0.4,
        ph: Math.random() * Math.PI * 2,
        sp: 0.3 + Math.random() * 0.5,
        amp: 20 + Math.random() * 40,
        drift: (Math.random() - 0.5) * 0.3,
      }));
    }

    function resize() {
      if (!host || !canvas || !ctx) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return; /* hidden mid-resize — keep last good field */
      W = w;
      H = h;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seedField();
    }

    function drawSeed(sd: Seed, t: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(sd.x, sd.y + Math.sin(t * 0.001 + sd.ph) * 9);
      ctx.rotate(sd.rot);
      ctx.scale(sd.s, sd.s);
      ctx.strokeStyle = "rgba(230,246,236,.55)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.lineTo(0, 15);
      ctx.stroke();
      ctx.fillStyle = "rgba(230,246,236,.7)";
      ctx.beginPath();
      ctx.arc(0, 15, 1.4, 0, 7);
      ctx.fill();
      ctx.strokeStyle = "rgba(230,246,236,.4)";
      for (let k = -3; k <= 3; k++) {
        const ang = k * 0.42;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.lineTo(Math.sin(ang) * 11, 4 - Math.cos(ang) * 11);
        ctx.stroke();
      }
      ctx.restore();
    }

    function frame(t: number) {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const tw = s.a * (0.55 + 0.45 * Math.sin(t * 0.001 * s.sp + s.ph));
        ctx.globalAlpha = tw;
        ctx.fillStyle = "#e6f4ec";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!meteor && t > nextMeteor) {
        meteor = { x: W * (0.2 + Math.random() * 0.6), y: H * 0.05 + Math.random() * H * 0.15, vx: 5.5, vy: 2.6, life: 1 };
      }
      if (meteor) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life -= 0.016;
        const g = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - 70, meteor.y - 33);
        g.addColorStop(0, `rgba(220,255,238,${0.8 * meteor.life})`);
        g.addColorStop(1, "rgba(220,255,238,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - 70, meteor.y - 33);
        ctx.stroke();
        if (meteor.life <= 0 || meteor.x > W + 80) {
          meteor = null;
          nextMeteor = t + 5000 + Math.random() * 8000;
        }
      }
      for (const sd of seeds) {
        sd.x += sd.vx;
        sd.y += sd.vy;
        sd.rot += sd.vr;
        if (sd.x > W + 40 || sd.y < -40) Object.assign(sd, newSeed(false));
        drawSeed(sd, t);
      }
      for (const f of flies) {
        f.ph += 0.012 * f.sp;
        f.x += f.drift;
        if (f.x < -20) f.x = W + 20;
        if (f.x > W + 20) f.x = -20;
        const fx = f.x + Math.sin(f.ph * 1.7) * f.amp;
        const fy = f.y + Math.sin(f.ph) * f.amp * 0.5;
        const glow = 0.35 + 0.65 * Math.abs(Math.sin(f.ph * 2.3));
        ctx.save();
        ctx.globalAlpha = glow;
        ctx.shadowColor = "rgba(255,190,120,.9)";
        ctx.shadowBlur = 14;
        ctx.fillStyle = "#ffd9a3";
        ctx.beginPath();
        ctx.arc(fx, fy, 1.9, 0, 7);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();

    if (reduced) {
      ctx.fillStyle = "#e6f4ec";
      for (const s of stars) {
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return;
    }

    window.addEventListener("resize", resize, { passive: true });
    running = true;
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0].isIntersecting;
        if (vis && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!vis && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(host);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
