import React from 'react';
import { motion } from 'motion/react';
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

  const menuZigzag = [
    {
      item: tartine,
      kicker: 'Appetizer & Brunch',
      platePosition: 'left' as const,
      image: CAFE_IMAGES.brunchTartine,
      description: 'Toasted country sourdough levain with crushed ripe avocado, soft poached farm egg, watermelon radish, micro shiso, and Aleppo pepper oil.',
      garnish: 'herbs-tomato',
    },
    {
      item: signatureSet,
      kicker: 'Signature Roast & Viennoiserie',
      platePosition: 'right' as const,
      image: CAFE_IMAGES.heroDish,
      description: 'Double ristretto pull of Velvet Espresso with micro-textured oat milk, served alongside our signature Normandy butter croissant.',
      garnish: 'beans-cinnamon',
      isHeroScale: true,
    },
    {
      item: matchaCloud,
      kicker: 'Chilled Tonic',
      platePosition: 'left' as const,
      image: CAFE_IMAGES.matchaCloud,
      description: 'First-harvest Uji ceremonial matcha whisked tableside over iced spring water, crowned with vanilla bean cold foam.',
      garnish: 'lemon-mint',
    },
    {
      item: pastryDessert,
      kicker: 'Dessert & Bakehouse',
      platePosition: 'right' as const,
      image: CAFE_IMAGES.cardamomBun,
      description: 'Twisted brioche laminated with cultured butter, crushed green cardamom pods, and crunchy Swedish pearl sugar crust.',
      garnish: 'sugar-fork',
    },
  ];

  return (
    <section id="menu" className="relative py-16 sm:py-28 lg:py-36 bg-[#181818] overflow-hidden">
      
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
          {menuZigzag.map((entry) => {
            const isLeft = entry.platePosition === 'left';
            return (
              <motion.div
                key={entry.item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isLeft ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Round White Plate Container */}
                <div
                  className={`lg:col-span-6 relative flex justify-center ${
                    isLeft ? 'order-1 lg:justify-start' : 'order-1 lg:order-2 lg:justify-end'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className={`relative rounded-full cursor-pointer group select-none ${
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

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="p-2.5 sm:p-3 bg-white text-[#181818] rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scattered Garnishes & Salt Near Plate */}
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
                  </motion.div>
                </div>

                {/* Opposite Text Description Panel */}
                <div
                  className={`lg:col-span-6 space-y-3 sm:space-y-4 text-center lg:text-left ${
                    isLeft ? 'order-2 lg:pl-6' : 'order-2 lg:order-1 lg:pr-6'
                  }`}
                >
                  {/* Script Kicker */}
                  <div className="script-kicker !text-[#c98f7e] !text-2xl sm:!text-3xl">
                    {entry.kicker}
                  </div>

                  {/* Dish Name + Price */}
                  <div className="flex flex-wrap items-baseline justify-center lg:justify-between gap-2 sm:gap-4">
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

                  {/* 1-2 line description */}
                  <p className="text-xs sm:text-base text-[#9e9a93] leading-relaxed font-sans font-light max-w-md mx-auto lg:mx-0">
                    {entry.description}
                  </p>

                  {/* Tasting notes */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-[11px] sm:text-xs text-[#b8b3ab] pt-0.5">
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
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
