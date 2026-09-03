import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Sparkles, Video as VideoIcon, Eye, EyeOff } from 'lucide-react';

interface CyberVideoCanvasProps {
  accentColor?: string;
  enabled?: boolean;
}

export const CyberVideoCanvas: React.FC<CyberVideoCanvasProps> = ({
  accentColor = '#E11D74',
  enabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Futuristic tech nodes and particles
  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for neural mesh
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // Laser scanline state
    let scanlineY = 0;

    // Digital glyph stream
    const glyphs = '01MYKA9XFZ87#_<>[]'.split('');
    const streams: { x: number; y: number; speed: number; chars: string[] }[] = [];
    const streamCount = Math.min(Math.floor(width / 120), 12);
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 1.5 + 0.8,
        chars: Array.from({ length: 6 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]),
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing neural mesh connections
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(225, 29, 116, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce at boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dynamicAlpha = Math.sin(time * 2 + i) * 0.2 + 0.5;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 116, ${dynamicAlpha * 0.2})`;
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha * 0.8})`;
        ctx.fill();
      }

      // 3. Scanline sweep
      scanlineY += 1.8;
      if (scanlineY > height + 100) scanlineY = -50;

      const scanGrad = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY + 40);
      scanGrad.addColorStop(0, 'rgba(225, 29, 116, 0)');
      scanGrad.addColorStop(0.5, 'rgba(225, 29, 116, 0.08)');
      scanGrad.addColorStop(1, 'rgba(225, 29, 116, 0)');

      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanlineY - 40, width, 80);

      // Fine high-tech laser line
      ctx.beginPath();
      ctx.moveTo(0, scanlineY);
      ctx.lineTo(width, scanlineY);
      ctx.strokeStyle = 'rgba(225, 29, 116, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Subtle cyber glyph vertical streams
      ctx.font = '10px "JetBrains Mono", monospace';
      for (let s = 0; s < streams.length; s++) {
        const str = streams[s];
        str.y += str.speed;
        if (str.y > height + 80) {
          str.y = -50;
          str.x = Math.random() * width;
        }

        for (let c = 0; c < str.chars.length; c++) {
          const charY = str.y - c * 16;
          if (charY > 0 && charY < height) {
            const charAlpha = (1 - c / str.chars.length) * 0.25;
            ctx.fillStyle = c === 0 ? 'rgba(255, 255, 255, 0.6)' : `rgba(225, 29, 116, ${charAlpha})`;
            ctx.fillText(str.chars[c], str.x, charY);
          }
        }
      }

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, isPlaying, accentColor]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050508] select-none">
      {/* 1. Real Cyber Ambient Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-25' : 'opacity-0'
        }`}
        poster=""
      >
        {/* Abstract cyber dark particles video stream (lightweight WebM/MP4) */}
        <source
          src="https://cdn.pixabay.com/video/2020/05/25/40149-425021276_tiny.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. Interactive High-Tech Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 3. Deep Cyber Nebula Orbs */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[500px] rounded-full blur-[140px] opacity-35"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(147, 51, 234, 0.4) 40%, transparent 75%)`,
        }}
      />
      <div
        className="absolute top-1/2 -right-36 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25"
        style={{
          background: `radial-gradient(circle, #9333EA 0%, ${accentColor} 40%, transparent 75%)`,
        }}
      />
      <div
        className="absolute bottom-10 -left-36 w-[550px] h-[550px] rounded-full blur-[160px] opacity-20"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* 4. Orbital Digital Concentric Rings */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="cyberRingGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FF2E93" stopOpacity="0.5" />
            <stop offset="60%" stopColor={accentColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="50%"
          cy="30%"
          rx="340"
          ry="190"
          fill="none"
          stroke="url(#cyberRingGrad)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          className="animate-[spin_90s_linear_infinite]"
        />
        <ellipse
          cx="50%"
          cy="30%"
          rx="520"
          ry="280"
          fill="none"
          stroke="url(#cyberRingGrad)"
          strokeWidth="0.8"
          strokeDasharray="2 12"
        />
      </svg>

      {/* 5. Matrix / High-Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_65%,transparent_100%)]" />

      {/* 6. Discreet Floating Controls (bottom left) */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-auto flex items-center gap-1.5">
        <button
          onClick={togglePlayback}
          className="p-2 rounded-full bg-[#0A0A10]/80 hover:bg-[#141420] text-neutral-400 hover:text-white border border-neutral-800 transition-all backdrop-blur-md shadow-lg group"
          title={isPlaying ? 'Pausar Efeitos de Fundo' : 'Retomar Efeitos de Fundo'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-magenta-400 group-hover:scale-110" style={{ color: accentColor }} />
          ) : (
            <Play className="w-3.5 h-3.5 text-neutral-400 group-hover:scale-110" />
          )}
        </button>

        <span className="text-[10px] font-['JetBrains_Mono',monospace] text-neutral-500 uppercase px-2 py-1 rounded bg-[#0A0A10]/70 border border-neutral-800/80 backdrop-blur-md hidden sm:inline-block">
          {isPlaying ? 'FX // ATIVO' : 'FX // PAUSADO'}
        </span>
      </div>
    </div>
  );
};
