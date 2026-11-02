import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Droplets, Mountain, Award, Sliders, Check } from 'lucide-react';
import { ROAST_PROFILES } from '../data/cafeData';
import { RoastProfile } from '../types';

export const RoastRitualSection: React.FC = () => {
  const [selectedRoast, setSelectedRoast] = useState<RoastProfile>(ROAST_PROFILES[0]);
  const [cups, setCups] = useState<number>(2);

  // Brew ratio math: 15g per 240ml cup (1:16 ratio)
  const coffeeGrams = cups * 15;
  const waterMl = cups * 240;

  return (
    <section id="craft" className="relative py-24 sm:py-32 bg-[#F3EDE2]/60 border-y border-[#EADBCC]/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9C4F1B]">
            Sensory Science & Craft
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#201713] tracking-tight">
            The Micro-Roast Ritual
          </h2>
          <p className="text-sm sm:text-base text-[#6B5B52]">
            We roast strictly in small 6kg drums twice weekly, calibrating gas curves and airflow to articulate the terroir of each origin.
          </p>
        </div>

        {/* 2-Column Split: Roast Profile Selector & Interactive Flavor Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Roast Selector Tabs & Detailed Origin Story */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Roast Switcher Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              {ROAST_PROFILES.map((roast) => {
                const isSelected = selectedRoast.id === roast.id;
                return (
                  <button
                    key={roast.id}
                    onClick={() => setSelectedRoast(roast)}
                    className={`flex-1 p-3.5 text-left rounded-xl transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-white border-[#201713] shadow-md ring-1 ring-[#201713]/10'
                        : 'bg-white/60 border-[#EADBCC] hover:bg-white text-[#6B5B52]'
                    }`}
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9C4F1B]">
                      {roast.roastLevel}
                    </div>
                    <div className="text-sm font-serif font-bold text-[#201713] truncate">
                      {roast.origin.split(',')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Card for Selected Roast */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoast.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCC] shadow-sm space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#8A7568] mb-1">
                    <Mountain className="w-3.5 h-3.5 text-[#D85A2A]" />
                    <span>{selectedRoast.altitude}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedRoast.varietal}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#201713]">
                    {selectedRoast.name}
                  </h3>
                  <p className="text-xs text-[#9C4F1B] font-medium mt-0.5">
                    {selectedRoast.origin} ({selectedRoast.farm})
                  </p>
                </div>

                <p className="text-sm text-[#6B5B52] leading-relaxed">
                  {selectedRoast.description}
                </p>

                {/* Tasting Notes */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#201713] mb-2">
                    Cup Tasting Notes
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedRoast.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 bg-[#FAF7F2] text-[#201713] border border-[#EADBCC] rounded-full font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sensory Spectrum Bars */}
                <div className="space-y-3 pt-2 border-t border-[#EADBCC]/60">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#201713]">
                    Extraction Profile
                  </div>

                  {[
                    { label: 'Brightness & Acidity', value: selectedRoast.acidity, color: 'bg-[#D85A2A]' },
                    { label: 'Caramel Sweetness', value: selectedRoast.sweetness, color: 'bg-[#C47335]' },
                    { label: 'Syrupy Mouthfeel / Body', value: selectedRoast.body, color: 'bg-[#6E3E26]' },
                    { label: 'Aromatic Florals', value: selectedRoast.aroma, color: 'bg-[#9C4F1B]' },
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#6B5B52]">
                        <span>{metric.label}</span>
                        <span className="font-mono tabular-nums font-semibold text-[#201713]">
                          {metric.value} / 5
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#FAF7F2] rounded-full overflow-hidden border border-[#EADBCC]/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(metric.value / 5) * 100}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-full ${metric.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Column: Interactive Brew Calculator & Extraction Ritual */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCC] shadow-sm space-y-6">
              
              <div className="space-y-1.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9C4F1B]">
                  Interactive Brewing Calculator
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#201713]">
                  Golden Ratio Pour Calculator
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5B52]">
                  We brew at an exact 1:16 ratio with soft 45ppm remineralized mountain water at 93°C.
                </p>
              </div>

              {/* Cup selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#201713]">
                  <span>Serving Quantity</span>
                  <span className="font-mono tabular-nums">{cups} {cups === 1 ? 'Cup' : 'Cups'} (8oz / 240ml)</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCups(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        cups === num
                          ? 'bg-[#201713] text-white shadow-sm'
                          : 'bg-[#FAF7F2] text-[#6B5B52] border border-[#EADBCC] hover:bg-white'
                      }`}
                    >
                      {num} {num === 1 ? 'cup' : 'cups'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EADBCC] text-center space-y-1">
                  <div className="text-xs text-[#8A7568] uppercase font-semibold">Fresh Ground Coffee</div>
                  <div className="text-2xl font-serif font-bold text-[#201713] font-mono tabular-nums">
                    {coffeeGrams}g
                  </div>
                  <div className="text-[11px] text-[#9C4F1B]">Medium-fine grind</div>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EADBCC] text-center space-y-1">
                  <div className="text-xs text-[#8A7568] uppercase font-semibold">Water at 93°C</div>
                  <div className="text-2xl font-serif font-bold text-[#201713] font-mono tabular-nums">
                    {waterMl}ml
                  </div>
                  <div className="text-[11px] text-[#9C4F1B]">3-stage spiral pour</div>
                </div>
              </div>

              {/* Brew Step Timeline */}
              <div className="space-y-3 pt-3 border-t border-[#EADBCC]/60 text-xs text-[#6B5B52]">
                <div className="font-semibold text-[#201713] uppercase tracking-wider text-[11px]">
                  3-Stage Pour Timing
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[#D85A2A] font-bold text-xs shrink-0">0:00 - 0:45</span>
                    <span><strong>Bloom:</strong> Pour {coffeeGrams * 2}ml water. Allow CO₂ gas to bubble away for 45s.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[#D85A2A] font-bold text-xs shrink-0">0:45 - 1:45</span>
                    <span><strong>First Pour:</strong> Gentle clockwise spiral out to {Math.round(waterMl * 0.6)}ml.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[#D85A2A] font-bold text-xs shrink-0">1:45 - 3:00</span>
                    <span><strong>Finishing Draw:</strong> Final pour to {waterMl}ml. Flat coffee bed indicates optimal channeling.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
