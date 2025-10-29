import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviceCapabilities = () => {
  if (typeof window === 'undefined') {
    return {
      shaderSupport: 'medium' as const,
      isMobile: false,
      maxTextureSize: 4096,
      supportsWebGL2: true,
    };
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

  if (!gl) {
    return {
      shaderSupport: 'none' as const,
      isMobile: false,
      maxTextureSize: 0,
      supportsWebGL2: false,
    };
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  // Detect GPU tier
  const highEndGPU = maxTextureSize >= 8192 && !isMobile;
  const midRangeGPU = maxTextureSize >= 4096 && !isMobile;

  return {
    shaderSupport: highEndGPU ? ('high' as const) : midRangeGPU ? ('medium' as const) : ('low' as const),
    isMobile,
    maxTextureSize,
    supportsWebGL2: !!canvas.getContext('webgl2'),
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
