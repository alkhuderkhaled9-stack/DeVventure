import { useEffect, useState } from 'react';
import { getDeviceCapabilities } from '@/lib/utils';
import { DeviceCapabilities } from '@/types';

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    shaderSupport: 'medium',
    isMobile: false,
    maxTextureSize: 4096,
    supportsWebGL2: true,
  });

  useEffect(() => {
    const detected = getDeviceCapabilities();
    setCapabilities(detected);
  }, []);

  return capabilities;
}
