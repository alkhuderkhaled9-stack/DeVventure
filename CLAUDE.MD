# Claude Code Instructions - Portfolio Project

## Project Overview
You are building a professional portfolio website for Khalid Al-Khader, a Software Engineering graduate from Syrian Private University specializing in web development.

## Developer Profile
- **Name**: Khalid Al-Khader (خالد الخضر)
- **Role**: Full-Stack Web Developer / Software Engineer
- **Specialization**: Frontend Development with React & Next.js
- **Education**: Software Engineering, Syrian Private University
- **Core Skills**: React.js, Next.js, Laravel, Database Design, Systems Analysis

## Project Requirements

### Technical Stack
- **Framework**: Next.js 15.0+ with App Router (Turbopack enabled)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4+ (use only core utility classes)
- **3D & Shaders**: Three.js + React Three Fiber + React Three Drei
- **Shader Animations**: GLSL shaders, Shader Materials, Post-processing
- **2D Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React or React Icons
- **Font**: Inter for English, Cairo or Tajawal for Arabic
- **Form Handling**: React Hook Form with EmailJS integration
- **SEO**: Next.js 15 metadata API
- **Theme**: Dark/Light mode with system preference detection
- **Performance**: Turbopack for faster builds

### Design Guidelines
1. **Color Scheme**:
   - Primary: Blue (#3B82F6)
   - Secondary: Indigo (#6366F1)
   - Accent: Cyan (#06B6D4)
   - Dark Background: #0F172A
   - Light Background: #FFFFFF
   - Use gradient accents sparingly

2. **Typography**:
   - Headings: Bold, large, with gradient text effects
   - Body: Clean, readable, 16px base size
   - Code blocks: Monospace font with syntax highlighting

3. **Layout**:
   - Responsive grid system
   - Maximum width container (1280px)
   - Consistent spacing (8px base unit)
   - Sticky navigation header
   - Smooth scroll behavior

## Website Structure

### Shader Animations Setup

#### Required Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.90.0",
    "@react-three/postprocessing": "^2.15.0",
    "glsl": "^1.0.0",
    "leva": "^0.9.35",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0"
  }
}
```

#### Shader Animations to Implement

##### 1. **Hero Section - Liquid Gradient Shader**
```glsl
// Vertex Shader
varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform float uSpeed;
uniform float uNoiseScale;
uniform float uNoiseStrength;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Wave distortion
  float distortion = sin(pos.x * 5.0 + uTime * uSpeed) * 0.1;
  distortion += sin(pos.y * 4.0 + uTime * uSpeed * 0.8) * 0.05;
  
  pos.z += distortion * uNoiseStrength;
  vDistortion = distortion;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

// Fragment Shader
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
  
  gl_FragColor = vec4(color * pulse, uOpacity);
}
```

##### 2. **Background - Particle Wave Field**
```jsx
// Interactive particle system that responds to mouse movement
const ParticleField = () => {
  const particlesCount = 5000;
  const shaderMaterial = {
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uSize: { value: 2.0 },
      uColorA: { value: new THREE.Color('#3B82F6') },
      uColorB: { value: new THREE.Color('#06B6D4') }
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uSize;
      varying vec3 vColor;
      
      void main() {
        vec3 pos = position;
        
        // Mouse influence
        float dist = distance(pos.xy, uMouse);
        pos.z += sin(dist * 10.0 - uTime * 3.0) * 0.1;
        
        // Wave animation
        pos.x += sin(pos.y * 4.0 + uTime) * 0.1;
        pos.y += cos(pos.x * 4.0 + uTime) * 0.1;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = uSize * (300.0 / -mvPosition.z);
        
        vColor = mix(vec3(0.2, 0.5, 1.0), vec3(0.0, 1.0, 0.8), pos.z * 0.5 + 0.5);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
        vec2 center = vec2(0.5);
        float dist = distance(uv, center);
        float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
        
        gl_FragColor = vec4(vColor, opacity * 0.8);
      }
    `
  };
};
```

##### 3. **Skills Section - Morphing Geometry Shader**
```jsx
// Animated morphing shapes representing different skills
const MorphingSkills = () => {
  const shaderCode = {
    vertex: `
      uniform float uTime;
      uniform float uMorph;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Morphing effect
        float morphFactor = sin(uTime * 0.5) * 0.5 + 0.5;
        pos *= 1.0 + morphFactor * uMorph;
        
        // Twist
        float twist = sin(uTime + pos.y * 2.0) * 0.1;
        float cosT = cos(twist);
        float sinT = sin(twist);
        
        mat2 rotation = mat2(cosT, -sinT, sinT, cosT);
        pos.xz = rotation * pos.xz;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragment: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        vec3 color = mix(uColor1, uColor2, fresnel);
        
        // Animated gradient
        color *= 0.8 + 0.2 * sin(vUv.y * 10.0 + uTime * 2.0);
        
        gl_FragColor = vec4(color, 0.9);
      }
    `
  };
};
```

##### 4. **Projects Cards - Holographic Shader**
```glsl
// Create holographic effect for project cards
const HolographicCard = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uTexture: { value: null },
    uHolographic: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform sampler2D uTexture;
    uniform float uHolographic;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    vec3 hologram(vec2 uv) {
      float r = sin((uv.x + uv.y) * 30.0 + uTime * 2.0) * 0.5 + 0.5;
      float g = sin((uv.x - uv.y) * 20.0 - uTime * 1.5) * 0.5 + 0.5;
      float b = sin((uv.x * uv.y) * 40.0 + uTime * 3.0) * 0.5 + 0.5;
      return vec3(r, g, b);
    }
    
    void main() {
      vec4 texture = texture2D(uTexture, vUv);
      vec3 holo = hologram(vUv);
      
      // Mix texture with holographic effect
      vec3 color = mix(texture.rgb, holo, uHolographic * 0.3);
      
      // Add shimmer
      float shimmer = sin(vUv.y * 100.0 + uTime * 5.0) * 0.05;
      color += shimmer;
      
      gl_FragColor = vec4(color, texture.a);
    }
  `
};
```

##### 5. **Contact Section - Fluid Simulation Shader**
```jsx
// Water ripple effect for contact section background
const FluidBackground = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;
    
    float ripple(vec2 uv, vec2 center, float time) {
      float dist = distance(uv, center);
      float wave = sin(dist * 20.0 - time * 3.0) * exp(-dist * 3.0);
      return wave;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Multiple ripples
      float r1 = ripple(uv, vec2(0.3, 0.5), uTime);
      float r2 = ripple(uv, vec2(0.7, 0.3), uTime * 0.8);
      float r3 = ripple(uv, uMouse, uTime * 1.2);
      
      float ripples = r1 + r2 + r3;
      
      // Color gradient
      vec3 color1 = vec3(0.1, 0.3, 0.6);
      vec3 color2 = vec3(0.2, 0.5, 0.8);
      vec3 color = mix(color1, color2, ripples * 0.5 + 0.5);
      
      gl_FragColor = vec4(color, 0.95);
    }
  `
};
```

##### 6. **Loading Screen - DNA Helix Shader**
```jsx
const DNALoader = () => {
  return {
    geometry: new THREE.CylinderGeometry(0.3, 0.3, 5, 8),
    material: {
      vertex: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          float twist = pos.y * 2.0;
          float angle = twist + uTime * 2.0;
          
          pos.x = cos(angle) * 2.0;
          pos.z = sin(angle) * 2.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec3 color = vec3(0.1, 0.5, 1.0);
          color *= 0.5 + 0.5 * sin(vPosition.y * 5.0 + uTime * 3.0);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    }
  };
};
```

#### Implementation Components

##### Main Shader Canvas Component
```jsx
// components/ShaderCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

export default function ShaderCanvas({ children }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {children}
        <EffectComposer>
          <Bloom intensity={0.5} />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Suspense>
      <Preload all />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
```

##### Performance Optimization
```jsx
// Use React.memo and useMemo for shader materials
const ShaderMaterial = React.memo(({ uniforms }) => {
  const material = useMemo(
    () => new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    }),
    []
  );
  
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value = state.mouse;
  });
  
  return material;
});
```

#### Shader Integration Guidelines

1. **Performance Considerations**:
   - Use `will-change: transform` for shader containers
   - Implement LOD (Level of Detail) for complex shaders
   - Throttle mouse events to 60fps
   - Use GPU-optimized textures (power of 2)
   - Implement shader fallbacks for mobile devices

2. **Responsive Shaders**:
   ```jsx
   const useResponsiveShader = () => {
     const [quality, setQuality] = useState('high');
     
     useEffect(() => {
       const checkPerformance = () => {
         if (window.innerWidth < 768) setQuality('low');
         else if (window.innerWidth < 1024) setQuality('medium');
         else setQuality('high');
       };
       
       checkPerformance();
       window.addEventListener('resize', checkPerformance);
     }, []);
     
     return quality;
   };
   ```

3. **Dark/Light Mode Shaders**:
   ```glsl
   uniform bool uDarkMode;
   
   void main() {
     vec3 lightColor = vec3(0.9, 0.9, 1.0);
     vec3 darkColor = vec3(0.1, 0.1, 0.2);
     vec3 baseColor = uDarkMode ? darkColor : lightColor;
     // ... rest of shader
   }
   ```

### 1. Navigation
- Sticky header with blur backdrop
- Logo/Name on the left
- Menu items: Home, About, Skills, Projects, Experience, Contact
- Language toggle (EN/AR)
- Theme toggle (Dark/Light)
- Mobile hamburger menu

### 2. Hero Section
```jsx
// Include:
- Animated greeting ("Hello, I'm")
- Name with gradient effect
- Animated role titles (typewriter effect)
- Brief tagline
- CTA buttons (View Projects, Download CV)
- Animated geometric shapes or particles background
- Social links (GitHub, LinkedIn, Email)
```

### 3. About Section
```jsx
// Include:
- Professional photo (with border gradient)
- Brief bio (2-3 paragraphs)
- Key achievements bullets
- Years of experience counter
- Projects completed counter
- Technologies used counter
```

### 4. Skills Section
```jsx
// Organize into categories:

Frontend:
- React.js (90%)
- Next.js (85%)
- JavaScript/TypeScript (88%)
- HTML/CSS (95%)
- Tailwind CSS (90%)

Backend:
- Laravel (70%)
- PHP (75%)
- Node.js (65%)
- RESTful APIs (80%)

Database & Tools:
- MySQL (80%)
- PostgreSQL (75%)
- Git/GitHub (85%)
- Systems Analysis (80%)
- Database Design (85%)

// Display as:
- Interactive skill bars with animations
- Hover effects showing proficiency
- Icons for each technology
```

### 5. Projects Section
```jsx
// Create 3-4 featured projects with:
- Project card with image/screenshot
- Title and description
- Technologies used (tags)
- Live demo link
- GitHub repository link
- "Featured" badge for best projects
- Hover animations
- Modal or expanded view for details

// Example Projects:
1. "Modern E-Commerce Platform"
   - Next.js, TypeScript, Tailwind, Stripe
   - Full authentication system
   - Shopping cart, payment integration

2. "Task Management System"  
   - React, Laravel API, MySQL
   - Real-time updates
   - Team collaboration features

3. "Real Estate Website"
   - Next.js, Framer Motion, REST API
   - Property listings with filters
   - Interactive map integration

4. "Portfolio Website"
   - Next.js, Tailwind, EmailJS
   - Dark/light theme
   - Multi-language support
```

### 6. Experience/Education Timeline
```jsx
// Timeline format:
- Vertical line with nodes
- Alternating left/right cards
- Include:
  - Software Engineering Degree (Syrian Private University)
  - Any internships
  - Freelance projects
  - Relevant coursework
  - Certifications
```

### 7. Contact Section
```jsx
// Include:
- Contact form (Name, Email, Subject, Message)
- Email validation
- Success/error messages
- Social links grid
- Location (Damascus, Syria)
- Availability status
- Direct email link
- LinkedIn profile link
- GitHub profile link
- Optional: WhatsApp/Telegram
```

### 8. Footer
```jsx
// Include:
- Copyright notice
- Quick links
- Social media icons
- "Built with Next.js and ❤️"
- Back to top button
```

## Initial Setup Commands

```bash
# Create Next.js 15 project with TypeScript and Tailwind
npx create-next-app@latest portfolio --typescript --tailwind --app --turbo

# Install 3D and Shader dependencies
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install glsl leva framer-motion@latest
npm install @types/three --save-dev

# Install additional utilities
npm install react-hook-form emailjs-com lucide-react
npm install clsx tailwind-merge

# Development tools
npm install --save-dev @types/node prettier eslint-config-prettier
```

## Next.js 15 Configuration

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for faster builds
  experimental: {
    turbo: {
      rules: {
        '*.glsl': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
  
  // Image optimization
  images: {
    domains: ['localhost', 'khalid-alkhader.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Webpack configuration for shaders
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    
    return config;
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Standalone output for Docker
  output: 'standalone',
};

module.exports = nextConfig;
```

### package.json
```json
{
  "name": "khalid-alkhader-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0-rc",
    "react-dom": "^19.0.0-rc",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "@react-three/postprocessing": "^2.16.0",
    "framer-motion": "^11.0.0",
    "glsl": "^1.0.0",
    "glslify": "^7.1.1",
    "leva": "^0.9.35",
    "react-hook-form": "^7.48.0",
    "@emailjs/browser": "^3.12.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "next-themes": "^0.2.1",
    "sharp": "^0.33.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4",
    "prettier": "^3.1.1",
    "raw-loader": "^4.0.2",
    "glslify-loader": "^2.0.0"
  }
}
```

## TypeScript Configuration for Shaders

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/shaders/*": ["./src/shaders/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "src/types/shader.d.ts"
  ],
  "exclude": ["node_modules"]
}
```

### Shader Type Definitions
```typescript
// src/types/shader.d.ts
declare module '*.glsl' {
  const value: string;
  export default value;
}

declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}
```

### Component Structure
```jsx
// Every component should follow this pattern:
const ComponentName = () => {
  // State and hooks at the top
  // Helper functions
  // Effects
  // Return JSX with proper formatting
  return (
    <section className="py-16 px-4">
      {/* Component content */}
    </section>
  );
};
```

### File Organization
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── ThemeToggle.tsx
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── hooks/
│   ├── useTheme.ts
│   └── useInView.ts
└── types/
    └── index.ts
```

## Animations & Interactions

### Use Framer Motion for:
- Fade in on scroll
- Stagger children animations
- Hover scale effects
- Page transitions
- Loading states
- Smooth carousel for projects

### Example Animation:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  whileHover={{ scale: 1.05 }}
>
  {/* Content */}
</motion.div>
```

## SEO & Performance

### Metadata
```jsx
export const metadata = {
  title: 'Khalid Al-Khader - Full-Stack Developer',
  description: 'Software Engineer specializing in React, Next.js, and Laravel',
  keywords: ['web developer', 'react developer', 'next.js', 'portfolio'],
  openGraph: {
    title: 'Khalid Al-Khader Portfolio',
    description: 'Full-Stack Web Developer Portfolio',
    images: ['/og-image.png'],
  },
};
```

### Performance Optimizations
- Use Next.js Image component for all images
- Lazy load components below the fold
- Optimize font loading
- Minimize bundle size
- Use dynamic imports for heavy components
- Enable compression
- Implement proper caching headers

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

### Mobile-First Approach
```css
/* Default mobile styles */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

## Deployment Configuration

### Environment Variables
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=
```

### Build Settings
- Output: Static Export or Server-Side
- Node version: 18+
- Build command: `npm run build`
- Output directory: `.next` or `out`

## Arabic/English Support

### Implementation
```jsx
// Use next-i18next or custom solution
// RTL support for Arabic
// Font switching based on language
// Store preference in localStorage
```

## Testing Checklist

Before deployment, ensure:
- [ ] All links work correctly
- [ ] Forms submit successfully  
- [ ] Images load and are optimized
- [ ] Responsive on all devices
- [ ] Dark/Light mode works
- [ ] No console errors
- [ ] SEO meta tags present
- [ ] Loading speed < 3 seconds
- [ ] Accessibility score > 90
- [ ] Cross-browser compatibility
- [ ] Shaders work on all devices (with fallbacks)
- [ ] GPU performance is optimized
- [ ] Memory leaks are prevented
- [ ] Touch interactions work on mobile

## Shader Performance & Mobile Optimization

### Device Detection and Fallbacks
```javascript
// lib/deviceDetection.ts
export const getDeviceCapabilities = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  if (!gl) return { shaderSupport: 'none' };
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const renderer = gl.getParameter(gl.RENDERER);
  
  // Detect GPU tier
  const highEndGPU = maxTextureSize >= 8192 && !isMobile;
  const midRangeGPU = maxTextureSize >= 4096 && !isMobile;
  
  return {
    shaderSupport: highEndGPU ? 'high' : midRangeGPU ? 'medium' : 'low',
    isMobile,
    maxTextureSize,
    supportsWebGL2: !!canvas.getContext('webgl2')
  };
};

// Use in components
const ShaderScene = () => {
  const [quality, setQuality] = useState('high');
  
  useEffect(() => {
    const capabilities = getDeviceCapabilities();
    setQuality(capabilities.shaderSupport);
  }, []);
  
  // Render different shader complexity based on device
  if (quality === 'low') {
    return <SimpleGradientBackground />;
  }
  
  return <ComplexShaderAnimation quality={quality} />;
};
```

### Shader Optimization Guidelines
```glsl
// ❌ BAD - Complex calculations in fragment shader
void main() {
  vec3 color = vec3(0.0);
  for(int i = 0; i < 100; i++) {
    color += complexCalculation(vUv, float(i));
  }
  gl_FragColor = vec4(color, 1.0);
}

// ✅ GOOD - Move calculations to vertex shader when possible
// Vertex shader
varying vec3 vColor;
void main() {
  vColor = calculateColor(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment shader
varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0);
}
```

### Memory Management
```javascript
// Clean up Three.js resources
useEffect(() => {
  return () => {
    // Dispose geometries
    geometry.dispose();
    
    // Dispose materials
    material.dispose();
    
    // Dispose textures
    texture.dispose();
    
    // Remove event listeners
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);
```

### Progressive Enhancement Strategy
```jsx
// Start with CSS, enhance with shaders
const HeroSection = () => {
  const [shaderLoaded, setShaderLoaded] = useState(false);
  
  return (
    <div className="relative">
      {/* CSS Fallback - Always rendered */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500" />
      
      {/* Shader Enhancement - Lazy loaded */}
      <Suspense fallback={null}>
        {shaderLoaded && (
          <Canvas className="absolute inset-0">
            <ShaderAnimation />
          </Canvas>
        )}
      </Suspense>
      
      {/* Content always visible */}
      <div className="relative z-10">
        <h1>Khalid Al-Khader</h1>
      </div>
    </div>
  );
};
```

## Additional Features (Optional)

1. **Blog Section**: MDX blog posts
2. **Animation Libraries**: Three.js for 3D effects
3. **Analytics**: Google Analytics or Vercel Analytics
4. **Comments**: Giscus for blog comments
5. **Newsletter**: Integration with ConvertKit/Mailchimp
6. **PDF Resume**: Downloadable CV
7. **Project Filters**: Category-based filtering
8. **Testimonials**: Client reviews section
9. **Loading Screen**: Custom loading animation
10. **Easter Eggs**: Hidden interactions for fun

## Important Notes

- Focus on performance and user experience
- Keep the design clean and professional
- Ensure all text is readable with good contrast
- Make interactions smooth and intuitive
- Test on real devices, not just browser DevTools
- Consider adding micro-interactions for better UX
- Use semantic HTML for better SEO
- Add proper ARIA labels for accessibility
- Implement error boundaries for better error handling
- Use TypeScript for better type safety (optional but recommended)

## Success Metrics

The portfolio should achieve:
- Lighthouse Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## Final Deliverable

A modern, fast, and beautiful portfolio that:
1. Showcases skills effectively
2. Loads quickly on all devices
3. Provides easy ways to contact
4. Demonstrates coding abilities
5. Stands out from typical portfolios
6. Is easy to maintain and update