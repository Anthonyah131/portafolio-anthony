import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: 1,
    title: "CineMatch",
    description:
      "Social platform for movie lovers featuring smart matching algorithms, real-time chat, discussion forums, and comprehensive movie database integration with TMDB API.",
    image: "/imgs/projects/movieDetails.webp",
    tech: ["React Native", "TypeScript", "Firebase", "TMDB API", "Metro"],
    githubLink: "https://github.com/Anthonyah131/CineMatch",
    link: "",
  },
  {
    id: 2,
    title: "CineMatch Backend",
    description:
      "NestJS backend API for CineMatch with Firebase Firestore integration, JWT authentication, TMDB API integration, real-time chat, forums, and comprehensive user management.",
    image: "/imgs/projects/welcome.webp",
    tech: ["NestJS", "TypeScript", "Firebase", "JWT", "TMDB API", "Swagger"],
    githubLink: "https://github.com/Anthonyah131/CineMatch-Backend",
    link: "",
  },
  {
    id: 3,
    title: "SGI Avalom",
    description:
      "Full property administration platform designed for building owners and accounting staff, managing rentals, payments, contracts, clients, buildings, and financial insights.",
    image: "/imgs/projects/HomePage.webp",
    tech: [
      "React",
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/Anthonyah131/SGI_Avalom",
    link: "",
  },
  {
    id: 4,
    title: "Colyseus Multiplayer Server",
    description:
      "This repository contains the multiplayer server for my PlayCanvas game Whispers in the Woods, an asymmetric 1v1 horror experience.",
    image: "/imgs/projects/WhisperITW.webp",
    tech: ["Colyseus", "PlayCanvas", "TypeScript", "JavaScript"],
    githubLink: "https://github.com/Anthonyah131/colyseus-server",
    link: "",
  },
  {
    id: 5,
    title: "ClinicaUNA",
    description:
      "ClinicaUNA is a JavaFX application that allows managing medical records and appointments for a clinic. It uses web services to connect to a Payara application server and an Oracle 21c XE database. It is a multilingual application that supports Spanish and English.",
    image: "/imgs/projects/Expediente.webp",
    tech: ["JavaFX", "Java", "JPA", "REST", "Oracle 21c XE", "Jasper Reports"],
    githubLink: "https://github.com/Anthonyah131/ClinicaUNA",
    link: "",
  },
  {
    id: 6,
    title: "Proyecto Pac-Man",
    description:
      "Classic Pac-Man game with advanced AI pathfinding algorithms (A*, BFS, DFS, Dijkstra), 10 themed levels, dynamic maze generation, and trophy system.",
    image: "/imgs/projects/1-menu.webp",
    tech: ["Java 17", "JavaFX", "Maven", "AI Algorithms"],
    githubLink: "https://github.com/Anthonyah131/Proyecto-Pac-Man",
    link: "",
  },
  {
    id: 7,
    title: "Tours Control",
    description:
      "Tourism management application with interactive maps (MapJFX), 3D image carousel, drag-and-drop uploads, and PDF invoice generation.",
    image: "/imgs/projects/Tours.webp",
    tech: ["JavaFX", "Java 17", "Oracle 18c XE", "MapJFX"],
    githubLink: "https://github.com/Anthonyah131/Tours_Control",
    link: "",
  },
  {
    id: 8,
    title: "Monopoly Junior",
    description:
      "Digital implementation of Monopoly Junior with property management, chance cards, construction mechanics and save/load functionality.",
    image: "/imgs/projects/Monopoly.webp",
    tech: ["Java 17", "JavaFX", "Oracle 18c XE", "NetBeans"],
    githubLink: "https://github.com/Anthonyah131/MonopolyJunior",
    link: "",
  },
  {
    id: 9,
    title: "Chrome Dev Assistant",
    description:
      "ChromeDevAssistant is a Google Chrome extension designed to aid developers by automating the process of debugging and error resolution through interactive prompts.",
    image: "",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    githubLink: "https://github.com/Anthonyah131/ChromeDevAssistant",
    link: "",
  },
];
