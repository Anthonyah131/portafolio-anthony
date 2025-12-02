interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  credentialId?: string;
}

export default function CertificateCard({
  title,
  issuer,
  date,
  link,
  credentialId,
}: CertificateCardProps) {
  const CardContent = (
    <div className="h-full group relative bg-linear-to-br from-white/2 to-white/8 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:border-purple-400/50 transition-all duration-500 overflow-hidden flex flex-col">
      {/* Destello morado estilo Star Wars */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 via-purple-400/0 to-fuchsia-500/0 group-hover:from-purple-500/20 group-hover:via-purple-400/15 group-hover:to-fuchsia-500/20 transition-all duration-500"></div>
      
      <div className="relative flex items-start justify-between gap-2 sm:gap-3 flex-1">
        {/* Icon */}
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-purple-500/20 to-fuchsia-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
          <span className="text-lg sm:text-xl">🏆</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-purple-300 mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-300 mb-1">{issuer}</p>
          {credentialId && (
            <p className="text-[8px] sm:text-[9px] text-gray-400 font-mono truncate">
              ID: {credentialId}
            </p>
          )}
        </div>

        {/* Date Badge */}
        <div className="shrink-0">
          <span className="inline-block px-2 sm:px-2.5 py-1 bg-purple-900/40 border border-purple-400/30 rounded text-[9px] sm:text-[10px] text-purple-200 whitespace-nowrap">
            {date}
          </span>
        </div>
      </div>

      {/* View Certificate Link */}
      {link && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
          <span className="text-[9px] sm:text-[10px] text-purple-300 hover:text-purple-200 transition-colors">
            View Certificate →
          </span>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {CardContent}
      </a>
    );
  }

  return <div className="h-full">{CardContent}</div>;
}
