import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const subtotal = items.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const tax = subtotal * 0.08875;
  const tipAmount = (subtotal * tipPercent) / 100;
  const total = subtotal + tax + tipAmount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const generatedOrder = `VS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrder);
    setIsOrderPlaced(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c98f7e', '#ffffff', '#242424'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleFinish = () => {
    setIsOrderPlaced(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <motion.div
          data-lenis-prevent
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-screen max-w-md bg-[#ffffff] text-[#181818] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#e5e0d8] flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c98f7e]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#181818]">
                Your Order Bag
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736f68] hover:text-[#181818] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {isOrderPlaced ? (
              <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f4ece9] text-[#c98f7e] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <div className="space-y-1">
                  <div className="script-kicker !text-[#c98f7e] !text-2xl">Thank You</div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#181818]">
                    Order #{orderNumber} Received
                  </h4>
                  <p className="text-xs text-[#736f68]">
                    Estimated pickup in <strong>12–15 minutes</strong> at the counter.
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-3.5 sm:p-4 text-xs text-left border border-[#e5e0d8] space-y-1">
                  <div className="font-semibold text-[#181818]">Pickup Location:</div>
                  <div className="flex items-center gap-1.5 text-[#736f68]">
                    <MapPin className="w-3.5 h-3.5 text-[#c98f7e] shrink-0" />
                    <span>142 Mercer St, Soho, NYC</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 bg-[#181818] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-[#c98f7e]/40 mx-auto" />
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#181818]">Your bag is empty</h4>
                <p className="text-xs text-[#736f68]">
                  Explore our counter menu to add single-origin roasts and morning bakes.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="flex gap-3 sm:gap-4 p-3 bg-[#faf8f5] border border-[#e5e0d8] relative"
                  >
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full p-0.5 border border-[#dfd9ce]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h5 className="font-serif font-bold text-xs sm:text-sm text-[#181818]">
                          {cartItem.menuItem.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-[#999] hover:text-[#c98f7e] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-serif text-[#c98f7e] font-semibold">
                        ${(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, -1)}
                          className="w-6 h-6 border border-[#dfd9ce] flex items-center justify-center text-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1">{cartItem.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, 1)}
                          className="w-6 h-6 border border-[#dfd9ce] flex items-center justify-center text-xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subtotal & Tip */}
                <div className="pt-3 border-t border-[#e5e0d8] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#736f68]">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#181818]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#736f68]">
                    <span>Estimated Tax (NYC)</span>
                    <span className="font-mono text-[#181818]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#736f68]">
                    <span>Barista Tip ({tipPercent}%)</span>
                    <span className="font-mono text-[#181818]">${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-[#181818] pt-2 border-t border-[#e5e0d8]">
                    <span>Total</span>
                    <span className="text-[#c98f7e]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout form */}
                <form onSubmit={handleCheckout} className="pt-2 space-y-2.5">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Pickup Name *"
                    className="w-full px-3 py-2 text-sm border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Mobile for SMS Alert *"
                    className="w-full px-3 py-2 text-sm border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#181818] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Place Pickup Order · ${total.toFixed(2)}
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
