interface ProfileModalProps {
  show: boolean;
}

export default function ProfileModal({ show }: ProfileModalProps) {
  console.log('🖼️ ProfileModal - show:', show);
  
  if (!show) return null;

  const modalLeft = "25%"; // Distancia desde la izquierda
  const modalTop = "35%"; // Posición vertical

  return (
    <div
      className="fixed pointer-events-none hidden lg:block"
      style={{
        animation: "fadeIn 0.3s ease-out",
        zIndex: 99999,
        left: modalLeft,
        top: modalTop,
        transform: "translateY(-50%)",
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-2xl"></div>
        <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-blue-500/50 shadow-2xl">
          <img
            src="/imgs/AnthonyPerfil.jpg"
            alt="Anthony"
            className="rounded-xl shadow-2xl w-56 h-56 object-cover"
          />
          <p className="text-white text-center mt-3 font-semibold text-base">
            Anthony Avila
          </p>
          <p className="text-gray-400 text-center text-xs">
            Software Engineer & Full-Stack Developer
          </p>
        </div>
      </div>
    </div>
  );
}
