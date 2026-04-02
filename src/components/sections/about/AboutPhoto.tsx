import { memo } from "react";
import { Image } from "../../ui/Image";

function AboutPhotoBase() {
  return (
    <div
      className="fade-up w-full max-w-[380px]"
      style={{ transitionDelay: "220ms" }}
    >
      <Image
        src="/imgs/AnthonyPerfil.webp"
        alt="Anthony Avila"
        width={760}
        height={950}
        sizes="(max-width: 768px) 82vw, (max-width: 1280px) 40vw, 380px"
        className="relative z-10 aspect-4/5 w-full rounded-2xl object-cover object-center transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        style={{ objectPosition: "50% 50%" }}
      />
    </div>
  );
}

export const AboutPhoto = memo(AboutPhotoBase);
