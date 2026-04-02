import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: 1,
    slug: "cinematch",
    title: "CineMatch",
    genre: "Mobile App",
    year: "2024",
    status: "COMPLETE",
    description:
      "Social platform for movie lovers featuring smart matching algorithms, real-time chat, discussion forums, and comprehensive movie database integration with TMDB API.",
    image: "/imgs/projects/movieDetails.webp",
    synopsis:
      "A mobile-first social platform enabling movie enthusiasts to discover compatible community members through intelligent matching algorithms. Features real-time messaging, discussion threads, and seamless integration with TMDB's comprehensive film database for personalized recommendations.",
    tech: ["React Native", "TypeScript", "Firebase", "TMDB API", "Metro"],
    bts: [
      {
        icon: "🎯",
        title: "Smart Matching System",
        body: "Built a personalized matching algorithm comparing user preference profiles based on rated content, category interests, and activity history to connect like-minded community members and enhance user discovery.",
      },
      {
        icon: "💬",
        title: "Real-Time Communication",
        body: "Implemented Firebase Realtime Database for instant messaging between matched users, with presence indicators, full message history, and push notifications for responsive user engagement.",
      },
    ],
    lessons: [
      {
        num: "01",
        title: "Algorithms Need Domain Context",
        body: "Initial simple category-based matching failed to deliver quality connections. Adding behavioral signals like rating depth and engagement patterns improved match quality significantly, proving that context matters more than volume.",
      },
      {
        num: "02",
        title: "Mobile Performance Cannot Be Secondary",
        body: "Aggressive optimization including lazy loading and render batching reduced cold startup from 3.2s to 1.9s. This 40% improvement taught me that performance is a feature, not an afterthought.",
      },
    ],
    githubLink: "https://github.com/Anthonyah131/CineMatch",
    link: "",
  },
  {
    id: 2,
    slug: "cinematch-backend",
    title: "CineMatch Backend",
    genre: "Backend API",
    year: "2024",
    status: "COMPLETE",
    description:
      "NestJS backend API for CineMatch with Firebase Firestore integration, JWT authentication, TMDB API integration, real-time chat, forums, and comprehensive user management.",
    image: "/imgs/projects/welcome.webp",
    tech: ["NestJS", "TypeScript", "Firebase", "JWT", "TMDB API", "Swagger"],
    githubLink: "https://github.com/Anthonyah131/CineMatch-Backend",
    link: "",
  },
  {
    id: 3,
    slug: "sgi-avalom",
    title: "SGI Avalom",
    genre: "Web App",
    year: "2024",
    status: "COMPLETE",
    description:
      "Full property administration platform designed for building owners and accounting staff, managing rentals, payments, contracts, clients, buildings, and financial insights.",
    image: "/imgs/projects/sgi_avalom.webp",
    tech: ["React", "TypeScript", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubLink: "https://github.com/Anthonyah131/SGI_Avalom",
    link: "",
  },
  {
    id: 4,
    slug: "colyseus-multiplayer",
    title: "Colyseus Multiplayer",
    genre: "Game Server",
    year: "2023",
    status: "ARCHIVED",
    description:
      "Multiplayer server for Whispers in the Woods, an asymmetric 1v1 horror experience built on PlayCanvas. Handles real-time state sync, matchmaking, and game events.",
    image: "/imgs/projects/WhisperITW_poster.webp",
    tech: ["Colyseus", "PlayCanvas", "TypeScript", "JavaScript"],
    githubLink: "https://github.com/Anthonyah131/colyseus-server",
    link: "",
  },
  {
    id: 5,
    slug: "clinicauna",
    title: "ClinicaUNA",
    genre: "Desktop App",
    year: "2023",
    status: "COMPLETE",
    description:
      "JavaFX application for managing medical records and appointments. Connects to a Payara server and Oracle 21c XE database. Multilingual (Spanish / English), with Jasper Reports integration.",
    image: "/imgs/projects/clinica_poster.webp",
    tech: ["JavaFX", "Java", "JPA", "REST", "Oracle 21c XE", "Jasper Reports"],
    githubLink: "https://github.com/Anthonyah131/ClinicaUNA",
    link: "",
  },
  {
    id: 6,
    slug: "proyecto-pac-man",
    title: "Proyecto Pac-Man",
    genre: "Game",
    year: "2023",
    status: "COMPLETE",
    description:
      "Classic Pac-Man with advanced AI pathfinding (A*, BFS, DFS, Dijkstra), 10 themed levels, dynamic maze generation, and a trophy system.",
    image: "/imgs/projects/pacman_poster.webp",
    tech: ["Java 17", "JavaFX", "Maven", "AI Algorithms"],
    githubLink: "https://github.com/Anthonyah131/Proyecto-Pac-Man",
    link: "",
  },
  {
    id: 7,
    slug: "tours-control",
    title: "Tours Control",
    genre: "Desktop App",
    year: "2023",
    status: "COMPLETE",
    description:
      "Tourism management app with interactive maps (MapJFX), 3D image carousel, drag-and-drop uploads, and PDF invoice generation.",
    image: "/imgs/projects/tours_poster.webp",
    tech: ["JavaFX", "Java 17", "Oracle 18c XE", "MapJFX"],
    githubLink: "https://github.com/Anthonyah131/Tours_Control",
    link: "",
  },
  {
    id: 8,
    slug: "monopoly-junior",
    title: "Monopoly Junior",
    genre: "Game",
    year: "2023",
    status: "COMPLETE",
    description:
      "Digital Monopoly Junior with property management, chance cards, construction mechanics and save/load functionality.",
    image: "/imgs/projects/Monopoly_poster.webp",
    tech: ["Java 17", "JavaFX", "Oracle 18c XE"],
    githubLink: "https://github.com/Anthonyah131/MonopolyJunior",
    link: "",
  },
  {
    id: 9,
    slug: "chrome-dev-assistant",
    title: "Chrome Dev Assistant",
    genre: "Extension",
    year: "2024",
    status: "COMPLETE",
    description:
      "Chrome extension that aids developers by automating debugging and error resolution through interactive AI-powered prompts.",
    image: "/imgs/projects/chrome_dev_assistant.webp",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    githubLink: "https://github.com/Anthonyah131/ChromeDevAssistant",
    link: "",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getProjectPagination(slug: string) {
  const currentIndex = projects.findIndex(project => project.slug === slug);
  if (currentIndex === -1) {
    return { previous: undefined, next: undefined, index: -1, total: projects.length };
  }

  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : undefined,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined,
    index: currentIndex,
    total: projects.length,
  };
}
