"use client";

import React, { useEffect, useRef } from "react";

interface SacredParticlesProps {
  variant?: "marigold" | "diya-ember" | "incense-smoke" | "all";
  quantity?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  type: "marigold" | "ember" | "smoke";
  pulse: number;
}

export const SacredParticles: React.FC<SacredParticlesProps> = ({
  variant = "all",
  quantity = 35,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const marigoldColors = ["#F97316", "#F59E0B", "#EF4444", "#EAB308", "#FB923C"];
    const emberColors = ["#FFD700", "#FFA500", "#FF4500", "#FFF8DC"];
    const smokeColors = ["rgba(255, 248, 220, 0.15)", "rgba(251, 146, 60, 0.1)"];

    const createParticle = (): Particle => {
      let particleType: "marigold" | "ember" | "smoke" = "marigold";
      if (variant === "diya-ember") particleType = "ember";
      else if (variant === "incense-smoke") particleType = "smoke";
      else if (variant === "all") {
        const rand = Math.random();
        if (rand < 0.5) particleType = "marigold";
        else if (rand < 0.85) particleType = "ember";
        else particleType = "smoke";
      }

      const size =
        particleType === "marigold"
          ? Math.random() * 6 + 4
          : particleType === "smoke"
          ? Math.random() * 25 + 15
          : Math.random() * 3 + 1.5;

      const color =
        particleType === "marigold"
          ? marigoldColors[Math.floor(Math.random() * marigoldColors.length)]
          : particleType === "ember"
          ? emberColors[Math.floor(Math.random() * emberColors.length)]
          : smokeColors[Math.floor(Math.random() * smokeColors.length)];

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: (Math.random() - 0.5) * (particleType === "ember" ? 0.8 : 0.4),
        speedY: particleType === "ember" ? -Math.random() * 0.8 - 0.2 : Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: particleType === "smoke" ? 0.25 : 0.8,
        color,
        type: particleType,
        pulse: Math.random() * Math.PI,
      };
    };

    const particles: Particle[] = Array.from({ length: quantity }, createParticle);

    const drawMarigoldPetal = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rotation);
      pCtx.globalAlpha = opacity;
      pCtx.fillStyle = color;

      // 5-petal flower shape or single petal
      pCtx.beginPath();
      pCtx.ellipse(0, 0, size, size * 0.6, 0, 0, Math.PI * 2);
      pCtx.fill();

      // Golden center highlight
      pCtx.beginPath();
      pCtx.fillStyle = "#FEF08A";
      pCtx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      pCtx.fill();

      pCtx.restore();
    };

    const drawEmber = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      pCtx.save();
      pCtx.globalAlpha = opacity;
      pCtx.beginPath();
      pCtx.arc(x, y, size, 0, Math.PI * 2);
      pCtx.fillStyle = color;
      pCtx.shadowBlur = 10;
      pCtx.shadowColor = "#F59E0B";
      pCtx.fill();
      pCtx.restore();
    };

    const drawSmoke = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      pCtx.save();
      pCtx.globalAlpha = opacity;
      const gradient = pCtx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, "rgba(254, 243, 199, 0.2)");
      gradient.addColorStop(0.5, "rgba(245, 158, 11, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      pCtx.fillStyle = gradient;
      pCtx.beginPath();
      pCtx.arc(x, y, size, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.03;

        // Reset if out of bounds
        if (p.y > height + 20 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          p.x = Math.random() * width;
          p.y = p.type === "ember" ? height + 10 : -10;
        }

        const animatedOpacity =
          p.type === "ember"
            ? p.maxOpacity * (0.6 + 0.4 * Math.sin(p.pulse))
            : p.opacity;

        if (p.type === "marigold") {
          drawMarigoldPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, animatedOpacity);
        } else if (p.type === "ember") {
          drawEmber(ctx, p.x, p.y, p.size, p.color, animatedOpacity);
        } else {
          drawSmoke(ctx, p.x, p.y, p.size, p.color, animatedOpacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, quantity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  );
};
