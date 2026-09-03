import React, { useEffect, useRef } from 'react';

interface FloatingParticlesBackgroundProps {
  accentColor?: string;
  enabled?: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  phase: number;
  pulseSpeed: number;
  isAccent: boolean;
  glowRadius: number;
}

export const FloatingParticlesBackground: React.FC<FloatingParticlesBackgroundProps> = ({
  accentColor = '#FF2B2B',
  enabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Adapt particle count to viewport width
    const getParticleCount = (w: number) => {
      if (w < 640) return 32; // Mobile
      if (w < 1024) return 48; // Tablet
      return 64; // Desktop
    };

    let particles: Particle[] = [];

    const createParticle = (initRandomY = true): Particle => {
      // Depth simulation (0: deep/small, 1: foreground/larger)
      const depth = Math.random();
      const isAccent = Math.random() > 0.35; // 65% accent cyber red, 35% neutral white/amber

      const radius = 0.8 + depth * 1.6; // 0.8px to 2.4px
      const baseAlpha = 0.15 + depth * 0.45; // 0.15 to 0.60
      const vy = -(0.1 + depth * 0.28); // Slow upward drift (-0.1 to -0.38 px/frame)
      const vx = (Math.random() - 0.5) * (0.08 + depth * 0.15); // Subtle lateral float

      return {
        x: Math.random() * width,
        y: initRandomY ? Math.random() * height : height + 10,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        vx,
        vy,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        isAccent,
        glowRadius: radius * (2 + depth * 2),
      };
    };

    const initParticles = () => {
      const count = getParticleCount(width);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 2); // Normalize frame step
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.y += p.vy * delta;
        p.x += (p.vx + Math.sin(p.phase) * 0.06) * delta;
        p.phase += p.pulseSpeed * delta;

        // Subtle alpha breathing twinkle
        p.alpha = p.baseAlpha * (0.75 + 0.25 * Math.sin(p.phase));

        // Wrap-around screen bounds
        if (p.y < -15) {
          particles[i] = createParticle(false);
          continue;
        }
        if (p.x < -15) p.x = width + 10;
        if (p.x > width + 15) p.x = -10;

        // Render soft particle glow halo
        ctx.save();
        ctx.globalAlpha = p.alpha;

        const colorHex = p.isAccent ? accentColor : '#FFFFFF';

        // Draw radial glow bloom
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.glowRadius
        );

        if (p.isAccent) {
          gradient.addColorStop(0, colorHex);
          gradient.addColorStop(0.4, 'rgba(230, 46, 0, 0.45)');
          gradient.addColorStop(1, 'rgba(230, 46, 0, 0)');
        } else {
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.35)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw crisp core dot
        ctx.fillStyle = colorHex;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [accentColor, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none z-[1] w-full h-full"
      aria-hidden="true"
    />
  );
};
