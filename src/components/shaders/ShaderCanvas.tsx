'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';
import { Preload } from '@react-three/drei';

interface ShaderCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  enableOrbitControls?: boolean;
}

export default function ShaderCanvas({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  enableOrbitControls = false,
}: ShaderCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
