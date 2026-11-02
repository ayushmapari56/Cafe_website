import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    milk?: string,
    temp?: 'Hot' | 'Iced',
    sweetness?: string,
    notes?: string
  ) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedMilk, setSelectedMilk] = useState<string>(
    item.options?.milk ? item.options.milk[0] : ''
  );
  const [selectedTemp, setSelectedTemp] = useState<'Hot' | 'Iced'>(
    item.options?.temperature ? item.options.temperature[0] : 'Hot'
  );
  const [selectedSweetness, setSelectedSweetness] = useState<string>(
    item.options?.sweetness ? item.options.sweetness[0] : ''
  );
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const totalPrice = item.price * quantity;

  const handleAdd = () => {
    onAddToCart(
      item,
      quantity,
      selectedMilk || undefined,
      item.options?.temperature ? selectedTemp : undefined,
      selectedSweetness || undefined,
      specialNotes || undefined
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window: Pure White Floating Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#ffffff] text-[#181818] shadow-[0_30px_90px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] flex flex-col my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#736f68] hover:text-[#181818] transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Circular Plate Presentation */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-[#ece9e2] to-[#ffffff] shadow-xl shrink-0 ring-1 ring-black/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <div className="script-kicker !text-[#c98f7e] !text-2xl">
                  {item.subtitle}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#181818]">
                  {item.name}
                </h3>
                <div className="text-lg font-serif font-bold text-[#c98f7e] tabular-nums">
                  ${item.price.toFixed(2)}
                </div>
                {item.origin && (
                  <p className="text-xs text-[#736f68]">
                    <strong>Origin:</strong> {item.origin}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#54504a] leading-relaxed font-sans font-light">
              {item.description}
            </p>

            {/* Tasting Notes */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                Flavor Notes
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {item.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-[#faf8f5] text-[#181818] border border-[#e5e0d8] font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Temperature Option */}
            {item.options?.temperature && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                  Serving Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {item.options.temperature.map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setSelectedTemp(temp)}
                      className={`py-2 px-3 text-xs font-semibold border transition-colors cursor-pointer ${
                        selectedTemp === temp
                          ? 'border-[#181818] bg-[#181818] text-white'
                          : 'border-[#dfd9ce] bg-[#faf8f5] text-[#555] hover:bg-white'
                      }`}
                    >
                      {temp === 'Hot' ? 'Hot (65°C Microfoam)' : 'Iced (Mountain Chill)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Milk Option */}
            {item.options?.milk && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                  Milk Choice
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {item.options.milk.map((milk) => (
                    <button
                      key={milk}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`py-2 px-2 text-xs font-medium border text-center transition-colors cursor-pointer ${
                        selectedMilk === milk
                          ? 'border-[#181818] bg-[#181818] text-white font-semibold'
                          : 'border-[#dfd9ce] bg-[#faf8f5] text-[#555] hover:bg-white'
                      }`}
                    >
                      {milk}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sweetness Option */}
            {item.options?.sweetness && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                  Sweetness Profile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {item.options.sweetness.map((sweet) => (
                    <button
                      key={sweet}
                      type="button"
                      onClick={() => setSelectedSweetness(sweet)}
                      className={`py-2 px-2 text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                        selectedSweetness === sweet
                          ? 'border-[#181818] bg-[#181818] text-white font-semibold'
                          : 'border-[#dfd9ce] bg-[#faf8f5] text-[#555] hover:bg-white'
                      }`}
                    >
                      {sweet}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens warning if any */}
            {item.allergens && (
              <div className="flex items-center gap-2 text-xs text-[#736f68] bg-[#faf8f5] p-3 border border-[#e5e0d8]">
                <AlertCircle className="w-4 h-4 text-[#c98f7e] shrink-0" />
                <span>Contains: {item.allergens.join(', ')}</span>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                Special Requests for Barista
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Extra hot, light ice, decaf..."
                className="w-full px-3 py-2 text-xs border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
              />
            </div>

          </div>

          {/* Modal Footer / Add to Order Button */}
          <div className="p-4 sm:p-6 bg-[#faf8f5] border-t border-[#e5e0d8] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#dfd9ce] bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#181818] hover:bg-[#faf8f5] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold font-mono tabular-nums text-[#181818]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-[#181818] hover:bg-[#faf8f5] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-6 bg-[#181818] hover:bg-[#333333] text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Add To Order</span>
              <span className="font-mono tabular-nums text-[#c98f7e]">${totalPrice.toFixed(2)}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
