import { useState, useEffect } from "react";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`
        fixed top-3 sm:top-4 md:top-5 left-1/2 -translate-x-1/2 z-40 px-1.5 sm:px-2 py-1 sm:py-1.5 
        bg-white/95 lg:bg-white/95 backdrop-blur-xl rounded-full shadow-lg border border-white/40 lg:border-white/40
        transition-all duration-300 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}
        max-w-[95vw] sm:max-w-none
      `}
    >
      <nav className="flex gap-1 sm:gap-1.5 md:gap-3 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                group relative px-2 sm:px-2.5 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full
                transition-all duration-300 ease-out
                flex items-center gap-1 sm:gap-1.5 md:gap-2
                ${
                  activeSection === item.id
                    ? "bg-black text-white shadow-lg"
                    : "bg-transparent text-gray-700 hover:bg-gray-300 hover:text-black"
                }
              `}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline text-sm font-semibold">
                {item.label}
              </span>
              {/* Tooltip para móvil y tablet */}
              <span className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 sm:py-1.5 bg-black text-white text-[10px] sm:text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
