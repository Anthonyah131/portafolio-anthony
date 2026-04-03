export function ContactFooter() {
  return (
    <div className="absolute inset-x-6 bottom-8 flex flex-wrap items-center justify-between gap-4 md:inset-x-12 xl:inset-x-24">
      <span className="font-label text-[0.6rem] uppercase tracking-[0.2em] text-outline">
        © {new Date().getFullYear()} Anthony Avila
      </span>
      <span className="font-label text-[0.6rem] uppercase tracking-[0.2em] text-outline">
        Built with Astro
      </span>
    </div>
  );
}
