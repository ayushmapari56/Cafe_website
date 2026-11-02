import React from 'react';
import { motion } from 'motion/react';

export const IngredientsSection: React.FC = () => {
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
    <section id="ingredients" className="relative py-16 sm:py-28 lg:py-36 bg-[#181818] overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-radial from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Centered Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 mb-12 sm:mb-20"
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
        </motion.div>

        {/* Flat-Lay Row of Ingredient Cutouts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8 items-center justify-items-center">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.04 }}
              className={`flex flex-col items-center text-center space-y-2 sm:space-y-4 select-none ${
                ing.isCenterpiece ? 'col-span-2 md:col-span-1 -mt-2 sm:-mt-6' : ''
              }`}
            >
              <div className="relative flex items-center justify-center">
                {ing.svg}
              </div>

              <div className="space-y-0.5">
                <div className={`font-serif font-bold text-[#ffffff] ${ing.isCenterpiece ? 'text-sm sm:text-lg text-[#c98f7e]' : 'text-xs sm:text-sm'}`}>
                  {ing.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#7d7973] max-w-[150px] leading-snug font-sans">
                  {ing.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
