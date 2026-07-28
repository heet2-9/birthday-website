"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speedX: number = 0;
  speedY: number = 0;
  alpha: number = 0;
  decay: number = 0;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number, initialSpawn = false) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset(initialSpawn);
  }

  reset(initialSpawn = false) {
    this.x = Math.random() * this.canvasWidth;
    this.y = initialSpawn
      ? Math.random() * this.canvasHeight
      : this.canvasHeight + 10;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = -(Math.random() * 0.6 + 0.2);
    this.alpha = Math.random() * 0.5 + 0.2;
    this.decay = Math.random() * 0.002 + 0.001;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y < -10) {
      this.reset(false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#ff2a85";
    ctx.fillStyle = "rgba(255, 42, 133, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let particles: Particle[] = [];
    let isTabVisible = document.visibilityState === "visible";
    let isElementIntersecting = true;
    let isReducedMotion = false;
    let resizeTimeout: NodeJS.Timeout | null = null;

    function initParticles() {
      particles = [];
      if (isReducedMotion || !canvas) return;

      const count = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height, true));
      }
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        stopLoop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        startLoop();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    resizeCanvas();

    const shouldAnimate = () => {
      return isTabVisible && isElementIntersecting && !isReducedMotion;
    };

    const animate = () => {
      if (!shouldAnimate()) {
        stopLoop();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (animationFrameId === null && shouldAnimate()) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
      if (isTabVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isElementIntersecting = entry.isIntersecting;
        if (isElementIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    startLoop();

    return () => {
      stopLoop();
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
