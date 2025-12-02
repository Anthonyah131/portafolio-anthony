import { useState } from "react";
import { Mail, Copy, CheckCircle, Linkedin, Github, MessageCircle, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const myEmail = "your.email@example.com";
  const whatsappNumber = "1234567890"; // Formato: código país + número sin espacios
  const telegramUsername = "yourusername";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí puedes integrar EmailJS o similar
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="section-container min-h-screen lg:h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 lg:py-0 relative overflow-hidden"
    >
      {/* Contenedor con 2 columnas laterales y centro libre */}
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-[26%_48%_26%] gap-6 lg:gap-0 relative z-10 pointer-events-none">
        
        {/* COLUMNA IZQUIERDA - Formulario */}
        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.08] backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-5 pointer-events-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white font-starwars tracking-wider">
            Send Message
          </h2>
          <p className="text-sm text-white/60 mb-6">Quick contact form</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-white/80 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-slate-800/30 border border-white/10 rounded-lg text-white text-sm focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-slate-800/30 border border-white/10 rounded-lg text-white text-sm focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-slate-800/30 border border-white/10 rounded-lg text-white text-sm focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>

        {/* COLUMNA CENTRAL - Vacía para el planeta */}
        <div className="hidden lg:block">
          {/* Espacio libre para interactuar con el planeta 3D */}
        </div>

        {/* COLUMNA DERECHA - Contacto directo */}
        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.08] backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-5 pointer-events-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white font-starwars tracking-wider">
            Get In Touch
          </h2>
          <p className="text-sm text-white/60 mb-6">Direct contact options</p>

          {/* Email con botón copiar */}
          <div className="mb-6">
            <label className="block text-sm text-white/80 mb-2">Email</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-2.5 bg-slate-800/30 border border-white/10 rounded-lg text-white text-sm truncate">
                {myEmail}
              </div>
              <button
                onClick={copyEmail}
                className="p-2.5 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-blue-400/40 rounded-lg transition-all duration-300"
                title="Copy email"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-white/60" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-400 mt-1">Email copied!</p>
            )}
          </div>

          {/* Botones de contacto directo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={`mailto:${myEmail}`}
              className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-blue-400/40 rounded-lg transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-400/30 group-hover:border-blue-400/50 flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">Gmail</p>
                <p className="text-[10px] text-white/50">Send email</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-green-400/40 rounded-lg transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30 group-hover:border-green-400/50 flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">WhatsApp</p>
                <p className="text-[10px] text-white/50">Chat now</p>
              </div>
            </a>

            <a
              href={`https://t.me/${telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-cyan-400/40 rounded-lg transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/50 flex-shrink-0">
                <Send className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">Telegram</p>
                <p className="text-[10px] text-white/50">Message me</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-blue-400/40 rounded-lg transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/30 group-hover:border-blue-400/50 flex-shrink-0">
                <Linkedin className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">LinkedIn</p>
                <p className="text-[10px] text-white/50">Connect</p>
              </div>
            </a>

            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-800/30 hover:bg-slate-700/40 border border-white/10 hover:border-purple-400/40 rounded-lg transition-all duration-300 group sm:col-span-2"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30 group-hover:border-purple-400/50 flex-shrink-0">
                <Github className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">GitHub</p>
                <p className="text-[10px] text-white/50">View profile</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
