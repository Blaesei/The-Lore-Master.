import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface ConstellationBackgroundProps {
  className?: string;
}

export default function ConstellationBackground({ className = "" }: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);

  // Sync state to ref to avoid re-binding event loops
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Moderate speeds for an ambient feel
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2.5 + 1;
        
        // Use GDG theme colors for nodes
        const colors = [
          "rgba(66, 133, 244, 0.65)",  // Blue
          "rgba(234, 67, 53, 0.65)",   // Red
          "rgba(251, 188, 5, 0.65)",   // Yellow
          "rgba(52, 168, 83, 0.65)",   // Green
          "rgba(75, 85, 99, 0.55)",    // Slate Gray
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number) {
        if (!isPlayingRef.current) return;

        this.x += this.vx;
        this.y += this.vy;

        // Bounce off canvas boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Handle bounds correction
        if (this.x < 0) this.x = 0;
        if (this.x > width) this.x = width;
        if (this.y < 0) this.y = 0;
        if (this.y > height) this.y = height;

        // Interactive mouse push/pull logic
        if (mouseX > -100 && mouseY > -100) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            // Gently drift away from mouse cursor
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowBlur = 4;
        c.shadowColor = this.color;
        c.fill();
        c.shadowBlur = 0; // reset
      }
    }

    // Populate particles
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Watch parent dimensions with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw technical matrix connection grid/lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(mouseX, mouseY);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Line thickness fades based on distance limits
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (150 - dist) / 150 * 0.15;
            ctx.strokeStyle = `rgba(160, 180, 210, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden select-none pointer-events-auto ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      
      {/* Dynamic play/pause control on screen overlay */}
      <button
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-6 right-6 z-10 w-9 h-9 rounded-full bg-white/75 hover:bg-white/95 border border-slate-200 text-slate-700 flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        title={isPlaying ? "Pause background animation" : "Resume background animation"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
    </div>
  );
}
