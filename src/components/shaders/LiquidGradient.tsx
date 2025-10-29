'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LiquidGradientProps {
  colorStart?: string;
  colorEnd?: string;
  speed?: number;
  noiseStrength?: number;
}

export default function LiquidGradient({
  colorStart = '#3B82F6',
  colorEnd = '#06B6D4',
  speed = 1.0,
  noiseStrength = 0.3,
}: LiquidGradientProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uNoiseScale: { value: 5.0 },
      uNoiseStrength: { value: noiseStrength },
      uColorStart: { value: new THREE.Color(colorStart) },
      uColorEnd: { value: new THREE.Color(colorEnd) },
      uOpacity: { value: 0.8 },
    }),
    [colorStart, colorEnd, speed, noiseStrength]
  );

  const vertexShader = `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;
    uniform float uSpeed;
    uniform float uNoiseScale;
    uniform float uNoiseStrength;

    // Simple noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Wave distortion
      float distortion = sin(pos.x * uNoiseScale + uTime * uSpeed) * 0.1;
      distortion += sin(pos.y * 4.0 + uTime * uSpeed * 0.8) * 0.05;
      distortion += noise(uv + uTime * 0.1) * 0.02;

      pos.z += distortion * uNoiseStrength;
      vDistortion = distortion;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform float uOpacity;

    void main() {
      // Gradient with distortion
      vec3 color = mix(uColorStart, uColorEnd, vUv.y + vDistortion);

      // Animated pulse
      float pulse = sin(uTime * 2.0) * 0.1 + 0.9;

      // Add some shimmer
      float shimmer = sin(vUv.x * 20.0 + uTime * 3.0) * 0.05;
      color += shimmer;

      gl_FragColor = vec4(color * pulse, uOpacity);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
