# Khalid Al-Khader - Portfolio Website

A modern, performant portfolio website built with Next.js 15, React 19, Three.js, and Tailwind CSS.

## Features

- ✨ **Modern Design** - Clean and professional UI with smooth animations
- 🎨 **3D Shaders** - WebGL shaders using Three.js and React Three Fiber
- 🌗 **Dark/Light Mode** - Automatic theme detection with manual toggle
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **High Performance** - Lighthouse score > 90
- 🎭 **Animations** - Smooth transitions using Framer Motion
- 🔧 **TypeScript** - Fully typed for better DX
- 🎯 **SEO Optimized** - Meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **3D Graphics**: Three.js + React Three Fiber + React Three Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/khalid-alkhader/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Add your environment variables:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

Run the development server with Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── layout/          # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/        # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── shaders/         # WebGL shaders
│   │   ├── ShaderCanvas.tsx
│   │   ├── LiquidGradient.tsx
│   │   ├── ParticleField.tsx
│   │   └── GradientFallback.tsx
│   └── ui/              # UI components
│       └── ThemeToggle.tsx
├── hooks/               # Custom hooks
│   ├── useInView.ts
│   ├── useDeviceCapabilities.ts
│   └── useMousePosition.ts
├── lib/                 # Utilities
│   ├── utils.ts
│   └── constants.ts
└── types/               # TypeScript types
    ├── index.ts
    └── shader.d.ts
```

## Customization

### Update Personal Information

Edit `src/lib/constants.ts` to update:
- Personal details
- Social links
- Skills
- Projects
- Experience

### Modify Colors

Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: { DEFAULT: '#3B82F6' },
  secondary: { DEFAULT: '#6366F1' },
  accent: { DEFAULT: '#06B6D4' },
}
```

### Add New Sections

1. Create component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Add navigation link in `src/lib/constants.ts`

## Performance Optimization

- **Device Detection**: Shaders automatically adjust based on device capabilities
- **Lazy Loading**: Heavy components load on-demand
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Fallbacks**: CSS gradients for low-end devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Lighthouse Scores

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- Email: khalid.alkhader@example.com
- LinkedIn: [khalid-alkhader](https://linkedin.com/in/khalid-alkhader)
- GitHub: [khalid-alkhader](https://github.com/khalid-alkhader)

---

Built with ❤️ using Next.js and Tailwind CSS
