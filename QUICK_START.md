# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
pnpm install
```

### 2️⃣ Start Development Server
```bash
pnpm dev
```

### 3️⃣ Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## ✅ What's Included

### ✨ Features
- ✅ **Next.js 15** with App Router & Turbopack
- ✅ **React 19** (RC)
- ✅ **Tailwind CSS 3.4** for styling
- ✅ **Three.js + React Three Fiber** for 3D shaders
- ✅ **Framer Motion** for smooth animations
- ✅ **Dark/Light Mode** with next-themes
- ✅ **TypeScript** for type safety
- ✅ **Fully Responsive** design
- ✅ **SEO Optimized** with meta tags

### 📦 Components Created
1. **Navigation** - Sticky header with mobile menu
2. **Hero** - With liquid gradient shader background
3. **About** - Profile and stats
4. **Skills** - Animated progress bars
5. **Projects** - Featured project cards
6. **Experience** - Timeline layout
7. **Contact** - Contact form
8. **Footer** - Social links and info

### 🎨 Shader Animations
- **Liquid Gradient** - Hero background
- **Particle Field** - Interactive particles
- **Gradient Fallback** - For low-end devices

---

## 🔧 Customization

### Update Personal Info
Edit `src/lib/constants.ts`:
```typescript
export const SITE_NAME = 'Your Name';
export const SOCIAL_LINKS = [...];
export const SKILLS = [...];
export const PROJECTS = [...];
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { DEFAULT: '#3B82F6' },  // Blue
  secondary: { DEFAULT: '#6366F1' }, // Indigo
  accent: { DEFAULT: '#06B6D4' },   // Cyan
}
```

### Add EmailJS (Optional)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add to `.env.local`:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📱 Mobile Testing
The site is fully responsive. Test on:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

---

## 🏗️ Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

---

## 📊 Performance Tips

1. **Shaders automatically adapt** to device capabilities
2. **Images are optimized** by Next.js Image component
3. **Code splitting** happens automatically
4. **CSS is purged** in production build
5. **Fallbacks provided** for low-end devices

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### TypeScript errors
```bash
# Check types
pnpm type-check
```

### Port 3000 is in use
```bash
# Use different port
pnpm dev -- -p 3001
```

---

## 📝 Scripts

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm format     # Format code with Prettier
pnpm type-check # Check TypeScript types
```

---

## 🎯 Next Steps

1. ✅ Update personal information in `constants.ts`
2. ✅ Replace placeholder images in `/public/images`
3. ✅ Add your actual projects
4. ✅ Set up EmailJS for contact form
5. ✅ Deploy to Vercel/Netlify
6. ✅ Connect your domain

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build command
pnpm build

# Publish directory
.next
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js](https://threejs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

## 💡 Tips

- Use **Dark Mode** for better shader visibility
- Check **DevTools Console** for any warnings
- Test on **real mobile devices** when possible
- Optimize images before adding them
- Keep dependencies updated

---

## ✨ Features to Add (Optional)

- [ ] Blog with MDX
- [ ] Analytics (Google/Vercel)
- [ ] Newsletter subscription
- [ ] Testimonials section
- [ ] Loading animations
- [ ] Page transitions
- [ ] More shader effects
- [ ] Multilingual support (EN/AR)

---

**Built with ❤️ using Next.js 15, React 19, and Tailwind CSS**

Need help? Check the main [README.md](./README.md) for detailed documentation.
