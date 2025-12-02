import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: 1,
    title: "CineMatch",
    description: "Social platform for movie lovers featuring smart matching algorithms, real-time chat, discussion forums, and comprehensive movie database integration with TMDB API.",
    image: "/imgs/projects/cinematch.jpg",
    tech: ["React Native", "TypeScript", "Firebase", "NestJS", "TMDB API"],
    githubLink: "https://github.com/Anthonyah131/CineMatch",
    link: ""
  },
  {
    id: 2,
    title: "CineMatch Backend",
    description: "NestJS backend API for CineMatch with Firebase Firestore integration, JWT authentication, TMDB API integration, real-time chat, forums, and comprehensive user management.",
    image: "/imgs/projects/cinematch-backend.jpg",
    tech: ["NestJS", "TypeScript", "Firebase", "JWT", "TMDB API", "Swagger"],
    githubLink: "https://github.com/Anthonyah131/CineMatch-Backend",
    link: ""
  },
  {
    id: 3,
    title: "SGI Avalom",
    description: "Comprehensive inventory management system for Avalom with advanced reporting, multi-user access control, product tracking, and analytics dashboard.",
    image: "/imgs/projects/sgi-avalom.jpg",
    tech: ["Java", "JavaFX", "Oracle DB", "JPA", "Jasper Reports"],
    githubLink: "https://github.com/Anthonyah131/SGI_Avalom",
    link: ""
  },
  {
    id: 4,
    title: "Colyseus Multiplayer Server",
    description: "Real-time multiplayer game server built with Colyseus framework featuring room management, state synchronization, and WebSocket communication.",
    image: "/imgs/projects/colyseus-server.jpg",
    tech: ["Colyseus", "TypeScript", "Node.js", "WebSocket"],
    githubLink: "https://github.com/Anthonyah131/colyseus-server",
    link: ""
  },
  {
    id: 5,
    title: "ClinicaUNA",
    description: "Medical clinic management system with role-based access, appointment scheduling with email notifications, comprehensive medical records, and dynamic report generation.",
    image: "/imgs/projects/clinica-una.jpg",
    tech: ["JavaFX", "Java", "JPA", "REST", "Oracle 21c XE", "Jasper Reports"],
    githubLink: "https://github.com/Anthonyah131/ClinicaUNA",
    link: ""
  },
  {
    id: 6,
    title: "Proyecto Pac-Man",
    description: "Classic Pac-Man game with advanced AI pathfinding algorithms (A*, BFS, DFS, Dijkstra), 10 themed levels, dynamic maze generation, and trophy system.",
    image: "/imgs/projects/pac-man.jpg",
    tech: ["Java 17", "JavaFX", "Maven", "AI Algorithms"],
    githubLink: "https://github.com/Anthonyah131/Proyecto-Pac-Man",
    link: ""
  },
  {
    id: 7,
    title: "Tours Control",
    description: "Tourism management application with interactive maps (MapJFX), 3D image carousel, drag-and-drop uploads, and PDF invoice generation.",
    image: "/imgs/projects/tours-control.jpg",
    tech: ["JavaFX", "Java 17", "Oracle 18c XE", "MapJFX"],
    githubLink: "https://github.com/Anthonyah131/Tours_Control",
    link: ""
  },
  {
    id: 8,
    title: "Monopoly Junior",
    description: "Digital implementation of Monopoly Junior with property management, chance cards, construction mechanics, save/load functionality, and bilingual interface.",
    image: "/imgs/projects/monopoly-junior.jpg",
    tech: ["Java 17", "JavaFX", "Oracle 18c XE", "NetBeans"],
    githubLink: "https://github.com/Anthonyah131/MonopolyJunior",
    link: ""
  },
  {
    id: 9,
    title: "Chrome Dev Assistant",
    description: "Chrome extension for automated debugging powered by AI (Gemini/ChatGPT), with workflow selection and error tracking via Airtable backend.",
    image: "/imgs/projects/chrome-dev-assistant.jpg",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Airtable API"],
    githubLink: "https://github.com/Anthonyah131/ChromeDevAssistant",
    link: ""
  },
];
