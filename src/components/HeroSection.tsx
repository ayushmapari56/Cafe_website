import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAFE_IMAGES, MENU_ITEMS } from '../data/cafeData';
import { MenuItem } from '../types';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOpenReservation,
  onQuickAdd,
}) => {
  const heroItem = MENU_ITEMS.find((i) => i.id === 'flat-white-croissant-set') || MENU_ITEMS[4];

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const spoonRef = useRef<HTMLDivElement>(null);
  const herbsRef = useRef<HTMLDivElement>(null);
  const berriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero scroll exit: Headline moves at 1.0x, main image at ~0.9x, garnishes at ~1.1x
      const trigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      };

      // 1.0x speed reference (headline & text)
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }

      // 0.9x speed (main image moves slightly slower to retain overlap)
      if (mainImageRef.current) {
        gsap.to(mainImageRef.current, {
          yPercent: -12,
          rotate: 6,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }

      // 1.1x speed (garnishes separate and drift up faster)
      if (spoonRef.current) {
        gsap.to(spoonRef.current, {
          yPercent: -45,
          rotate: -15,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }

      if (herbsRef.current) {
        gsap.to(herbsRef.current, {
          yPercent: -38,
          rotate: 10,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }

      if (berriesRef.current) {
        gsap.to(berriesRef.current, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[92vh] flex items-center pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#181818]"
    >
      {/* Background ambient salt field */}
      <div className="absolute inset-0 salt-dust-bg opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#181818]/60 to-[#181818] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-10 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Headline & Outlined CTAs (speed: 1.0x) */}
          <div
            ref={headlineRef}
            className="lg:col-span-7 z-10 space-y-5 sm:space-y-7 lg:pr-6 text-center lg:text-left will-change-transform"
          >
            {/* Script Kicker */}
            <div className="script-kicker !text-2xl sm:!text-4xl">
              Artisanal Roastery & Bakehouse
            </div>

            {/* 3-Line Bold Serif Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-serif font-bold text-white leading-[1.12] sm:leading-[1.04] tracking-tight text-balance">
              Take A Sip. <br />
              And Sit With Us. <br />
              <span className="text-[#e2ded6]">Endlessly Aromatic.</span>
            </h1>

            {/* Editorial Body Description */}
            <p className="text-xs sm:text-base text-[#9e9a93] max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-light tracking-wide">
              We source high-elevation micro-lots from volcanic misty soils, slow-roasting in small 6kg drums. Pulled through hand-tuned levers and accompanied by laminated pastries baked warm before dawn.
            </p>

            {/* Outlined Action Button + Editorial Arrow Link */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 sm:pt-4">
              <button
                onClick={onOpenReservation}
                className="btn-outline-editorial w-full sm:w-auto py-3 px-6 text-xs"
              >
                Book A Table
              </button>

              <button
                onClick={onExploreMenu}
                className="link-editorial group py-2"
              >
                <span>Explore Today's Menu</span>
                <span className="arrow-icon">→</span>
              </button>
            </div>

            {/* Terroir & Origin Kicker Line */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs text-[#9e9a93] tracking-wider">
              <span className="text-[#c98f7e] font-serif italic text-sm">Feature:</span>
              <span className="text-white font-medium">Panama Boquete Geisha (1,750m)</span>
              <span className="text-white/30 hidden xs:inline">|</span>
              <span className="text-[#9e9a93] text-[11px] sm:text-xs">White Peach · Jasmine</span>
            </div>
          </div>

          {/* Right Column: Hero Pan Cutout Centerpiece (speed: ~0.9x) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end z-20 mt-4 lg:mt-0">
            
            <div
              ref={mainImageRef}
              className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] lg:-ml-20 xl:-ml-28 select-none group will-change-transform"
            >
              {/* Soft dark contact drop shadow */}
              <div className="absolute inset-3 rounded-full bg-black/85 blur-2xl -z-10 scale-95 transform translate-y-4" />

              {/* Pan & Dish Rim */}
              <div className="relative w-full h-full rounded-full p-2.5 sm:p-4 bg-gradient-to-tr from-[#121212] via-[#2a2420] to-[#1a1816] ring-1 ring-white/10 drop-shadow-cutout transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner ring-1 ring-black/40">
                  <img
                    src={CAFE_IMAGES.heroDish}
                    alt="Velvet Flat white coffee and warm almond croissant on circular platter"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Floating Quick Add Pill */}
              <div className="absolute -bottom-4 left-2 sm:bottom-4 sm:left-4 bg-[#ffffff] text-[#181818] p-3 sm:px-4 sm:py-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] z-30 max-w-[210px] sm:max-w-xs space-y-0.5 border border-white">
                <div className="flex items-center justify-between text-xs font-serif font-bold">
                  <span>Morning Pair</span>
                  <span className="text-[#c98f7e] tabular-nums">$10.00</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#6b665f] leading-tight">
                  Double espresso flat white & croissant.
                </div>
                <button
                  onClick={() => onQuickAdd(heroItem)}
                  className="mt-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#c98f7e] hover:text-[#181818] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Quick Add +</span>
                </button>
              </div>

              {/* Floating Garnishes (speed: ~1.1x) */}
              
              {/* 1. Wooden spoon at top-left */}
              <div
                ref={spoonRef}
                className="absolute -top-8 -left-6 sm:-top-14 sm:-left-10 w-20 h-20 sm:w-32 sm:h-32 pointer-events-none drop-shadow-garnish will-change-transform"
              >
                <svg viewBox="0 0 160 160" className="w-full h-full filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.7)]">
                  <path
                    d="M10,20 C40,50 65,80 100,115 C108,122 116,122 122,116 C126,111 122,103 115,96 C80,62 48,32 18,8 Z"
                    fill="#7a462b"
                  />
                  <ellipse cx="128" cy="128" rx="26" ry="18" transform="rotate(-40 128 128)" fill="#8d5435" />
                  <ellipse cx="126" cy="126" rx="20" ry="12" transform="rotate(-40 128 128)" fill="#542e18" />
                  <circle cx="124" cy="124" r="2" fill="#ffffff" opacity="0.8" />
                  <circle cx="130" cy="122" r="1.5" fill="#ffffff" opacity="0.9" />
                  <circle cx="122" cy="128" r="1.5" fill="#c98f7e" />
                </svg>
              </div>

              {/* 2. Sprig of Rosemary at top-right */}
              <div
                ref={herbsRef}
                className="absolute -top-6 right-4 sm:-top-8 sm:right-10 w-16 h-16 sm:w-28 sm:h-28 pointer-events-none drop-shadow-garnish will-change-transform"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <path d="M20,100 Q60,60 100,20" stroke="#3b5e3d" strokeWidth="3" fill="none" strokeLinecap="round" />
                  {[
                    [35, 85, -45], [42, 78, 45],
                    [52, 68, -40], [60, 60, 50],
                    [72, 48, -45], [80, 40, 45],
                    [90, 30, -35], [95, 25, 40],
                  ].map(([x, y, rot], idx) => (
                    <ellipse
                      key={idx}
                      cx={x}
                      cy={y}
                      rx="4"
                      ry="12"
                      transform={`rotate(${rot} ${x} ${y})`}
                      fill="#4f7c52"
                    />
                  ))}
                </svg>
              </div>

              {/* 3. Cherry Tomatoes bottom-right */}
              <div
                ref={berriesRef}
                className="absolute -bottom-4 right-2 sm:-bottom-6 sm:right-8 w-16 h-16 sm:w-22 sm:h-22 pointer-events-none drop-shadow-garnish will-change-transform"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="45" cy="55" r="16" fill="#a83226" />
                  <ellipse cx="40" cy="48" rx="4" ry="2" fill="#ff7f6e" opacity="0.6" />
                  <path d="M45,37 C46,30 52,25 56,22" stroke="#486e3f" strokeWidth="2.5" fill="none" />
                  <circle cx="68" cy="65" r="12" fill="#8a251b" />
                  <path d="M45,38 C55,42 62,35 60,30 C50,30 46,35 45,38 Z" fill="#52834b" />
                </svg>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
