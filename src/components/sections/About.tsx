'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Code2, Database, Layout } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const [ref, isInView] = useInView();

  const stats = [
    { label: 'Months Experience', value: '3', icon: Code2 },
    { label: 'Projects Completed', value: '6', icon: Layout },
    { label: 'Technologies', value: '15+', icon: Database },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Get to know more about who I am and what I do
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1 shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <Image
                    src="/images/profile.jpg"
                    alt="Khalid Al-Khader"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 -left-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-8 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Software Engineer & Full-Stack Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I&apos;m a Software Engineering graduate from Syrian Private University,
                specializing in building modern web applications with clean code and
                elegant design.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                My expertise lies in React, Next.js, and Laravel, and I&apos;m passionate
                about creating seamless user experiences and scalable backend systems.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
