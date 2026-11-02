import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAFE_IMAGES } from '../data/cafeData';

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const herbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      };

      // Card rises up from bottom while hero is still visible (overlapping)
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 120 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: trigger,
          }
        );
      }

      // Salt dust layer: sits slightly higher, moves at ~1.2x speed trailing behind the card
      if (dustRef.current) {
        gsap.fromTo(
          dustRef.current,
          { y: 90, opacity: 0.4 },
          {
            y: -90,
            opacity: 0.8,
            ease: 'none',
            scrollTrigger: trigger,
          }
        );
      }

      // Herb sprig: separate layer drifting at bottom-right corner (~0.85x speed)
      if (herbRef.current) {
        gsap.fromTo(
          herbRef.current,
          { y: 50, rotate: -5 },
          {
            y: -20,
            rotate: 8,
            ease: 'none',
            scrollTrigger: trigger,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative -mt-10 sm:-mt-16 lg:-mt-20 py-16 sm:py-24 lg:py-32 bg-transparent overflow-hidden z-20"
    >
      {/* Background salt & smoke dust behind top-left (speed: ~1.2x) */}
      <div
        ref={dustRef}
        className="absolute top-8 left-6 sm:left-14 w-64 h-64 sm:w-96 sm:h-96 pointer-events-none will-change-transform z-10"
      >
        <div className="absolute inset-0 bg-radial from-white/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 salt-dust-bg opacity-30" />
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-10 relative z-20">
        
        {/* Centered Horizontal Split Card Container */}
        <div
          ref={cardRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 items-center will-change-transform"
        >
          {/* Photo on the Left (~40%): Offset and taller than panel to create the layered look */}
          <div className="lg:col-span-5 relative z-20 lg:-mr-8 mb-4 lg:mb-0">
            <div className="relative w-full h-[240px] xs:h-[280px] sm:h-[380px] lg:h-[490px] shadow-[0_20px_45px_rgba(0,0,0,0.85)] ring-1 ring-white/10 overflow-hidden">
              <img
                src={CAFE_IMAGES.geishaPourOver}
                alt="Artisanal pour over and slow roasting process"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Micro salt particles top-left */}
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none">
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <rect x="15" y="20" width="3" height="3" fill="#ffffff" opacity="0.6" transform="rotate(30 15 20)" />
                <rect x="35" y="10" width="2" height="2" fill="#ffffff" opacity="0.8" transform="rotate(15 35 10)" />
                <rect x="25" y="45" width="3" height="3" fill="#ffffff" opacity="0.5" transform="rotate(45 25 45)" />
                <circle cx="50" cy="25" r="2" fill="#c98f7e" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Pure White Text Panel on the Right (~60%) */}
          <div className="lg:col-span-7 bg-[#ffffff] text-[#181818] p-6 sm:p-10 lg:p-16 lg:pl-20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10 space-y-4 sm:space-y-6">
            
            {/* Script Kicker */}
            <div className="script-kicker !text-[#c98f7e] !text-3xl sm:!text-4xl">
              Discover
            </div>

            {/* Bold Serif Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181818] tracking-tight leading-tight">
              Our Story
            </h2>

            {/* Paragraph Body */}
            <p className="text-xs sm:text-base text-[#4a4742] leading-relaxed font-sans font-light tracking-wide">
              Founded on a shared reverence for slow mornings and uncompromised craftsmanship, Velvet & Stone began with a single lever-espresso group and a 6kg cast-iron roaster. We source strictly from organic high-altitude family estates in Boquete, Yirgacheffe, and Huila, where volcanic soil and cool mountain mists yield exceptional complexity.
            </p>

            <p className="text-[11px] sm:text-sm text-[#736f68] leading-relaxed font-sans font-light">
              Every morning at five o'clock, our ovens warm with Scandinavian sourdough croissants and cardamom knots, baked in synchronized harmony with freshly pulled ristrettos.
            </p>

            {/* Link with Animated Arrow */}
            <div className="pt-1">
              <a
                href="#menu"
                className="link-editorial !text-[#c98f7e] hover:!text-[#a06857] text-xs sm:text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 group"
              >
                <span>More About Us</span>
                <span className="arrow-icon transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </div>

            {/* Decorative Extra: Fresh Herb Sprig Overlapping the Bottom-Right Corner (speed: ~0.85x) */}
            <div
              ref={herbRef}
              className="absolute -bottom-5 -right-5 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none drop-shadow-garnish z-30 will-change-transform"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_10px_12px_rgba(0,0,0,0.35)]">
                <path d="M15,85 Q45,55 85,15" stroke="#3d633b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M35,68 C20,60 25,40 45,45 C45,60 40,68 35,68 Z" fill="#4d7c4b" />
                <path d="M48,55 C65,48 70,30 52,32 C45,42 46,52 48,55 Z" fill="#5c9159" />
                <path d="M68,35 C80,20 95,22 85,38 C75,42 70,38 68,35 Z" fill="#4d7c4b" />
                <circle cx="85" cy="15" r="3" fill="#6ba668" />
              </svg>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
