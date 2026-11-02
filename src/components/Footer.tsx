import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#181818] text-[#9e9a93] pt-16 pb-12 sm:pt-24 sm:pb-16 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12 sm:space-y-16">
        
        {/* 4 Columns Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Column 1: Location */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c98f7e]">
              Location
            </h4>
            <div className="text-xs leading-relaxed space-y-1 text-[#b5b1a9]">
              <div>142 Mercer Street</div>
              <div>Soho, New York, NY 10012</div>
              <div className="pt-1 text-[#736f68]">(212) 555-0194</div>
            </div>
          </div>

          {/* Column 2: Working Hours */}
          <div className="lg:col-span-4 space-y-2 sm:space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c98f7e]">
              Working Hours
            </h4>
            <div className="text-xs leading-relaxed space-y-1.5 text-[#b5b1a9]">
              <div className="flex justify-between items-center pr-2 sm:pr-4">
                <span className="text-[#888]">Mon – Thu</span>
                <span className="font-mono text-white/90">07:00 AM – 06:00 PM</span>
              </div>
              <div className="flex justify-between items-center pr-2 sm:pr-4">
                <span className="text-[#888]">Friday</span>
                <span className="font-mono text-white/90">07:00 AM – 07:00 PM</span>
              </div>
              <div className="flex justify-between items-center pr-2 sm:pr-4">
                <span className="text-[#888]">Sat – Sun</span>
                <span className="font-mono text-white/90">08:00 AM – 07:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 3: Spacing & Roaster's Dispatch */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c98f7e]">
              Dispatch
            </h4>
            {subscribed ? (
              <div className="text-xs text-[#c98f7e] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Harvest list joined.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c98f7e]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-2 text-[#c98f7e] hover:text-white"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>

          {/* Column 4: Script Logo & Right-Aligned Contact */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-3 text-left lg:text-right">
            <div className="font-script text-3xl sm:text-4xl text-[#c98f7e] tracking-wide">
              Velvet & Stone
            </div>
            <div className="text-xs text-[#888] space-y-0.5">
              <div>hello@velvetandstone.com</div>
              <div>@velvetandstoneroasters</div>
            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright Line */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666] gap-3">
          <div>
            © {new Date().getFullYear()} Velvet & Stone Roastery & Bakehouse. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#story" className="hover:text-[#c98f7e] transition-colors">Terroir</a>
            <a href="#menu" className="hover:text-[#c98f7e] transition-colors">Counter Menu</a>
            <a href="#reservation" className="hover:text-[#c98f7e] transition-colors">Reservations</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
