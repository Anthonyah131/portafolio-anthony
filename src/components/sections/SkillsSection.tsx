import { useState, useEffect, useRef } from "react";
import ScrollFade from "../ui/ScrollFade";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import {
  Brain,
  MessageCircle,
  Zap,
  Calendar,
  Users,
  Target,
  Ear,
  Rocket,
  Headset,
  Flag,
} from "lucide-react";

const technicalSkills = {
  "Programming Languages": [
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "C++",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
  ],
  "Frontend & Mobile": [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "React Native",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Sass",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    },
    {
      name: "Bootstrap",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "NestJS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    },
    {
      name: "Spring Boot",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    },
    {
      name: "Django",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    },
    {
      name: "Firebase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
  ],
  Databases: [
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Oracle DB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ],
  "Tools & Cloud": [
    {
      name: "Git & GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Azure",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    },
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "VS Code",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
  ],
  "Game & 3D": [
    {
      name: "Godot Engine",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
    },
    {
      name: "Blender",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
    },
    {
      name: "Unity",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    },
  ],
};

const softSkills = [
  { name: "Problem-Solving & Analytical Thinking", icon: Brain },
  { name: "Communication With Clients", icon: MessageCircle },
  { name: "Adaptability & Fast Learning", icon: Zap },
  { name: "Project Management", icon: Calendar },
  { name: "Team Collaboration", icon: Users },
  { name: "Attention to Detail", icon: Target },
  { name: "Active Listening", icon: Ear },
  { name: "Proactive Initiative", icon: Rocket },
  { name: "Customer Service", icon: Headset },
  { name: "Leadership & Guidance", icon: Flag },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"technical" | "soft">("technical");
  useScrollAnimation();
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    const timer = setTimeout(() => {
      if (skillsRef.current) {
        const elements = skillsRef.current.querySelectorAll("[data-scroll]");
        
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                entry.target.classList.remove("is-hidden");
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px",
          }
        );
        
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const isInViewport = 
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0;
          
          if (isInViewport) {
            el.classList.add("is-visible");
            el.classList.remove("is-hidden");
          }
          
          observer?.observe(el);
        });
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activeTab]);

  return (
    <section
      id="skills"
      className="section-container min-h-screen lg:min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-12 xl:py-16 relative overflow-hidden"
    >
      <div className="w-full lg:w-[70%] max-w-4xl sm:max-w-5xl mx-auto lg:mx-0 px-2 sm:px-4">
        <h2 
          data-scroll="fade-up"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold mb-5 sm:mb-6 md:mb-7 text-center lg:text-left font-starwars tracking-wider block"
        >
          <span className="text-white">Skills &</span>{" "}
          <span className="text-gray-400">Abilities</span>
        </h2>

        <div 
          data-scroll="fade-up"
          className="flex gap-2 sm:gap-3 justify-center lg:justify-start mb-3 sm:mb-4"
        >
          <button
            onClick={() => setActiveTab("technical")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
              activeTab === "technical"
                ? "bg-blue-500/30 border-2 border-blue-400 text-white shadow-lg shadow-blue-500/50"
                : "bg-white/5 border-2 border-white/20 text-gray-300 hover:bg-white/10"
            }`}
          >
            Technical Skills
          </button>
          <button
            onClick={() => setActiveTab("soft")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
              activeTab === "soft"
                ? "bg-purple-500/30 border-2 border-purple-400 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/5 border-2 border-white/20 text-gray-300 hover:bg-white/10"
            }`}
          >
            Soft Skills
          </button>
        </div>

        {activeTab === "technical" && (
          <div 
            ref={skillsRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 w-full"
          >
            {Object.entries(technicalSkills).map(([category, skills], catIndex) => (
              <div 
                key={category}
                data-scroll="fade-up"
                className="text-center lg:text-left w-full"
              >
                <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3 text-blue-300 block">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center lg:justify-start w-full">
                  {skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      data-scroll="zoom"
                      className="group relative bg-white/5 backdrop-blur-sm rounded-full px-2 sm:px-2.5 py-2 sm:py-2.5 border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 cursor-default flex items-center gap-1.5 sm:gap-2"
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        loading="lazy"
                        decoding="async"
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 object-contain shrink-0"
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                        <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-blue-400/30 shadow-2xl">
                          <span className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-medium whitespace-nowrap">
                            {skill.name}
                          </span>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "soft" && (
          <div 
            ref={skillsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl sm:max-w-3xl mx-auto lg:mx-0 w-full"
          >
            {softSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  data-scroll="slide-left"
                  className="group bg-white/5 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 border border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 cursor-default"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-purple-300 transition-colors shrink-0" />
                    <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
