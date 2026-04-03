import type { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python',     icon: 'python' },
      { name: 'Java',       icon: 'java' },
      { name: 'C++',        icon: 'cplusplus' },
    ],
  },
  {
    category: 'Frontend & Mobile',
    skills: [
      { name: 'React',        icon: 'react' },
      { name: 'Next.js',      icon: 'nextjs' },
      { name: 'React Native', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Sass',         icon: 'sass' },
      { name: 'Bootstrap',    icon: 'bootstrap' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',     icon: 'nodejs' },
      { name: 'NestJS',      icon: 'nestjs' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'Django',      icon: 'django' },
      { name: 'Firebase',    icon: 'firebase' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Oracle DB',  icon: 'oracle' },
      { name: 'MongoDB',    icon: 'mongodb' },
    ],
  },
  {
    category: 'Tools & Cloud',
    skills: [
      { name: 'Git & GitHub', icon: 'github' },
      { name: 'AWS',          icon: 'amazonwebservices' },
      { name: 'Azure',        icon: 'azure' },
      { name: 'Figma',        icon: 'figma' },
      { name: 'VS Code',      icon: 'vscode' },
    ],
  },
  {
    category: 'Game & 3D',
    skills: [
      { name: 'Godot Engine', icon: 'godot' },
      { name: 'Blender',      icon: 'blender' },
      { name: 'Unity',        icon: 'unity' },
      { name: 'Three.js',     icon: 'threejs' },
    ],
  },
];
