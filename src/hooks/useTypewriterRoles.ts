import { useEffect, useRef } from 'react';

export function useTypewriterRoles(roles: string[]) {
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = roleRef.current;
    if (!el || roles.length === 0) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const current = roles[roleIndex];
      const currentEl = roleRef.current;
      if (!currentEl) return;

      if (!deleting) {
        charIndex += 1;
        currentEl.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          timer = setTimeout(() => {
            deleting = true;
            tick();
          }, 2200);
          return;
        }
      } else {
        charIndex -= 1;
        currentEl.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      timer = setTimeout(tick, deleting ? 45 : 90);
    }

    timer = setTimeout(tick, 1400);

    return () => {
      clearTimeout(timer);
    };
  }, [roles]);

  return roleRef;
}
