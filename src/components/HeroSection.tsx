import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
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

  const { scrollY } = useScroll();

  // Multi-speed parallax transforms for hero elements on scroll
  const yHeroCenter = useTransform(scrollY, [0, 800], [0, -120]);
  const yHeadline = useTransform(scrollY, [0, 800], [0, -40]);
  const ySpoon = useTransform(scrollY, [0, 800], [0, -220]);
  const yHerbs = useTransform(scrollY, [0, 800], [0, -170]);
  const yBerries = useTransform(scrollY, [0, 800], [0, -260]);
  const ySpices = useTransform(scrollY, [0, 800], [0, -190]);
  const rotateDish = useTransform(scrollY, [0, 800], [0, 15]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-24 lg:pt-36 lg:pb-32 overflow-hidden bg-[#181818]"
    >
      {/* Background ambient salt/particle field */}
      <div className="absolute inset-0 salt-dust-bg opacity-15 pointer-events-none" />

      {/* Subtle radial dark vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#181818]/60 to-[#181818] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Headline & Outlined CTAs (z-10 so hero image on z-20 overlaps text) */}
          <motion.div
            style={{ y: yHeadline }}
            className="lg:col-span-7 z-10 space-y-7 lg:pr-6"
          >
            {/* Script Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="script-kicker"
            >
              Artisanal Roastery & Bakehouse
            </motion.div>

            {/* 3-Line Bold Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-serif font-bold text-white leading-[1.04] tracking-tight"
            >
              Take A Sip. <br />
              And Sit With Us. <br />
              <span className="text-[#e2ded6]">Endlessly Aromatic.</span>
            </motion.h1>

            {/* Editorial Body Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#9e9a93] max-w-lg leading-relaxed font-sans font-light tracking-wide"
            >
              We source high-elevation micro-lots from volcanic misty soils, slow-roasting in small 6kg drums. Pulled through hand-tuned levers and accompanied by laminated pastries baked warm before dawn.
            </motion.p>

            {/* Outlined Action Button + Editorial Arrow Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <button
                onClick={onOpenReservation}
                className="btn-outline-editorial"
              >
                Book A Table
              </button>

              <button
                onClick={onExploreMenu}
                className="link-editorial group"
              >
                <span>Explore Today's Menu</span>
                <span className="arrow-icon">→</span>
              </button>
            </motion.div>

            {/* Terroir & Origin Kicker Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-[#9e9a93] tracking-wider"
            >
              <span className="text-[#c98f7e] font-serif italic text-sm">Feature:</span>
              <span className="text-white font-medium">Panama Boquete Geisha (1,750m MASL)</span>
              <span className="text-white/30">|</span>
              <span className="hidden sm:inline text-[#9e9a93]">White Peach · Jasmine · Bergamot</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Pan & Steak/Coffee Dish Overlapping Headline */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end z-20">
            
            {/* The Main Cutout Hero Dish Container (Negative left margin on lg to overlap text) */}
            <motion.div
              style={{
                y: yHeroCenter,
                rotate: rotateDish,
              }}
              className="relative w-80 h-80 sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] lg:-ml-24 xl:-ml-32 select-none group"
            >
              {/* Soft dark contact drop shadow */}
              <div className="absolute inset-4 rounded-full bg-black/80 blur-3xl -z-10 scale-95 transform translate-y-6" />

              {/* Pan & Dish Rim: Cast-iron textured rim with wooden handle feel */}
              <motion.div
                initial={{ scale: 0.88, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-full p-3 sm:p-4 bg-gradient-to-tr from-[#121212] via-[#2a2420] to-[#1a1816] ring-1 ring-white/10 drop-shadow-cutout transition-transform duration-700 group-hover:scale-[1.02]"
              >
                {/* Cast iron inner dish */}
                <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner ring-1 ring-black/40">
                  <img
                    src={CAFE_IMAGES.heroDish}
                    alt="Velvet Flat white coffee and warm almond croissant on circular platter"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle lighting overlay on dish */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating Quick Add Pill on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-3 left-6 sm:bottom-4 sm:left-4 bg-[#ffffff] text-[#181818] px-5 py-3 rounded-none shadow-[0_20px_35px_rgba(0,0,0,0.6)] z-30 max-w-xs space-y-1 border border-white"
              >
                <div className="flex items-center justify-between text-xs font-serif font-bold">
                  <span>Velvet Morning Pair</span>
                  <span className="text-[#c98f7e] tabular-nums">$10.00</span>
                </div>
                <div className="text-[11px] text-[#6b665f] leading-snug">
                  Double espresso flat white & flaky croissant.
                </div>
                <button
                  onClick={() => onQuickAdd(heroItem)}
                  className="mt-1 text-[11px] font-semibold tracking-wider uppercase text-[#c98f7e] hover:text-[#181818] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Quick Add +</span>
                </button>
              </motion.div>

              {/* Floating Garnishes around the hero dish (Tomatoes/cherries, wooden spoon, rosemary herbs, peppercorns, salt) */}
              
              {/* 1. Wooden spoon at top-left drifting upward */}
              <motion.div
                style={{ y: ySpoon }}
                className="absolute -top-12 -left-10 sm:-top-16 sm:-left-12 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none drop-shadow-garnish"
              >
                <svg viewBox="0 0 160 160" className="w-full h-full filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.7)]">
                  <path
                    d="M10,20 C40,50 65,80 100,115 C108,122 116,122 122,116 C126,111 122,103 115,96 C80,62 48,32 18,8 Z"
                    fill="#7a462b"
                  />
                  <ellipse cx="128" cy="128" rx="26" ry="18" transform="rotate(-40 128 128)" fill="#8d5435" />
                  <ellipse cx="126" cy="126" rx="20" ry="12" transform="rotate(-40 128 128)" fill="#542e18" />
                  {/* Salt & coffee dust on spoon */}
                  <circle cx="124" cy="124" r="2" fill="#ffffff" opacity="0.8" />
                  <circle cx="130" cy="122" r="1.5" fill="#ffffff" opacity="0.9" />
                  <circle cx="122" cy="128" r="1.5" fill="#c98f7e" />
                </svg>
              </motion.div>

              {/* 2. Sprig of Rosemary / Fresh Herbs at top-right */}
              <motion.div
                style={{ y: yHerbs }}
                className="absolute -top-8 right-8 sm:-top-10 sm:right-12 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none drop-shadow-garnish"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <path d="M20,100 Q60,60 100,20" stroke="#3b5e3d" strokeWidth="3" fill="none" strokeLinecap="round" />
                  {/* Rosemary needles */}
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
              </motion.div>

              {/* 3. Cherry Tomatoes / Coffee Cherries bottom-right */}
              <motion.div
                style={{ y: yBerries }}
                className="absolute -bottom-6 right-6 sm:-bottom-8 sm:right-10 w-24 h-24 pointer-events-none drop-shadow-garnish"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Cherry 1 */}
                  <circle cx="45" cy="55" r="18" fill="#a83226" />
                  <ellipse cx="40" cy="48" rx="4" ry="2" fill="#ff7f6e" opacity="0.6" />
                  <path d="M45,37 C46,30 52,25 56,22" stroke="#486e3f" strokeWidth="2.5" fill="none" />
                  {/* Cherry 2 */}
                  <circle cx="68" cy="65" r="14" fill="#8a251b" />
                  <ellipse cx="64" cy="60" rx="3" ry="1.5" fill="#ff7f6e" opacity="0.5" />
                  {/* Herb leaf */}
                  <path d="M45,38 C55,42 62,35 60,30 C50,30 46,35 45,38 Z" fill="#52834b" />
                </svg>
              </motion.div>

              {/* 4. Roasted Peppercorns & Salt crystals scatter */}
              <motion.div
                style={{ y: ySpices }}
                className="absolute top-1/2 -right-8 w-16 h-28 pointer-events-none"
              >
                {/* Salt crystal 1 */}
                <rect x="10" y="20" width="4" height="4" transform="rotate(25 10 20)" fill="#ffffff" opacity="0.85" />
                <rect x="25" y="45" width="3" height="3" transform="rotate(45 25 45)" fill="#ffffff" opacity="0.7" />
                <rect x="14" y="70" width="4" height="4" transform="rotate(15 14 70)" fill="#ffffff" opacity="0.9" />
                {/* Black peppercorn */}
                <circle cx="28" cy="30" r="5" fill="#24211e" stroke="#12100e" strokeWidth="1" />
                <circle cx="18" cy="90" r="4.5" fill="#2c2825" />
                <ellipse cx="27" cy="28" rx="1.5" ry="1" fill="#4d4742" />
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
