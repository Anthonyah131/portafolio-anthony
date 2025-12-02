import { useState } from "react";
import { ExternalLink, Github, Code2, ChevronDown } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  githubLink?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  link,
  githubLink,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-linear-to-br from-white/2 to-white/8 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 flex flex-col will-change-transform hover:z-20">
      {/* Destello azul estilo Star Wars - solo en desktop para mejor rendimiento */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-blue-400/0 to-cyan-500/0 lg:group-hover:from-blue-500/20 lg:group-hover:via-blue-400/15 lg:group-hover:to-cyan-500/20 transition-all duration-300 rounded-lg overflow-hidden"></div>

      {/* Header - Siempre visible (modo acordeón) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-full p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 text-left"
      >
        {/* Icono de proyecto */}
        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-linear-to-br from-slate-800/40 to-slate-700/30 border border-white/10 flex items-center justify-center group-hover:border-blue-400/50 transition-all duration-300">
          <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-blue-400 transition-colors duration-300" />
        </div>

        {/* Título */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 line-clamp-1 tracking-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-400/60"></div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">
              Project
            </span>
          </div>
        </div>

        {/* Ícono de expandir/contraer */}
        <div className="shrink-0">
          <ChevronDown
            className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Content expandible */}
      <div
        className={`relative transition-all duration-300 ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: isExpanded ? "visible" : "hidden" }}
      >
        <div className="p-3 sm:p-4 pt-0 border-t border-white/5">
          {/* Description */}
          <p className="text-[10px] sm:text-xs text-white/60 mb-2.5 sm:mb-3 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
            {tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] text-white/60 font-mono"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <div className="relative group/tech">
                <span className="px-2 py-0.5 text-[9px] sm:text-[10px] text-white/40 font-mono cursor-help">
                  +{tech.length - 3}
                </span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2.5 shadow-2xl min-w-max">
                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                      {tech.slice(3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[9px] sm:text-[10px] text-white/70 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900/95"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 group/link flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-500/30 hover:bg-slate-700/40 border border-white/10 hover:border-blue-400/40 rounded transition-all duration-300"
              >
                <ExternalLink className="w-3 h-3 text-white/60 group-hover/link:text-white transition-colors" />
                <span className="text-[10px] sm:text-xs text-white/60 group-hover/link:text-white transition-colors font-medium">
                  View
                </span>
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 group/link flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-blue-400/40 rounded transition-all duration-300"
              >
                <Github className="w-3 h-3 text-white/60 group-hover/link:text-white transition-colors" />
                <span className="text-[10px] sm:text-xs text-white/60 group-hover/link:text-white transition-colors font-medium">
                  Code
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
