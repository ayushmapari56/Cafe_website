/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { EventsSection } from './components/EventsSection';
import { IngredientsSection } from './components/IngredientsSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CartItem, MenuItem } from './types';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Lenis Inertia Smooth Scroll & bind to GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.09, // smooth inertia feel (0.08 - 0.1 per spec)
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafTicker);
      lenis.destroy();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    milk?: string,
    temp?: 'Hot' | 'Iced',
    sweetness?: string,
    notes?: string
  ) => {
    const cartItemId = `${item.id}-${milk || ''}-${temp || ''}-${sweetness || ''}-${notes || ''}`;
    
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity,
          selectedMilk: milk,
          selectedTemp: temp,
          selectedSweetness: sweetness,
          specialInstructions: notes,
        },
      ];
    });

    showToast(`Added ${quantity}x ${item.name} to order`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, 1);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#181818] text-[#e5e2dc] selection:bg-[#c98f7e]/30 selection:text-white overflow-x-hidden">
      
      {/* Fixed Transparent Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="relative z-20">
        {/* 4.1 Hero Section */}
        <HeroSection
          onExploreMenu={scrollToMenu}
          onOpenReservation={() => setIsReservationOpen(true)}
          onQuickAdd={handleQuickAdd}
        />

        {/* 4.2 Our Story Section (Horizontal Split Card with layered photo & pure white text panel) */}
        <StorySection />

        {/* 4.3 Our Menu Section (Zigzag Diagonal Round Plates) */}
        <MenuSection
          onSelectItem={(item) => setActiveItemModal(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* 4.4 Upcoming Events Section (Mirrored Split Card with right-aligned meta) */}
        <EventsSection />

        {/* 4.5 The Best Ingredients Section (Centered block + horizontal flat-lay row of cutouts) */}
        <IngredientsSection />

        {/* 4.6 Reservation Section (CTA banner with inner parallax image window) */}
        <ReservationSection />
      </main>

      {/* 4.7 Footer (4 columns on dark background) */}
      <Footer />

      {/* Item Customization Modal (Styled in floating pure white card) */}
      <ItemModal
        item={activeItemModal}
        onClose={() => setActiveItemModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Reservation Modal when triggered via Nav Button */}
      {isReservationOpen && (
        <ReservationSection
          isOpenModal={true}
          onCloseModal={() => setIsReservationOpen(false)}
        />
      )}

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#181818] text-white px-5 py-3 shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-5 h-5 rounded-full bg-[#c98f7e] flex items-center justify-center text-[#181818] shrink-0 font-bold">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-xs font-medium">{toastMessage}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-xs text-[#c98f7e] hover:underline font-semibold"
            >
              View
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
