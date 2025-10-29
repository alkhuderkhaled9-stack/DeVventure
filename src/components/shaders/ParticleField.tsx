'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  size?: number;
  colorA?: string;
  colorB?: string;
}

export default function ParticleField({
  count = 3000,
  size = 2.0,
  colorA = '#3B82F6',
  colorB = '#06B6D4',
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color(colorA);
    const color2 = new THREE.Color(colorB);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const mixRatio = Math.random();
      const color = color1.clone().lerp(color2, mixRatio);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count, colorA, colorB]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uSize: { value: size },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [size, colorA, colorB]
  );

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uSize;
    attribute vec3 color;
    varying vec3 vColor;

    void main() {
      vColor = color;
      vec3 pos = position;

      // Wave animation
      pos.x += sin(pos.y * 4.0 + uTime) * 0.1;
      pos.y += cos(pos.x * 4.0 + uTime * 0.8) * 0.1;
      pos.z += sin(pos.x * pos.y + uTime * 0.5) * 0.05;

      // Mouse influence (subtle)
      vec2 mouseInfluence = (uMouse - pos.xy) * 0.01;
      pos.xy += mouseInfluence;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = uSize * (300.0 / -mvPosition.z);
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;

    void main() {
      vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
      vec2 center = vec2(0.5);
      float dist = distance(uv, center);
      float opacity = 1.0 - smoothstep(0.0, 0.5, dist);

      gl_FragColor = vec4(vColor, opacity * 0.6);
    }
  `;

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.set(
        (state.mouse.x * state.viewport.width) / 2,
        (state.mouse.y * state.viewport.height) / 2
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
