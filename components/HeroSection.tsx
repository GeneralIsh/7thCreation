'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Low-res canvas for motion sampling — cheap enough for RAF
const W = 48;
const H = 27;
// Avg per-pixel brightness change needed to call it a print-head pass
const MOTION_THRESHOLD = 6;
// Minimum ms between headline flips (won't double-fire mid-transition)
const MIN_INTERVAL = 3500;
// If no motion detected this long, flip anyway as a fallback
const FALLBACK_INTERVAL = 10_000;

const hCls =
  'font-heading font-extrabold leading-none tracking-tighter text-[2.75rem] sm:text-5xl lg:text-7xl xl:text-8xl absolute inset-x-0 top-0 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)]';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevDataRef = useRef<Uint8ClampedArray | null>(null);
  const lastFlipRef = useRef<number>(0);
  const rafRef = useRef<number>();
  const fallbackRef = useRef<ReturnType<typeof setTimeout>>();
  const [alt, setAlt] = useState(false);

  // Flip headline and reset the fallback timer
  const flip = () => {
    const now = Date.now();
    if (now - lastFlipRef.current < MIN_INTERVAL) return;
    lastFlipRef.current = now;
    setAlt((v) => !v);
    clearTimeout(fallbackRef.current);
    fallbackRef.current = setTimeout(flip, FALLBACK_INTERVAL);
  };

  // Set playback rate + kick off the fallback timer
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.45;
    fallbackRef.current = setTimeout(flip, FALLBACK_INTERVAL);
    return () => clearTimeout(fallbackRef.current);
  // flip is stable — defined outside React render cycle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // RAF loop: sample the video frame and detect print-head movement
  useEffect(() => {
    const detect = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState >= 2 && !video.paused) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, W, H);
          const { data } = ctx.getImageData(0, 0, W, H);

          if (prevDataRef.current) {
            let diff = 0;
            for (let i = 0; i < data.length; i += 4) {
              diff += Math.abs(data[i] - prevDataRef.current[i]);
            }
            // avg brightness change across all sampled pixels
            if (diff / (W * H) > MOTION_THRESHOLD) flip();
          }
          prevDataRef.current = new Uint8ClampedArray(data);
        }
      }
      rafRef.current = requestAnimationFrame(detect);
    };

    rafRef.current = requestAnimationFrame(detect);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative min-h-[80vh] lg:min-h-[82vh] bg-dark pt-16 flex flex-col justify-center"
      aria-labelledby="hero-heading"
    >
      {/* Hidden canvas — only used for pixel sampling, never rendered */}
      <canvas ref={canvasRef} width={W} height={H} className="hidden" aria-hidden="true" />

      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/85" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 w-full py-14 lg:py-20">
        <div className="text-center">
          <p className="section-eyebrow-light mb-5">Oakland, CA — Bay Area Graphics Production</p>

          <div className="relative mb-8 h-[7.5rem] sm:h-36 lg:h-44 xl:h-56">
            <h1
              id="hero-heading"
              className={`${hCls} text-cream ${
                alt
                  ? 'opacity-0 -translate-y-4 pointer-events-none select-none'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              Graphics built<br />for real spaces.
            </h1>
            <h2
              className={`${hCls} text-lightblue ${
                alt
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none select-none'
              }`}
            >
              Conceptualize.<br />Create. Complete.
            </h2>
          </div>

          <p className="text-cream/70 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
            7th Creation Studio designs, produces, and installs large-format graphics for exhibitions,
            events, retail, vehicles, and branded environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
            >
              Request a Quote
            </Link>
            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream/60 hover:bg-cream/5 transition-colors focus-ring"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
