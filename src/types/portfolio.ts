export type ProjectStatus = 'LIVE' | 'COMPLETE' | 'ARCHIVED';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  githubLink?: string;
  genre: string;
  year: string;
  status: ProjectStatus;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  credentialId?: string;
}

export interface Skill {
  name: string;
  icon: string; // devicon class or simple label
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  status: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
}

export interface PersonalInfo {
  name: string;
  greeting: string;
  roles: string[];
  bio: string[];
  location: string;
  education: Education;
  experience: Experience;
  interests: string[];
  social: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  cvLink: string;
  hireEmail: string;
}
