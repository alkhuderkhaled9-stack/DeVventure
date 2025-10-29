import { useEffect, useState } from 'react';
import { throttle } from '@/lib/utils';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = throttle((ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    }, 16); // ~60fps

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}
