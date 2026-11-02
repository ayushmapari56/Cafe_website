import React from 'react';
import { motion } from 'motion/react';
import { CAFE_IMAGES } from '../data/cafeData';

export const EventsSection: React.FC = () => {
  return (
    <section id="events" className="relative py-28 sm:py-36 bg-[#181818] overflow-hidden">
      
      {/* Background salt dust above the card */}
      <div className="absolute top-8 right-1/4 w-80 h-80 bg-radial from-white/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-20 w-56 h-56 salt-dust-bg opacity-20 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10">
        
        {/* Mirrored Horizontal Split Card: White Panel on Left (~60%), Photo on Right (~40%) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          {/* Pure White Text Panel on Left (~60%) */}
          <div className="lg:col-span-7 bg-[#ffffff] text-[#181818] p-8 sm:p-14 lg:p-16 lg:pr-20 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative z-20 space-y-6 order-2 lg:order-1">
            
            {/* Script Kicker */}
            <div className="script-kicker !text-[#c98f7e] !text-4xl">
              Discover
            </div>

            {/* Bold Serif Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181818] tracking-tight leading-tight">
              Upcoming Events
            </h2>

            {/* Paragraph Body */}
            <p className="text-sm sm:text-base text-[#4a4742] leading-relaxed font-sans font-light tracking-wide">
              Join our sensory masterclasses, cupping tables, and evening harvest tastings led by our head roasters and visiting farmers from Central America and East Africa.
            </p>

            {/* Featured Event Card Block */}
            <div className="p-5 sm:p-6 bg-[#f7f5f0] border border-[#e5e0d8] space-y-3">
              <div className="font-serif font-bold text-xl sm:text-2xl text-[#181818]">
                Geisha Cupping & Roaster's Tasting
              </div>
              <p className="text-xs sm:text-sm text-[#635f58] leading-relaxed">
                An intimate cupping of 6 rare anaerobic micro-lots with sensory scoring, aroma wheel calibration, and hand-brewed pairings.
              </p>
              
              {/* Right-Aligned Meta Line as in Reference */}
              <div className="text-right pt-2 border-t border-[#dfd9ce] text-xs font-semibold text-[#c98f7e] tracking-wider uppercase">
                Saturday Mornings &nbsp;|&nbsp; 10:00 AM &nbsp;|&nbsp; Tasting Room
              </div>
            </div>

            {/* Link with Animated Arrow */}
            <div className="pt-2">
              <a
                href="#reservation"
                className="link-editorial !text-[#c98f7e] hover:!text-[#a06857] text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 group"
              >
                <span>More Events</span>
                <span className="arrow-icon transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </div>

            {/* Decorative Extra: Wooden Spoon Decoration Overlapping the Bottom-Right Corner */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 pointer-events-none drop-shadow-garnish z-30">
              <svg viewBox="0 0 140 140" className="w-full h-full filter drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]">
                {/* Spoon handle extending across corner */}
                <path
                  d="M10,20 C35,50 65,80 95,110 C102,117 110,118 116,112 C122,106 119,98 112,91 C80,60 50,30 20,8 Z"
                  fill="#784428"
                />
                {/* Oval bowl */}
                <ellipse cx="120" cy="120" rx="24" ry="17" transform="rotate(-45 120 120)" fill="#8a4f31" />
                <ellipse cx="118" cy="118" rx="18" ry="11" transform="rotate(-45 118 118)" fill="#542e18" />
                {/* Roasted beans on spoon */}
                <ellipse cx="114" cy="114" rx="6" ry="4" transform="rotate(-20 114 114)" fill="#2e170c" />
                <ellipse cx="122" cy="122" rx="5" ry="3.5" transform="rotate(35 122 122)" fill="#3e2213" />
              </svg>
            </div>

          </div>

          {/* Photo on Right (~40%): Layered and Offset */}
          <div className="lg:col-span-5 relative z-10 lg:-ml-8 mb-6 lg:mb-0 order-1 lg:order-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[360px] sm:h-[440px] lg:h-[490px] shadow-[0_25px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10 overflow-hidden"
            >
              <img
                src={CAFE_IMAGES.testimonialDish}
                alt="Velvet & Stone gathering and tasting events"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

