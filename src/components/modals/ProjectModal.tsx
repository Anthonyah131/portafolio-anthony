"use client"

import { X, ExternalLink, Github } from "lucide-react"
import { useEffect } from "react"
import { createPortal } from "react-dom"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    image: string
    tech: string[]
    link: string
    githubLink?: string
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  return createPortal(
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6 md:p-8" onClick={onClose}>
      {/* Backdrop minimalista casi transparente */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button minimalista */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Image Header con aspect ratio responsivo */}
          {project.image && (
            <div className="relative w-full aspect-video overflow-hidden bg-transparent dark:bg-transparent">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Content minimalista */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">{project.title}</h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack minimalista */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons minimalistas */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 rounded-lg transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">View Demo</span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg transition-colors font-medium border border-zinc-200 dark:border-zinc-800"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
