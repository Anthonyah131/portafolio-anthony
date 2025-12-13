import { X, ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
    githubLink?: string;
  } | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Pequeño delay para activar animación
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = "";
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* Backdrop oscuro elegante */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal Container - Slide up en móvil, fade/zoom en desktop */}
      <div
        className={`relative w-full sm:w-auto sm:max-w-2xl bg-[#0a0a0f] sm:bg-white/95 sm:dark:bg-zinc-950/95 backdrop-blur-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          isAnimating 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full sm:translate-y-0 opacity-0 sm:opacity-0 scale-95 sm:scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '90vh',
          height: 'auto'
        }}
      >
        {/* Handle bar para móvil */}
        <div className="sm:hidden flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Close Button mejorado */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 sm:bg-black/5 sm:hover:bg-black/10 sm:dark:bg-white/5 sm:dark:hover:bg-white/10 transition-colors backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-5 sm:h-5 text-white sm:text-zinc-700 sm:dark:text-zinc-300" />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Image Header con aspect ratio responsivo */}
          {project.image && (
            <div className="relative w-full aspect-video overflow-hidden bg-transparent dark:bg-transparent">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content mejorado para móvil */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white sm:text-zinc-900 sm:dark:text-zinc-50 leading-tight">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 sm:text-zinc-600 sm:dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack mejorado */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xs font-medium text-gray-400 sm:text-zinc-500 sm:dark:text-zinc-500 uppercase tracking-wide">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-blue-300 sm:text-zinc-700 sm:dark:text-zinc-300 bg-blue-500/10 sm:bg-zinc-100 sm:dark:bg-zinc-900 border border-blue-400/30 sm:border-zinc-200 sm:dark:border-zinc-800 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons mejorados */}
            <div className="flex flex-col gap-3 pt-2 pb-4 sm:pb-0">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 sm:bg-zinc-900 sm:hover:bg-zinc-800 sm:dark:bg-zinc-50 sm:dark:hover:bg-zinc-200 text-white sm:text-zinc-50 sm:dark:text-zinc-900 rounded-xl sm:rounded-lg transition-all duration-300 font-medium shadow-lg sm:shadow-none"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-semibold">View Demo</span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 sm:bg-zinc-100 sm:hover:bg-zinc-200 sm:dark:bg-zinc-900 sm:dark:hover:bg-zinc-800 text-white sm:text-zinc-900 sm:dark:text-zinc-50 border border-white/20 sm:border-zinc-200 sm:dark:border-zinc-800 rounded-xl sm:rounded-lg transition-all duration-300 font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-semibold">Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
