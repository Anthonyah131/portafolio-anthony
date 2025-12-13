import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import {
  Sparkles,
  ArrowRight,
  Download,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

export default function HomeSection() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useScrollAnimation();

  const roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Mobile App Developer",
    "Frontend Developer",
  ];
  useEffect(() => {
    const currentRole = roles[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section
      id="home"
      className="section-container min-h-screen lg:min-h-screen flex items-center relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-12 xl:py-16"
    >
      <div className="w-full max-w-5xl mx-auto text-center lg:text-left px-2 sm:px-4">
        <div className="text-white">
          <h1 
            data-scroll="fade-up"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold my-4 sm:my-5 md:my-6 leading-tight font-starwars tracking-wider block"
          >
            hi, i'm <span className="text-gray-400">anthony</span>
          </h1>

          <div 
            data-scroll="fade-up"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-6 sm:mb-7 md:mb-8 min-h-[2.5rem] sm:min-h-12 flex items-center justify-center lg:justify-start border border-white/20 backdrop-blur-sm px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg w-fit mx-auto lg:mx-0"
          >
            <span>{displayText}</span>
            <span className="w-0.5 h-5 sm:h-6 md:h-7 lg:h-8 xl:h-10 bg-white animate-blink ml-1"></span>
          </div>

          <p 
            data-scroll="fade-up"
            className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 mb-8 sm:mb-9 md:mb-10 max-w-2xl mx-auto lg:mx-0 block"
          >
            I'm a full-stack developer with experience designing, building, and
            shipping web and mobile applications. I enjoy working across the
            stack — backend APIs, database design, authentication, deployment —
            while also crafting intuitive and responsive UI experiences. My
            approach combines engineering discipline with clean design and
            product thinking.
          </p>

          <div 
            data-scroll="fade-up"
            className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 justify-center lg:justify-start w-full"
          >
            <a
              href="#contact"
              className="group px-5 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-white text-black rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg text-sm sm:text-base"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Hire Me</span>
            </a>

            <a
              href="/cv/CV_I_Anthony_Avila_H.pdf"
              download="Anthony_Avila_CV.pdf"
              className="group px-5 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-black text-white border border-white/20 rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-white/10 hover:border-white text-sm sm:text-base"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>

          <div 
            data-scroll="fade-up"
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center sm:items-center justify-center lg:justify-start w-full"
          >
            <span className="text-gray-400 sm:text-gray-500 text-xs font-medium uppercase tracking-wider">
              FOLLOW ME
            </span>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.instagram.com/anthah_131"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 transition-all duration-300 hover:text-white"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anthonyah-webdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 transition-all duration-300 hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://github.com/Anthonyah131"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 transition-all duration-300 hover:text-white"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
