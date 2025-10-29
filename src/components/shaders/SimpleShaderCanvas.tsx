'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SimpleShaderCanvasProps {
  children?: ReactNode;
}

export default function SimpleShaderCanvas({ children }: SimpleShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple canvas-based animation fallback
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      time += 0.01;

      const width = canvas.width;
      const height = canvas.height;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsl(${200 + Math.sin(time) * 20}, 80%, 60%)`);
      gradient.addColorStop(0.5, `hsl(${240 + Math.cos(time) * 20}, 70%, 55%)`);
      gradient.addColorStop(1, `hsl(${180 + Math.sin(time * 0.7) * 20}, 75%, 50%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
