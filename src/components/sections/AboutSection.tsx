import { personal } from '../../data/personal';
import { useAboutContent } from '../../hooks/useAboutContent';
import { AboutBio } from './about/AboutBio';
import { AboutInterests } from './about/AboutInterests';
import { AboutPhoto } from './about/AboutPhoto';
import { AboutTimeline } from './about/AboutTimeline';
import { AboutTitle } from './about/AboutTitle';

export default function AboutSection() {
  const { timelineItems, interests } = useAboutContent(personal);

  return (
    <section id="about" className="flex min-h-svh items-center px-6 py-16 md:px-12 lg:py-20 xl:px-24 xl:py-24">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,380px)] lg:gap-16">
        <div>
          <AboutTitle />
          <AboutBio bio={personal.bio} />
          <AboutTimeline items={timelineItems} />
          <AboutInterests interests={interests} />
        </div>

        <div className="lg:justify-self-end">
          <AboutPhoto />
        </div>
      </div>
    </section>
  );
}

