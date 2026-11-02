import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAFE_IMAGES } from '../data/cafeData';

export const EventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spoonRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Card rises from bottom edge overlapping menu
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 120 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Corner spoon decoration shows up JUST AFTER the card is in place (t=7.75s)
      if (spoonRef.current) {
        gsap.fromTo(
          spoonRef.current,
          { opacity: 0, scale: 0.8, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 45%',
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Salt dust behind top edge appears slightly after the spoon (t=8.0s)
      if (dustRef.current) {
        gsap.fromTo(
          dustRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 0.7,
            y: -10,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 52%',
              end: 'top 38%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative -mt-10 sm:-mt-16 lg:-mt-20 py-16 sm:py-24 lg:py-32 bg-transparent overflow-hidden z-20"
    >
      {/* Background salt dust above the card (shows up just after card arrives) */}
      <div
        ref={dustRef}
        className="absolute top-6 right-6 sm:right-16 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none will-change-transform z-10"
      >
        <div className="absolute inset-0 bg-radial from-white/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 salt-dust-bg opacity-30" />
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-10 relative z-20">
        
        {/* Mirrored Horizontal Split Card */}
        <div
          ref={cardRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 items-center will-change-transform"
        >
          {/* Photo on Top on Mobile, Right on Desktop (~40%) */}
          <div className="lg:col-span-5 relative z-10 lg:-ml-8 mb-4 lg:mb-0 order-1 lg:order-2">
            <div className="relative w-full h-[240px] xs:h-[280px] sm:h-[380px] lg:h-[490px] shadow-[0_20px_45px_rgba(0,0,0,0.85)] ring-1 ring-white/10 overflow-hidden">
              <img
                src={CAFE_IMAGES.testimonialDish}
                alt="Velvet & Stone gathering and tasting events"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </div>
          </div>

          {/* Pure White Text Panel on Left (~60%) */}
          <div className="lg:col-span-7 bg-[#ffffff] text-[#181818] p-6 sm:p-10 lg:p-16 lg:pr-20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-20 space-y-4 sm:space-y-6 order-2 lg:order-1">
            
            {/* Script Kicker */}
            <div className="script-kicker !text-[#c98f7e] !text-3xl sm:!text-4xl">
              Discover
            </div>

            {/* Bold Serif Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181818] tracking-tight leading-tight">
              Upcoming Events
            </h2>

            {/* Paragraph Body */}
            <p className="text-xs sm:text-base text-[#4a4742] leading-relaxed font-sans font-light tracking-wide">
              Join our sensory masterclasses, cupping tables, and evening harvest tastings led by our head roasters and visiting farmers from Central America and East Africa.
            </p>

            {/* Featured Event Card Block */}
            <div className="p-4 sm:p-6 bg-[#f7f5f0] border border-[#e5e0d8] space-y-2 sm:space-y-3">
              <div className="font-serif font-bold text-lg sm:text-2xl text-[#181818]">
                Geisha Cupping & Roaster's Tasting
              </div>
              <p className="text-[11px] sm:text-sm text-[#635f58] leading-relaxed">
                An intimate cupping of 6 rare anaerobic micro-lots with sensory scoring, aroma wheel calibration, and hand-brewed pairings.
              </p>
              
              {/* Right-Aligned Meta Line as in Reference */}
              <div className="text-right pt-2 border-t border-[#dfd9ce] text-[10px] sm:text-xs font-semibold text-[#c98f7e] tracking-wider uppercase">
                Saturday Mornings &nbsp;|&nbsp; 10:00 AM &nbsp;|&nbsp; Tasting Room
              </div>
            </div>

            {/* Link with Animated Arrow */}
            <div className="pt-1">
              <a
                href="#reservation"
                className="link-editorial !text-[#c98f7e] hover:!text-[#a06857] text-xs sm:text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 group"
              >
                <span>More Events</span>
                <span className="arrow-icon transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </div>

            {/* Corner Spoon Decoration (reveals just after card arrives, t=7.75s) */}
            <div
              ref={spoonRef}
              className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-20 h-20 sm:w-32 sm:h-32 pointer-events-none drop-shadow-garnish z-30 will-change-transform"
            >
              <svg viewBox="0 0 140 140" className="w-full h-full filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.35)]">
                <path
                  d="M10,20 C35,50 65,80 95,110 C102,117 110,118 116,112 C122,106 119,98 112,91 C80,60 50,30 20,8 Z"
                  fill="#784428"
                />
                <ellipse cx="120" cy="120" rx="24" ry="17" transform="rotate(-45 120 120)" fill="#8a4f31" />
                <ellipse cx="118" cy="118" rx="18" ry="11" transform="rotate(-45 118 118)" fill="#542e18" />
                <ellipse cx="114" cy="114" rx="6" ry="4" transform="rotate(-20 114 114)" fill="#2e170c" />
                <ellipse cx="122" cy="122" rx="5" ry="3.5" transform="rotate(35 122 122)" fill="#3e2213" />
              </svg>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
