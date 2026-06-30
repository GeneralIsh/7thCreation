'use client';
import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = 0.45;
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-30"
    >
      <source src="/videos/hero-bg.mov" type="video/mp4" />
    </video>
  );
}
