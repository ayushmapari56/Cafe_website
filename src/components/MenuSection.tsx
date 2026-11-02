import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye } from 'lucide-react';
import { MENU_ITEMS, CAFE_IMAGES } from '../data/cafeData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const tartine = MENU_ITEMS.find((i) => i.id === 'avocado-poached-tartine') || MENU_ITEMS[3];
  const signatureSet = MENU_ITEMS.find((i) => i.id === 'flat-white-croissant-set') || MENU_ITEMS[4];
  const matchaCloud = MENU_ITEMS.find((i) => i.id === 'matcha-vanilla-cloud') || MENU_ITEMS[2];
  const pastryDessert = MENU_ITEMS.find((i) => i.id === 'cardamom-swirl-bun') || MENU_ITEMS[1];

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const garnishRefs = useRef<(HTMLDivElement | null)[]>([]);

  const menuZigzag = [
    {
      item: tartine,
      kicker: 'Appetizer & Brunch',
      platePosition: 'left' as const,
      image: CAFE_IMAGES.brunchTartine,
      line1: 'Toasted country sourdough levain with crushed ripe avocado,',
      line2: 'soft poached farm egg, watermelon radish, and Aleppo chili oil.',
      garnish: 'herbs-tomato',
    },
    {
      item: signatureSet,
      kicker: 'Signature Roast & Viennoiserie',
      platePosition: 'right' as const,
      image: CAFE_IMAGES.heroDish,
      line1: 'Double ristretto pull of Velvet Espresso with microfoam oat milk,',
      line2: 'served alongside our signature warm Normandy butter croissant.',
      garnish: 'beans-cinnamon',
      isHeroScale: true,
    },
    {
      item: matchaCloud,
      kicker: 'Chilled Tonic',
      platePosition: 'left' as const,
      image: CAFE_IMAGES.matchaCloud,
      line1: 'First-harvest Uji ceremonial matcha whisked tableside over iced spring water,',
      line2: 'crowned with slow-whipped bourbon vanilla bean cold foam.',
      garnish: 'lemon-mint',
    },
    {
      item: pastryDessert,
      kicker: 'Dessert & Bakehouse',
      platePosition: 'right' as const,
      image: CAFE_IMAGES.cardamomBun,
      line1: 'Twisted brioche laminated with cultured butter, crushed green cardamom,',
      line2: 'and crunchy Swedish pearl sugar crust baked at dawn.',
      garnish: 'sugar-fork',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      menuZigzag.forEach((_, idx) => {
        const row = rowRefs.current[idx];
        const plate = plateRefs.current[idx];
        const textBlock = textRefs.current[idx];
        const garnish = garnishRefs.current[idx];
        if (!row || !plate || !textBlock) return;

        // 1. PLATES TRAVEL FASTER THAN TEXT (~1.3x speed):
        // Scrubbed upward velocity: plate travels faster than row text
        gsap.fromTo(
          plate,
          { yPercent: 32 },
          {
            yPercent: -36,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );

        // 2. PLATES FADE IN AS THEY ENTER FROM BOTTOM (t=4.75 & t=5.5 ghosted entry)
        // Starts faint/semi-transparent at bottom, reaches 1.0 by 60–70% up viewport
        gsap.fromTo(
          plate,
          { opacity: 0.22 },
          {
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 95%',
              end: 'center 55%',
              scrub: 0.6,
            },
          }
        );

        // 3. TEXT TRAVELS AT NORMAL SPEED (~1.0x):
        gsap.fromTo(
          textBlock,
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );

        // 4. TEXT REVEALS PROGRESSIVELY ACROSS LINES:
        const lines = textBlock.querySelectorAll('.menu-reveal-line');
        lines.forEach((line, lineIdx) => {
          gsap.fromTo(
            line,
            { opacity: 0.25, y: 8 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: `top ${80 - lineIdx * 8}%`,
                end: `top ${55 - lineIdx * 8}%`,
                scrub: 0.6,
              },
            }
          );
        });

        // 5. GARNISHES MOVE AT A THIRD INDEPENDENT SPEED (~1.5x):
        if (garnish) {
          gsap.fromTo(
            garnish,
            { yPercent: 45, rotate: -10 },
            {
              yPercent: -50,
              rotate: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative -mt-8 sm:-mt-12 py-16 sm:py-24 lg:py-32 bg-transparent overflow-hidden z-20"
    >
      {/* Background flour & salt dust */}
      <div className="absolute inset-0 salt-dust-bg opacity-10 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Section Header: Top center-right layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end pb-12 sm:pb-20 border-b border-white/10">
          <div className="lg:col-span-5 lg:col-start-2 space-y-1 text-center sm:text-left">
            <span className="script-kicker !text-[#c98f7e] !text-3xl sm:!text-4xl">Discover</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
              Our Menu
            </h2>
          </div>
          <div className="lg:col-span-5 text-[#9e9a93] text-xs sm:text-base leading-relaxed font-sans font-light text-center sm:text-left">
            Each creation is an exploration in terroir, calibrated temperature, and morning bakecraft. Savor unhurried flavors crafted from organic single-origin estates.
          </div>
        </div>

        {/* Diagonal Zigzag Dishes Flow */}
        <div className="space-y-16 sm:space-y-28 lg:space-y-36 pt-12 sm:pt-20">
          {menuZigzag.map((entry, index) => {
            const isLeft = entry.platePosition === 'left';
            return (
              <div
                key={entry.item.id}
                ref={(el) => { rowRefs.current[index] = el; }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isLeft ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Round White Plate Container (Speed: ~1.3x) */}
                <div
                  className={`lg:col-span-6 relative flex justify-center ${
                    isLeft ? 'order-1 lg:justify-start' : 'order-1 lg:order-2 lg:justify-end'
                  }`}
                >
                  <div
                    ref={(el) => { plateRefs.current[index] = el; }}
                    className={`relative rounded-full cursor-pointer group select-none will-change-transform ${
                      entry.isHeroScale
                        ? 'w-60 h-60 xs:w-72 xs:h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]'
                        : 'w-52 h-52 xs:w-64 xs:h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px]'
                    }`}
                    onClick={() => onSelectItem(entry.item)}
                  >
                    {/* Deep Plate Drop Shadow */}
                    <div className="absolute inset-3 sm:inset-4 rounded-full bg-black/90 blur-xl sm:blur-2xl group-hover:blur-3xl transition-all" />

                    {/* Ceramic Rim: Pure White Plate Base */}
                    <div className="relative w-full h-full rounded-full p-2 sm:p-3.5 bg-gradient-to-tr from-[#ebe8e1] via-[#ffffff] to-[#f4f2ec] shadow-[0_20px_45px_rgba(0,0,0,0.85)] ring-1 ring-white/20">
                      <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner">
                        <img
                          src={entry.image}
                          alt={entry.item.name}
                          className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-108"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/25 via-transparent to-white/20 pointer-events-none" />

                        {/* Hover Action Eye */}
                        <div className="absolute inset-0 rounded-full bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="p-2.5 sm:p-3 bg-white text-[#181818] rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Garnishes Near Plate (Speed: ~1.5x) */}
                    <div
                      ref={(el) => { garnishRefs.current[index] = el; }}
                      className="will-change-transform"
                    >
                      {entry.garnish === 'herbs-tomato' && (
                        <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none drop-shadow-garnish">
                          <svg viewBox="0 0 80 80" className="w-full h-full">
                            <circle cx="35" cy="45" r="14" fill="#a83226" />
                            <ellipse cx="32" cy="40" rx="3" ry="1.5" fill="#ff7f6e" opacity="0.6" />
                            <path d="M35,31 C38,25 44,22 48,20" stroke="#486e3f" strokeWidth="2" fill="none" />
                            <ellipse cx="50" cy="50" rx="3" ry="8" transform="rotate(35 50 50)" fill="#4d7c4b" />
                          </svg>
                        </div>
                      )}

                      {entry.garnish === 'beans-cinnamon' && (
                        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none drop-shadow-garnish">
                          <svg viewBox="0 0 80 80" className="w-full h-full">
                            <ellipse cx="30" cy="30" rx="9" ry="6" transform="rotate(-30 30 30)" fill="#3e2213" />
                            <ellipse cx="48" cy="42" rx="8" ry="5" transform="rotate(40 48 42)" fill="#2b160c" />
                            <rect x="20" y="50" width="3" height="3" fill="#ffffff" opacity="0.8" />
                            <rect x="55" y="25" width="2" height="2" fill="#ffffff" opacity="0.7" />
                          </svg>
                        </div>
                      )}

                      {entry.garnish === 'lemon-mint' && (
                        <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none drop-shadow-garnish">
                          <svg viewBox="0 0 80 80" className="w-full h-full">
                            <circle cx="40" cy="40" r="16" fill="#e5b433" />
                            <circle cx="40" cy="40" r="13" fill="#f8e078" />
                            <ellipse cx="55" cy="25" rx="4" ry="9" transform="rotate(45 55 25)" fill="#4e8c52" />
                          </svg>
                        </div>
                      )}

                      {entry.garnish === 'sugar-fork' && (
                        <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none drop-shadow-garnish">
                          <svg viewBox="0 0 80 80" className="w-full h-full">
                            <circle cx="45" cy="35" r="2.5" fill="#ffffff" />
                            <circle cx="52" cy="45" r="2" fill="#ffffff" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Opposite Text Description Panel (Speed: ~1.0x) */}
                <div
                  ref={(el) => { textRefs.current[index] = el; }}
                  className={`lg:col-span-6 space-y-3 sm:space-y-4 text-center lg:text-left will-change-transform ${
                    isLeft ? 'order-2 lg:pl-6' : 'order-2 lg:order-1 lg:pr-6'
                  }`}
                >
                  {/* Script Kicker */}
                  <div className="script-kicker !text-[#c98f7e] !text-2xl sm:!text-3xl menu-reveal-line">
                    {entry.kicker}
                  </div>

                  {/* Dish Name + Price */}
                  <div className="flex flex-wrap items-baseline justify-center lg:justify-between gap-2 sm:gap-4 menu-reveal-line">
                    <h3
                      onClick={() => onSelectItem(entry.item)}
                      className="text-xl xs:text-2xl sm:text-3xl font-serif font-bold text-white hover:text-[#c98f7e] transition-colors cursor-pointer"
                    >
                      {entry.item.name}
                    </h3>
                    <span className="font-serif font-semibold text-base sm:text-xl text-[#c98f7e] tabular-nums">
                      ${entry.item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Progressive Line-by-Line Revealing Description */}
                  <div className="space-y-1 max-w-md mx-auto lg:mx-0 font-sans font-light text-xs sm:text-base text-[#9e9a93] leading-relaxed">
                    <div className="menu-reveal-line">{entry.line1}</div>
                    <div className="menu-reveal-line">{entry.line2}</div>
                  </div>

                  {/* Tasting notes */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-[11px] sm:text-xs text-[#b8b3ab] pt-0.5 menu-reveal-line">
                    {entry.item.tastingNotes.map((note, idx) => (
                      <span key={note} className="tracking-wide">
                        {note}
                        {idx < entry.item.tastingNotes.length - 1 && (
                          <span className="text-[#c98f7e] ml-2">·</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 sm:pt-4 flex items-center justify-center lg:justify-start gap-4">
                    <button
                      onClick={() => onQuickAdd(entry.item)}
                      className="btn-outline-editorial text-[11px] sm:text-xs py-2 px-5"
                    >
                      <span>Add To Order</span>
                    </button>

                    <button
                      onClick={() => onSelectItem(entry.item)}
                      className="link-editorial text-[11px] sm:text-xs font-semibold uppercase tracking-wider group py-1"
                    >
                      <span>Details</span>
                      <span className="arrow-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
