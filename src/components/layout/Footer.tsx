'use client';

import { SITE_NAME, SOCIAL_LINKS } from '@/lib/constants';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">{SITE_NAME}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Full-Stack Developer specializing in modern web applications
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary rounded-lg transition-colors group"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
        
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
