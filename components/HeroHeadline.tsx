'use client';
import { useEffect, useState } from 'react';

const shared =
  'font-heading font-extrabold leading-none tracking-tighter text-4xl sm:text-5xl lg:text-7xl xl:text-8xl absolute inset-x-0 top-0';

const transition = 'transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)]';

export default function HeroHeadline() {
  const [alt, setAlt] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setAlt((v) => !v), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mb-6 h-24 sm:h-28 lg:h-40 xl:h-52">
      <h1
        id="hero-heading"
        className={`${shared} ${transition} text-cream ${
          alt
            ? 'opacity-0 -translate-y-4 pointer-events-none select-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        Graphics built<br />for real spaces.
      </h1>
      <h2
        className={`${shared} ${transition} text-lightblue ${
          alt
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none select-none'
        }`}
      >
        Conceptualize.<br />Create. Complete.
      </h2>
    </div>
  );
}
