import { useState } from "react";
import ProjectCard from "../ProjectCard";
import CertificateCard from "../CertificateCard";
import ProjectModal from "../modals/ProjectModal";
import { projects } from "../../data/projects";
import { certificates } from "../../data/certificates";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function ProjectsSection() {
  useScrollAnimation();
  
  const [activeTab, setActiveTab] = useState<"projects" | "certificates">(
    "projects"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Calcular items para la página actual
  const getCurrentItems = <T,>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = <T,>(items: T[]): number =>
    Math.ceil(items.length / itemsPerPage);

  // Reset página cuando cambias de tab
  const handleTabChange = (tab: "projects" | "certificates") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Cambiar página con animación
  const handlePageChange = (newPage: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 200);
  };

  // Abrir modal con proyecto seleccionado
  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      className="section-container min-h-screen lg:h-screen flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-0 relative overflow-hidden"
    >
      <div data-scroll="fade-up" className="w-full lg:w-[60%] max-w-5xl mx-auto lg:mx-0">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 text-center lg:text-left font-starwars tracking-wider">
          <span className="text-white">Projects &</span>{" "}
          <span className="text-gray-400">Achievements</span>
        </h2>

        {/* Tab Buttons */}
        <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start mb-3 sm:mb-4">
          <button
            onClick={() => handleTabChange("projects")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
              activeTab === "projects"
                ? "bg-blue-500/30 border-2 border-blue-400 text-white shadow-lg shadow-blue-500/50"
                : "bg-white/5 border-2 border-white/20 text-gray-300 hover:bg-white/10"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleTabChange("certificates")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
              activeTab === "certificates"
                ? "bg-purple-500/30 border-2 border-purple-400 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/5 border-2 border-white/20 text-gray-300 hover:bg-white/10"
            }`}
          >
            Certificates
          </button>
        </div>

        {/* Projects Grid */}
        {activeTab === "projects" && (
          <>
            {/* Grid optimizado para acordeones */}
            <div className="mb-4">
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {getCurrentItems(projects).map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tech={project.tech}
                  link={project.link}
                  githubLink={project.githubLink}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
              </div>
            </div>

            {/* Paginación para Projects */}
            {totalPages(projects) > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="group relative w-10 h-10 rounded-full border-2 border-white/20 hover:border-blue-400 disabled:border-white/10 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 group-disabled:bg-transparent transition-colors duration-300"></div>
                  <span className="relative text-lg text-white/70 group-hover:text-blue-400 group-disabled:text-white/30 transition-colors duration-300">‹</span>
                </button>
                {Array.from(
                  { length: totalPages(projects) },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="group relative transition-all duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-blue-400 w-8 shadow-lg shadow-blue-500/50'
                        : 'bg-white/30 group-hover:bg-white/60 group-hover:scale-125'
                    }`}></div>
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages(projects), currentPage + 1))}
                  disabled={currentPage === totalPages(projects)}
                  className="group relative w-10 h-10 rounded-full border-2 border-white/20 hover:border-blue-400 disabled:border-white/10 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 group-disabled:bg-transparent transition-colors duration-300"></div>
                  <span className="relative text-lg text-white/70 group-hover:text-blue-400 group-disabled:text-white/30 transition-colors duration-300">›</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Certificates Grid */}
        {activeTab === "certificates" && (
          <>
            {/* Grid de certificados */}
            <div className="mb-4">
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {getCurrentItems(certificates).map((cert) => (
                <CertificateCard
                  key={cert.id}
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  link={cert.link}
                  credentialId={cert.credentialId}
                />
              ))}
              </div>
            </div>

            {/* Paginación para Certificates */}
            {totalPages(certificates) > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="group relative w-10 h-10 rounded-full border-2 border-white/20 hover:border-purple-400 disabled:border-white/10 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 group-disabled:bg-transparent transition-colors duration-300"></div>
                  <span className="relative text-lg text-white/70 group-hover:text-purple-400 group-disabled:text-white/30 transition-colors duration-300">‹</span>
                </button>
                {Array.from(
                  { length: totalPages(certificates) },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="group relative transition-all duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-purple-400 w-8 shadow-lg shadow-purple-500/50'
                        : 'bg-white/30 group-hover:bg-white/60 group-hover:scale-125'
                    }`}></div>
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages(certificates), currentPage + 1))}
                  disabled={currentPage === totalPages(certificates)}
                  className="group relative w-10 h-10 rounded-full border-2 border-white/20 hover:border-purple-400 disabled:border-white/10 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 group-disabled:bg-transparent transition-colors duration-300"></div>
                  <span className="relative text-lg text-white/70 group-hover:text-purple-400 group-disabled:text-white/30 transition-colors duration-300">›</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </section>
  );
}
