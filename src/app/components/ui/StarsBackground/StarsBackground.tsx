"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  blinker: boolean;
  /** Spring offset from cursor repulsion (draw position) */
  offX: number;
  offY: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  tail: number;
};

const MAX_SHOOTING = 3;
const SPAWN_CHANCE = 0.0028;

const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const starCount = 200;

    const mouse = { x: 0, y: 0, active: false };

    const randomSpeed = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.08 + 0.015;
      return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        const { vx, vy } = randomSpeed();
        const blinker = Math.random() < 0.38;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.55 + 0.45,
          twinkleSpeed: blinker
            ? Math.random() * 0.045 + 0.028
            : Math.random() * 0.014 + 0.006,
          twinklePhase: Math.random() * Math.PI * 2,
          blinker,
          offX: 0,
          offY: 0,
        });
      }
    };

    setCanvasSize();
    initStars();

    const spawnShootingStar = () => {
      if (shootingStars.length >= MAX_SHOOTING) return;
      const speed = 6.5 + Math.random() * 6.5;
      const fromTop = Math.random() < 0.62;
      let x: number;
      let y: number;
      let vx: number;
      let vy: number;
      if (fromTop) {
        x = Math.random() * canvas.width * 1.15 - canvas.width * 0.075;
        y = -40 - Math.random() * 100;
        const angle = Math.PI * 0.22 + Math.random() * Math.PI * 0.38;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      } else {
        x = -50 - Math.random() * 120;
        y = Math.random() * canvas.height * 0.6;
        const angle = -Math.PI * 0.08 + Math.random() * Math.PI * 0.28;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }
      shootingStars.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 58 + Math.floor(Math.random() * 52),
        tail: 72 + Math.random() * 88,
      });
    };

    const drawShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;

        const speed = Math.hypot(s.vx, s.vy) || 1;
        const nx = -s.vx / speed;
        const ny = -s.vy / speed;
        const tailX = s.x + nx * s.tail;
        const tailY = s.y + ny * s.tail;
        /** Unit perpendicular (for wedge width at head) */
        const px = -ny;
        const py = nx;

        const fadeIn = Math.min(1, s.life / 5);
        const fadeOut = Math.min(
          1,
          Math.max(0, 1 - (s.life - s.maxLife * 0.72) / (s.maxLife * 0.28)),
        );
        const alpha = fadeIn * fadeOut;

        if (s.life >= s.maxLife || alpha <= 0.02) {
          shootingStars.splice(i, 1);
          continue;
        }

        if (
          s.x < -s.tail * 2 ||
          s.y < -s.tail * 2 ||
          s.x > canvas.width + s.tail * 2 ||
          s.y > canvas.height + s.tail * 2
        ) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Tapered wedge (triangle): sharp tail point → wider leading edge + bright nucleus
        const headHalfW = 1.35;
        const hx1 = s.x + px * headHalfW;
        const hy1 = s.y + py * headHalfW;
        const hx2 = s.x - px * headHalfW;
        const hy2 = s.y - py * headHalfW;

        const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        g.addColorStop(0, `rgba(255, 255, 255, ${0.97 * alpha})`);
        g.addColorStop(0.06, `rgba(248, 252, 255, ${0.72 * alpha})`);
        g.addColorStop(0.22, `rgba(215, 240, 255, ${0.32 * alpha})`);
        g.addColorStop(0.5, `rgba(175, 220, 255, ${0.1 * alpha})`);
        g.addColorStop(1, "rgba(150, 210, 255, 0)");

        ctx.save();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(hx1, hy1);
        ctx.lineTo(hx2, hy2);
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    };

    const wrap = (star: Star) => {
      if (star.x < 0) star.x += canvas.width;
      if (star.x > canvas.width) star.x -= canvas.width;
      if (star.y < 0) star.y += canvas.height;
      if (star.y > canvas.height) star.y -= canvas.height;
    };

    const influenceRadius = 140;
    const maxPush = 36;
    const spring = 0.18;

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onPointerLeaveWindow = (e: MouseEvent) => {
      if (e.relatedTarget == null) {
        mouse.active = false;
      }
    };

    const onWindowBlur = () => {
      mouse.active = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mouseout", onPointerLeaveWindow);
    window.addEventListener("blur", onWindowBlur);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < SPAWN_CHANCE) {
        spawnShootingStar();
      }

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        wrap(star);

        let targetOffX = 0;
        let targetOffY = 0;
        let cursorFalloff = 0;

        if (mouse.active) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.max(Math.hypot(dx, dy), 0.001);
          if (dist < influenceRadius) {
            const t = 1 - dist / influenceRadius;
            cursorFalloff = t * t;
            const push = maxPush * cursorFalloff;
            targetOffX = (dx / dist) * push;
            targetOffY = (dy / dist) * push;
          }
        }

        star.offX += (targetOffX - star.offX) * spring;
        star.offY += (targetOffY - star.offY) * spring;

        star.twinklePhase += star.twinkleSpeed;
        const sine = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        let twinkle: number;
        if (star.blinker) {
          twinkle = 0.12 + 0.88 * Math.pow(sine, 4);
        } else {
          twinkle = 0.42 + 0.58 * sine;
        }

        const highlight = 1 + 0.85 * cursorFalloff;
        const currentOpacity = Math.min(1, star.opacity * twinkle * highlight);

        const drawX = star.x + star.offX;
        const drawY = star.y + star.offY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      drawShootingStars();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      initStars();
      shootingStars.length = 0;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseout", onPointerLeaveWindow);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden
    />
  );
};

export default StarsBackground;
