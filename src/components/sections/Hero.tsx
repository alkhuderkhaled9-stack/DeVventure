'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import dynamic from 'next/dynamic';
import GradientFallback from '@/components/shaders/GradientFallback';

const SimpleShaderCanvas = dynamic(() => import('@/components/shaders/SimpleShaderCanvas'), {
  ssr: false,
  loading: () => <GradientFallback />,
});

export default function Hero() {
  const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animated Canvas */}
      <div className="absolute inset-0 z-0">
        <SimpleShaderCanvas />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <motion.p
            className="text-lg sm:text-xl text-gray-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-white">Khalid Al-Khader</span>
            <br />
            <span className="gradient-text">Full-Stack Developer</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Building modern web applications with{' '}
            <span className="text-primary font-semibold">React</span>,{' '}
            <span className="text-secondary font-semibold">Next.js</span>, and{' '}
            <span className="text-accent font-semibold">Laravel</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
             href="/cv/cv.pdf"
  onClick={(e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/cv/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
                  aria-label={link.name}
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
