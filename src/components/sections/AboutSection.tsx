import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function AboutSection() {
  useScrollAnimation();

  return (
    <section
      id="about"
      className="section-container min-h-screen lg:h-screen flex items-center justify-center lg:justify-end relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-0"
    >
      {/* Hint flotante - Solo visible en pantallas grandes */}
      <div
        data-scroll="slide-left"
        className="hidden lg:block fixed bottom-6 left-6 xl:bottom-8 xl:left-8 z-10 animate-pulse"
      >
        <div>
          <p className="text-white font-medium flex items-center gap-2 xl:gap-3">
            <span className="text-2xl xl:text-3xl animate-bounce">👉</span>
            <span className="text-xs xl:text-sm">
              Hover over the{" "}
              <span className="text-blue-400 font-bold">spaceship</span> to see
              my photo!
            </span>
          </p>
        </div>
      </div>

      {/* Contenedor que ocupa 2/3 en pantallas grandes */}
      <div className="w-full lg:w-2/3 lg:ml-auto">
        {/* Content */}
        <div
          data-scroll="slide-right"
          className="text-white space-y-4 sm:space-y-5 md:space-y-6 max-w-3xl mx-auto lg:mx-0 lg:ml-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-starwars mb-4 sm:mb-5 md:mb-6">
            about <span className="text-gray-400">me</span>
          </h2>

          {/* Imagen de perfil - Solo visible en móviles */}
          <div className="lg:hidden flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl"></div>
              <img
                src="/imgs/AnthonyPerfil.jpg"
                alt="Anthony Profile"
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover border-2 border-blue-500/50 shadow-2xl"
              />
            </div>
          </div>

          {/* Name */}
          <div className="lg:hidden block">
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-xl xl:text-2xl font-semibold mb-1 sm:mb-2">
              Anthony Avila
            </h3>
            <p className="text-gray-400 text-base sm:text-lg md:text-lg lg:text-base xl:text-lg">
              Software Engineer & Full-Stack Developer
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base md:text-lg xl:text-lg leading-relaxed text-gray-300">
            I'm a software engineer passionate about building intuitive and
            meaningful digital experiences. My work blends full-stack
            development with modern UI/UX and emerging tools powered by AI.
          </p>
          <p className="text-sm sm:text-base md:text-lg xl:text-lg leading-relaxed text-gray-300">
            I enjoy creating applications that solve real problems — from
            backend automation and mobile apps to interactive web experiences.
            Currently, I'm focused on expanding my expertise in backend
            development (Node.js), React ecosystems, cloud architectures, and
            AI-augmented workflows that accelerate engineering and creativity.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Education */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-400/20 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group">
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-blue-300/80 group-hover:text-blue-400 transition-colors">
                <span className="text-lg sm:text-xl">🎓</span> Education
              </h4>
              <div className="space-y-1 sm:space-y-2 text-gray-300">
                <p className="font-medium text-sm sm:text-base">
                  Bachelor in Systems Engineering
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Universidad Nacional de Costa Rica
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Completed</p>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-400/20 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group">
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-blue-300/80 group-hover:text-blue-400 transition-colors">
                <span className="text-lg sm:text-xl">💼</span> Experience
              </h4>
              <div className="space-y-1 sm:space-y-2 text-gray-300">
                <p className="font-medium text-sm sm:text-base">
                  Software Developer Intern
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Hyperreality Company
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  July 2025 - November 2025
                </p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
              ✨ Interests & Hobbies
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                "3D Graphics",
                "Web Design",
                "Open Source",
                "Gaming",
                "Music",
                "Cinema",
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-blue-400/20 rounded-full text-xs sm:text-sm text-gray-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
