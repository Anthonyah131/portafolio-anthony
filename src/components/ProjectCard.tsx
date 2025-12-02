import { Eye, Code2 } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  githubLink?: string;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  description,
  image,
  tech,
  link,
  githubLink,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-linear-to-br from-white/2 to-white/8 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 flex flex-col will-change-transform hover:z-20 overflow-hidden w-full text-left hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Destello azul estilo Star Wars */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-blue-400/0 to-cyan-500/0 lg:group-hover:from-blue-500/20 lg:group-hover:via-blue-400/15 lg:group-hover:to-cyan-500/20 transition-all duration-300 pointer-events-none z-10"></div>

      {/* Header con imagen de fondo */}
      <div className="relative w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 min-h-[100px] sm:min-h-[120px]">
        {/* Imagen de fondo */}
        {image && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay oscuro con gradiente */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/90 to-slate-950/70 z-1"></div>
          </>
        )}

        {/* Título y tecnologías */}
        <div className="relative z-10 flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-1 tracking-tight drop-shadow-lg">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            {tech.slice(0, 3).map((t, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] text-blue-200 border border-blue-400/30 rounded font-mono uppercase tracking-wide"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="text-[9px] sm:text-[10px] text-white/40">
                +{tech.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Botón de ver detalles */}
        <div className="relative z-10 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-blue-500/30 border border-white/20 group-hover:border-blue-400/50 flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
            <Eye className="w-5 h-5 text-white/70 group-hover:text-blue-400 transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </button>
  );
}
