'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { EXPERIENCE } from '@/lib/constants';
import { GraduationCap, Briefcase, FolderGit2 } from 'lucide-react';

export default function Experience() {
  const [ref, isInView] = useInView();

  const iconMap = {
    education: GraduationCap,
    work: Briefcase,
    project: FolderGit2,
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            My journey in software development
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {EXPERIENCE.map((exp, index) => {
                const Icon = iconMap[exp.type];
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={exp.id}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    {/* Content */}
                    <div
                      className={`w-full md:w-5/12 ${
                        isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                      }`}
                    >
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            isEven ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                        <p className="text-primary font-semibold mb-2">
                          {exp.company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-950 z-10" />

                    {/* Spacer */}
                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
