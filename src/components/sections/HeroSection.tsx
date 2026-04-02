import { getPersonal } from "../../data/personal";
import { useEffect, useRef } from "react";
import { useTypewriterRoles } from "../../hooks/useTypewriterRoles";
import { HeroScrollHint } from "./hero/HeroScrollHint";
import { HeroActions } from "./hero/HeroActions";
import { HeroSignals } from "./hero/HeroSignals";
import { HeroSocialLinks } from "./hero/HeroSocialLinks";
import { useTranslation } from "../../context/LanguageContext";

export default function HeroSection() {
  const { t, locale } = useTranslation();
  const personal = getPersonal(locale);
  const roleRef = useTypewriterRoles(t.hero.roles);
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const longestRole = t.hero.roles.reduce(
    (max, role) => (role.length > max.length ? role : max),
    t.hero.roles[0] ?? "",
  );

  useEffect(() => {
    const el = heroRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || coarsePointer) {
      glow.style.transform = "translate3d(-50%, -26%, 0)";
      return;
    }

    glow.style.willChange = "transform";

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const maxOffsetX = 200;
    const maxOffsetY = 100;
    const easing = 0.13;

    const render = () => {
      raf = 0;

      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      glow.style.transform = `translate3d(calc(-50% + ${currentX.toFixed(2)}px), calc(-26% + ${currentY.toFixed(2)}px), 0)`;

      if (
        Math.abs(targetX - currentX) > 0.08 ||
        Math.abs(targetY - currentY) > 0.08
      ) {
        raf = requestAnimationFrame(render);
      }
    };

    const queueRender = () => {
      if (raf === 0) {
        raf = requestAnimationFrame(render);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = nx * 2 * maxOffsetX;
      targetY = ny * 2 * maxOffsetY;
      queueRender();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      queueRender();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      glow.style.willChange = "auto";
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-6 py-6 md:px-12 md:py-8 xl:px-24 xl:py-10"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-20 h-[88vw] w-[88vw] max-h-224 max-w-4xl rounded-full opacity-85 blur-2xl animate-[pulse_8s_ease-in-out_infinite]"
        style={{
          transform: "translate3d(-50%, -26%, 0)",
          background:
            "radial-gradient(circle at center, rgba(67, 254, 109, 0.14) 0%, rgba(67, 254, 109, 0.06) 24%, transparent 62%), radial-gradient(circle at 35% 35%, rgba(255, 183, 135, 0.18) 0%, transparent 42%)",
        }}
      />

      <HeroScrollHint />

      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <div className="w-full max-w-3xl text-left">
          <h1
            aria-label={`${t.hero.greeting} Anthony`}
            className="mb-8 whitespace-nowrap font-headline text-4xl leading-tight tracking-tight text-surface italic font-bold sm:text-5xl lg:text-6xl"
          >
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: "80ms" }}>
                <span className="text-secondary">{t.hero.greeting.split(' ')[0]}</span>{' '}
                {t.hero.greeting.split(' ').slice(1).join(' ')}{" "}
                <span className="text-primary">Anthony</span>
              </span>
            </div>
          </h1>

          <div
            className="fade-up flex flex-col gap-4"
            style={{ transitionDelay: "400ms" }}
          >
            <p className="inline-flex items-center font-label text-sm font-medium uppercase tracking-wider text-surface-muted sm:text-base lg:text-lg">
              <span className="relative inline-block align-baseline">
                <span className="invisible block whitespace-nowrap">{longestRole}</span>
                <span className="absolute inset-0 inline-flex items-center whitespace-nowrap">
                  <span ref={roleRef} className="inline-block text-surface" />
                  <span className="ml-0.5 inline-block h-4 w-0.5 animate-[blink_1s_step-end_infinite] bg-primary align-text-bottom" />
                </span>
              </span>
            </p>

            {t.hero.bio.map((line, i) => (
              <p
                key={i}
                className="max-w-[62ch] font-body text-base leading-7 text-[color-mix(in_srgb,var(--color-surface-muted)_88%,white_12%)] sm:text-lg sm:leading-8"
              >
                {line}
              </p>
            ))}

            <HeroSignals
              location={personal.location}
              degree={personal.education.degree}
              experience={personal.experience.role}
              basedInLabel={t.hero.basedInLabel}
              backgroundLabel={t.hero.backgroundLabel}
              latestRoleLabel={t.hero.latestRoleLabel}
            />

            <HeroActions cvLink={personal.cvLink} />
            <HeroSocialLinks social={personal.social} />
          </div>
        </div>
      </div>
    </section>
  );
}
