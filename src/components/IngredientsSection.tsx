import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IngredientsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const centerpieceRef = useRef<HTMLDivElement | null>(null);
  const sideItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Heading block: scrubbed fade from dim grey (0.25) to full white (1.0)
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0.2, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 92%',
              end: 'top 62%',
              scrub: 0.6,
            },
          }
        );
      }

      // 2. Ingredients row: enters as a single unit from below
      if (rowRef.current) {
        gsap.fromTo(
          rowRef.current,
          { opacity: 0.25, y: 70 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Centerpiece subtle floating parallax drift
      if (centerpieceRef.current) {
        gsap.fromTo(
          centerpieceRef.current,
          { yPercent: 14, scale: 0.96 },
          {
            yPercent: -12,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              scrub: 0.8,
            },
          }
        );
      }

      // 4. Side ingredients slight varied drift speeds (subtle garnish separation)
      sideItemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const drift = idx % 2 === 0 ? -16 : 12;
        gsap.fromTo(
          el,
          { yPercent: 10 },
          {
            yPercent: drift,
            ease: 'none',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ingredients = [
    {
      name: 'Cardamom & Salt',
      desc: 'Freshly cracked green pods & Maldon sea salt crystals',
      svg: (
        <svg viewBox="0 0 140 140" className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-garnish">
          <ellipse cx="60" cy="70" rx="22" ry="14" transform="rotate(-30 60 70)" fill="#784428" />
          <ellipse cx="58" cy="68" rx="16" ry="9" transform="rotate(-30 58 68)" fill="#542e18" />
          <ellipse cx="54" cy="66" rx="8" ry="4" transform="rotate(15 54 66)" fill="#8ba36a" />
          <path d="M46,66 L62,66" stroke="#687e4d" strokeWidth="1" />
          <rect x="62" y="62" width="4" height="4" fill="#ffffff" opacity="0.9" transform="rotate(20 62 62)" />
          <rect x="70" y="70" width="3" height="3" fill="#ffffff" opacity="0.8" transform="rotate(45 70 70)" />
        </svg>
      ),
    },
    {
      name: 'Wild Rosemary',
      desc: 'Hand-picked organic garden herbs & blossoms',
      svg: (
        <svg viewBox="0 0 140 140" className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-garnish">
          <path d="M30,110 Q70,70 110,30" stroke="#375739" strokeWidth="3" fill="none" strokeLinecap="round" />
          {[
            [45, 95, -45], [55, 85, 45],
            [68, 72, -40], [78, 62, 50],
            [90, 50, -45], [98, 42, 45],
          ].map(([x, y, rot], idx) => (
            <ellipse
              key={idx}
              cx={x}
              cy={y}
              rx="4.5"
              ry="14"
              transform={`rotate(${rot} ${x} ${y})`}
              fill="#4d7c4b"
            />
          ))}
        </svg>
      ),
    },
    {
      name: 'Volcanic Micro-Lots',
      desc: 'Panama Boquete Geisha & Ethiopian Heirloom (Centerpiece)',
      isCenterpiece: true,
      svg: (
        <svg viewBox="0 0 200 200" className="w-28 h-28 sm:w-44 sm:h-44 drop-shadow-cutout">
          <circle cx="100" cy="100" r="70" fill="#201e1c" stroke="#36332f" strokeWidth="3" />
          <circle cx="100" cy="100" r="62" fill="#141312" />
          {[
            [85, 80, -25], [115, 82, 35],
            [75, 105, 40], [100, 100, -15], [125, 105, -35],
            [88, 122, 10], [112, 120, -50],
          ].map(([x, y, rot], idx) => (
            <g key={idx} transform={`rotate(${rot} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx="12" ry="8" fill="#3a1e10" />
              <path d={`M${x - 8},${y} Q${x},${y - 2} ${x + 8},${y}`} stroke="#613922" strokeWidth="1.5" fill="none" />
            </g>
          ))}
          <path d="M100,60 Q95,45 105,30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: 'Ceylon Cinnamon',
      desc: 'True rolled quills & sun-dried orange peel',
      svg: (
        <svg viewBox="0 0 140 140" className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-garnish">
          <rect x="30" y="60" width="75" height="15" rx="5" transform="rotate(-30 67 67)" fill="#783c18" />
          <rect x="35" y="72" width="70" height="13" rx="4" transform="rotate(-25 70 78)" fill="#54260d" />
          <path d="M40,40 C60,20 90,30 95,55 C100,75 80,85 70,80" stroke="#d67b27" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Star Anise & Berries',
      desc: 'Whole spice blossoms & mountain blackberries',
      svg: (
        <svg viewBox="0 0 140 140" className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-garnish">
          <g transform="translate(70,70)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <path d="M-5,0 C-7,-18 0,-28 0,-30 C0,-28 7,-18 5,0 Z" fill="#5c2e14" />
                <ellipse cx="0" cy="-20" rx="2.5" ry="3.5" fill="#a86230" />
              </g>
            ))}
            <circle cx="0" cy="0" r="6" fill="#381b0a" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative -mt-6 sm:-mt-10 lg:-mt-16 pt-16 sm:pt-28 pb-20 sm:pb-32 bg-[#181818] overflow-hidden z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-radial from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Centered Text Block: Scrubbed fade from dim grey to full white */}
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 mb-14 sm:mb-24 will-change-transform will-change-opacity"
        >
          <div className="script-kicker !text-[#c98f7e] !text-3xl sm:!text-4xl">
            Discover
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            The Best Ingredients
          </h2>
          <p className="text-xs sm:text-base text-[#9e9a93] leading-relaxed font-sans font-light">
            We partner exclusively with single-estate growers and generational millers who harvest at peak biological ripeness, honoring soil integrity and pure unadulterated flavor.
          </p>
        </div>

        {/* Flat-Lay Row of Ingredient Cutouts entering as a unit */}
        <div
          ref={rowRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8 items-center justify-items-center will-change-transform will-change-opacity"
        >
          {ingredients.map((ing, idx) => (
            <div
              key={ing.name}
              ref={(el) => {
                if (ing.isCenterpiece) {
                  centerpieceRef.current = el;
                } else {
                  sideItemsRef.current[idx] = el;
                }
              }}
              className={`flex flex-col items-center text-center space-y-2 sm:space-y-4 select-none will-change-transform transition-transform duration-300 hover:scale-105 ${
                ing.isCenterpiece ? 'col-span-2 md:col-span-1 -mt-2 sm:-mt-6' : ''
              }`}
            >
              <div className="relative flex items-center justify-center">
                {ing.svg}
              </div>

              <div className="space-y-0.5">
                <div
                  className={`font-serif font-bold text-[#ffffff] ${
                    ing.isCenterpiece ? 'text-sm sm:text-lg text-[#c98f7e]' : 'text-xs sm:text-sm'
                  }`}
                >
                  {ing.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#7d7973] max-w-[150px] leading-snug font-sans">
                  {ing.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
