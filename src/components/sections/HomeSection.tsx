import { useEffect, useState } from "react";
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

  const roles = [
    "Artificial Intelligence",
    "Full Stack Developer",
    "Creative Technologist",
    "3D Web Designer",
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
      className="section-container min-h-screen lg:h-screen flex items-center relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 lg:py-0"
    >
      <div className="w-full max-w-6xl mx-auto animate-fade-in-up">
        <div className="text-white">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold my-6 leading-tight font-starwars tracking-wider">
            hi, i'm <span className="text-gray-400">anthony</span>
          </h1>

          {/* Typewriter */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 min-h-12 inline-flex items-center border backdrop-blur-sm px-6 py-3 rounded-lg">
            <span>{displayText}</span>
            <span className="w-0.5 h-8 md:h-10 bg-white animate-blink ml-1"></span>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-10 max-w-2xl">
            I'm an AI student and web developer. I'm passionate about creating,
            learning, and bringing my ideas to life through programming and
            creativity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="group px-8 py-3 bg-white text-black rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Hire Me</span>
            </a>

            <a
              href="/cv.pdf"
              download
              className="group px-8 py-3 bg-black text-white border border-white/20 rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 items-center">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
              FOLLOW ME
            </span>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent text-gray-400 border border-gray-700 transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-gray-500"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent text-gray-400 border border-gray-700 transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-gray-500"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent text-gray-400 border border-gray-700 transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-gray-500"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
