'use client';

interface GradientFallbackProps {
  colorStart?: string;
  colorEnd?: string;
  className?: string;
}

export default function GradientFallback({
  colorStart = '#3B82F6',
  colorEnd = '#06B6D4',
  className = '',
}: GradientFallbackProps) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`,
        animation: 'gradient 8s ease infinite',
        backgroundSize: '200% 200%',
      }}
    />
  );
}
