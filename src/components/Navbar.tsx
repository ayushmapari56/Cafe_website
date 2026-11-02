import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple section spy
      const sections = ['home', 'story', 'menu', 'events', 'ingredients', 'reservation'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'story', label: 'About Us', href: '#story' },
    { id: 'menu', label: 'Menu', href: '#menu' },
    { id: 'events', label: 'Events', href: '#events' },
    { id: 'ingredients', label: 'Ingredients', href: '#ingredients' },
    { id: 'reservation', label: 'Reservations', href: '#reservation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#181818]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl'
          : 'bg-transparent py-6 sm:py-7'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 flex items-center justify-between gap-6">
        {/* Left: Script Wordmark in Rose/Copper */}
        <a
          href="#"
          className="font-script text-3xl sm:text-4xl text-[#c98f7e] hover:text-[#dfb2a4] transition-colors whitespace-nowrap shrink-0 tracking-wide select-none"
        >
          Velvet & Stone
        </a>

        {/* Right: Nav items, language switcher, cart */}
        <div className="hidden lg:flex items-center gap-7">
          <nav className="flex items-center gap-6 xl:gap-8 text-[13px] tracking-wider uppercase font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#9e9a93] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-[-2px] left-0 right-0 h-[1.5px] bg-[#c98f7e] rounded-full transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-[13px] tracking-wider text-[#9e9a93] hover:text-white transition-colors cursor-pointer pl-2 border-l border-white/10">
            <span>EN</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </div>

          {/* Action / Cart Bag */}
          <div className="flex items-center gap-3 pl-2">
            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c98f7e] text-[#181818] text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenReservation}
              className="btn-outline-editorial text-[11px] py-2 px-4 rounded-none"
            >
              Book Table
            </button>
          </div>
        </div>

        {/* Mobile Hamburger & Cart */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2 text-white/80 hover:text-white cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c98f7e] text-[#181818] text-[10px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181818]/98 border-b border-white/10 px-8 py-8 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-5 text-sm tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-[#9e9a93] hover:text-[#c98f7e] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="btn-outline-editorial w-full py-3 text-xs"
              >
                Book A Table
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 text-xs tracking-wider uppercase font-semibold text-[#181818] bg-[#c98f7e] hover:bg-[#b87b6a] transition-colors"
              >
                Order Ahead
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
