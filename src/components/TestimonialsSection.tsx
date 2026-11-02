import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS, CAFE_IMAGES } from '../data/cafeData';

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const current = TESTIMONIALS[activeIdx];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big Circular Dish Showcase (Direct inspiration from frame 5 of Pinterest video) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] group cursor-pointer"
            >
              {/* Soft contact shadow */}
              <div className="absolute inset-8 -bottom-4 bg-[#3E2316]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all" />

              {/* Circular ceramic plate */}
              <div className="w-full h-full rounded-full overflow-hidden p-2 bg-gradient-to-tr from-[#EADBCC] via-[#F4EFE6] to-[#D5C2B1] shadow-[0_24px_50px_-12px_rgba(45,28,15,0.25)] ring-1 ring-black/5">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src={CAFE_IMAGES.testimonialDish}
                    alt="Artisan brioche french toast with wild berries, mint, and pure maple syrup"
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Floating caption chip */}
              <div className="absolute -bottom-2 right-4 bg-white/95 backdrop-blur-md border border-[#EADBCC] px-4 py-2 rounded-2xl shadow-lg text-xs font-serif font-bold text-[#201713]">
                Wild Berry French Toast
              </div>
            </motion.div>
          </div>

          {/* Right Column: Quotes & Interactive Avatar Switcher */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9C4F1B]">
                Guest Reverence
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#201713] tracking-tight">
                Let's see what others say
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5B52]">
                A sanctuary for conversations, slow mornings, and sensory discovery.
              </p>
            </div>

            {/* Testimonial Quote Box */}
            <div className="min-h-[190px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <Quote className="w-8 h-8 text-[#D85A2A]/40" />

                  <blockquote className="text-lg sm:text-xl font-serif text-[#201713] leading-relaxed italic">
                    "{current.quote}"
                  </blockquote>

                  <div>
                    <div className="font-semibold text-sm text-[#201713]">
                      {current.author}
                    </div>
                    <div className="text-xs text-[#8A7568]">
                      {current.role}
                    </div>
                    <div className="text-xs text-[#D85A2A] font-medium mt-1">
                      Usual Order: <span className="text-[#201713]">{current.favoriteOrder}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive 3-Avatar Selector (Direct reference to Pinterest video frame 5) */}
            <div className="pt-4 border-t border-[#EADBCC]/80 flex items-center gap-4">
              <span className="text-xs font-medium text-[#6B5B52]">
                Select guest:
              </span>
              <div className="flex items-center gap-3">
                {TESTIMONIALS.map((t, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`relative w-12 h-12 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center font-serif font-bold text-xs ${
                        isActive
                          ? 'scale-110 ring-3 ring-[#D85A2A] ring-offset-2 bg-[#201713] text-white shadow-md'
                          : 'bg-[#FAF7F2] text-[#6B5B52] border border-[#EADBCC] hover:bg-white hover:scale-105'
                      }`}
                      aria-label={`View feedback from ${t.author}`}
                    >
                      {t.avatar}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
