    import { useState } from "react";

interface TechTooltipProps {
  remainingTech: string[];
  count: number;
}

export default function TechTooltip({ remainingTech, count }: TechTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40 cursor-help hover:text-blue-300 transition-colors">
        +{count}
      </span>
      
      {isVisible && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[200px] z-9999 pointer-events-none">
          <div className="bg-slate-950/90 backdrop-blur-md rounded-lg p-3 shadow-2xl shadow-black/50">
            <div className="flex flex-wrap gap-1.5">
              {remainingTech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-[10px] text-blue-200/80 bg-blue-950/40 rounded font-mono uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
            {/* Flecha */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-950/90"></div>
          </div>
        </div>
      )}
    </div>
  );
}
