import React from 'react';
import { motion } from 'motion/react';
import { CAFE_IMAGES } from '../data/cafeData';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-28 sm:py-36 bg-[#181818] overflow-hidden">
      
      {/* Background salt & smoke dust behind top-left */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-radial from-white/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-16 left-12 w-64 h-64 salt-dust-bg opacity-20 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10">
        
        {/* Centered Horizontal Split Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          {/* Photo on the Left (~40%): Offset and taller than panel to create the layered look */}
          <div className="lg:col-span-5 relative z-20 lg:-mr-8 mb-6 lg:mb-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[360px] sm:h-[440px] lg:h-[490px] shadow-[0_25px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10 overflow-hidden"
            >
              <img
                src={CAFE_IMAGES.geishaPourOver}
                alt="Artisanal pour over and slow roasting process"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </motion.div>

            {/* Salt particles scatter behind top-left corner */}
            <div className="absolute -top-6 -left-6 w-20 h-20 pointer-events-none">
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <rect x="15" y="20" width="3" height="3" fill="#ffffff" opacity="0.6" transform="rotate(30 15 20)" />
                <rect x="35" y="10" width="2" height="2" fill="#ffffff" opacity="0.8" transform="rotate(15 35 10)" />
                <rect x="25" y="45" width="3" height="3" fill="#ffffff" opacity="0.5" transform="rotate(45 25 45)" />
                <circle cx="50" cy="25" r="2" fill="#c98f7e" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Pure White Text Panel on the Right (~60%) */}
          <div className="lg:col-span-7 bg-[#ffffff] text-[#181818] p-8 sm:p-14 lg:p-16 lg:pl-20 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative z-10 space-y-6">
            
            {/* Script Kicker */}
            <div className="script-kicker !text-[#c98f7e] !text-4xl">
              Discover
            </div>

            {/* Bold Serif Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181818] tracking-tight leading-tight">
              Our Story
            </h2>

            {/* Paragraph Body with high letter spacing and clean line height */}
            <p className="text-sm sm:text-base text-[#4a4742] leading-relaxed font-sans font-light tracking-wide">
              Founded on a shared reverence for slow mornings and uncompromised craftsmanship, Velvet & Stone began with a single lever-espresso group and a 6kg cast-iron roaster. We source strictly from organic high-altitude family estates in Boquete, Yirgacheffe, and Huila, where volcanic soil and cool mountain mists yield exceptional complexity.
            </p>

            <p className="text-xs sm:text-sm text-[#736f68] leading-relaxed font-sans font-light">
              Every morning at five o'clock, our ovens warm with Scandinavian sourdough croissants and cardamom knots, baked in synchronized harmony with freshly pulled ristrettos.
            </p>

            {/* Link with Animated Arrow */}
            <div className="pt-2">
              <a
                href="#craft"
                className="link-editorial !text-[#c98f7e] hover:!text-[#a06857] text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 group"
              >
                <span>More About Us</span>
                <span className="arrow-icon transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </div>

            {/* Decorative Extra: Fresh Herb Sprig Overlapping the Bottom-Right Corner */}
            <div className="absolute -bottom-8 -right-8 w-28 h-28 pointer-events-none drop-shadow-garnish z-30">
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.4)]">
                {/* Curved stem */}
                <path d="M15,85 Q45,55 85,15" stroke="#3d633b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Herb leaves */}
                <path d="M35,68 C20,60 25,40 45,45 C45,60 40,68 35,68 Z" fill="#4d7c4b" />
                <path d="M48,55 C65,48 70,30 52,32 C45,42 46,52 48,55 Z" fill="#5c9159" />
                <path d="M68,35 C80,20 95,22 85,38 C75,42 70,38 68,35 Z" fill="#4d7c4b" />
                <circle cx="85" cy="15" r="3" fill="#6ba668" />
              </svg>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

