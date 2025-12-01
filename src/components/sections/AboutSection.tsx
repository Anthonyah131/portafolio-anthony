export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-container min-h-screen lg:h-screen flex items-center justify-center lg:justify-end relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-0"
    >
      {/* Hint flotante - Solo visible en pantallas grandes */}
      <div className="hidden lg:block fixed bottom-6 left-6 xl:bottom-8 xl:left-8 z-10 animate-pulse">
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

      {/* Contenedor que ocupa 50% en pantallas grandes */}
      <div className="w-full lg:w-1/2 lg:ml-auto">
        {/* Content */}
        <div className="text-white space-y-4 sm:space-y-5 md:space-y-6 animate-slide-in-right max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
            About <span className="text-gray-400">Me</span>
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
          <div>
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-xl xl:text-2xl font-semibold mb-1 sm:mb-2">
              Anthony
            </h3>
            <p className="text-gray-400 text-base sm:text-lg md:text-lg lg:text-base xl:text-lg">
              AI Student & Web Developer
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-relaxed text-gray-300">
            I'm an AI student and web developer passionate about creating
            immersive web experiences. I specialize in combining cutting-edge
            technologies with creative design to build unique digital solutions.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Education */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-lg sm:text-xl">🎓</span> Education
              </h4>
              <div className="space-y-1 sm:space-y-2 text-gray-300">
                <p className="font-medium text-sm sm:text-base">
                  Artificial Intelligence
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Universidad Autónoma del Estado de Morelos
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Currently studying
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-lg sm:text-xl">💼</span> Experience
              </h4>
              <div className="space-y-1 sm:space-y-2 text-gray-300">
                <p className="font-medium text-sm sm:text-base">
                  Research Assistant
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  UAEM CINC Morelos
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  2023 - Present
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
                "Machine Learning",
                "Web Design",
                "Open Source",
                "Gaming",
                "Music",
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default"
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
