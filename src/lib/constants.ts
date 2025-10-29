import { Project, SkillCategory, Experience, SocialLink } from '@/types';

export const SITE_NAME = 'Khalid Al-Khader';
export const SITE_TITLE = 'Khalid Al-Khader - Full-Stack Developer';
export const SITE_DESCRIPTION =
  'Software Engineer specializing in React, Next.js, and Laravel. Building modern web applications with clean code and elegant design.';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alkhuderkhaled9-stack',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/khalid-alkhuder-a45152337',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:alkhuderkhaled9@gmail.com',
    icon: 'mail',
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'JavaScript/TypeScript', level: 88 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Laravel', level: 70 },
      { name: 'PHP', level: 75 },
      { name: 'RESTful APIs', level: 80 },
    ],
  },
  {
    category: 'Database & Tools',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Git/GitHub', level: 85 },
      { name: 'Systems Analysis', level: 80 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'XO Game',
    description: 'Interactive Tic-Tac-Toe game with modern UI and smooth animations',
    longDescription:
      'A classic XO (Tic-Tac-Toe) game built with React featuring an intuitive interface, win detection algorithm, and responsive design. Perfect for quick entertainment and showcasing fundamental React concepts.',
    image: '/images/projects/xo-game.jpg',
    technologies: ['Next', 'TypeScript', ' Tailwind CSS', 'Vercel'],
    liveUrl: 'https://xo-game-ashen.vercel.app/',
    githubUrl: 'https://github.com/alkhuderkhaled9-stack/XO-game',
    featured: true,
  },
  {
    id: '2',
    title: 'Plus Seven Real Estate',
    description: 'Professional real estate company website with property listings and services',
    longDescription:
      'Complete website for Plus Seven Real Estate company featuring property listings, company services, contact forms, and professional design. Built to showcase real estate offerings and facilitate client communication.',
    image: '/images/projects/plus7even.jpg',
    technologies: ['php', 'laravel', 'Tailwind CSS', 'Responsive Design'],
    liveUrl: 'https://plus7even.com/',
    githubUrl: '',
    featured: true,
  },
  {
    id: '3',
    title: 'Movie Browser & Rating Platform',
    description: 'Browse, search, and rate movies with detailed information and ratings',
    longDescription:
      'A comprehensive movie platform where users can discover, browse, and rate movies. Features include movie search, detailed information display, user ratings, and an intuitive interface for movie enthusiasts.',
    image: '/images/projects/movies.jpg',
    technologies: ['Next', 'API Integration', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://move-swart.vercel.app/',
    githubUrl: 'https://github.com/alkhuderkhaled9-stack/Move',
    featured: true,
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'Personal portfolio with modern animations and responsive design',
    longDescription:
      'A professional portfolio website featuring smooth animations, responsive design, and modern UI. Built with Next.js, showcasing projects, skills, and experience with an elegant and user-friendly interface.',
    image: '/images/projects/portfolio.jpg',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://khalid-alkhader.vercel.app',
    githubUrl: 'https://github.com/alkhuderkhaled9-stack/portfolio',
    featured: true,
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    title: 'Software Engineering Degree',
    company: 'Syrian Private University',
    period: '2020 - 2025',
    description:
      'Pursuing degree in Software Engineering. Specialized in web development, database systems, and software architecture.',
    type: 'education',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Doptica Agency',
    period: '3 Months',
    description:
      'Worked as a Frontend Developer at Doptica Agency, building modern web applications using React and Next.js. Collaborated with the team on client projects and enhanced user interfaces.',
    type: 'work',
  },
];

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
