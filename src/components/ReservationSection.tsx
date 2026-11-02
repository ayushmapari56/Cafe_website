import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReservationData } from '../types';
import { CAFE_IMAGES } from '../data/cafeData';

gsap.registerPlugin(ScrollTrigger);

interface ReservationSectionProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  isOpenModal,
  onCloseModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<string>('2026-11-02');
  const [timeSlot, setTimeSlot] = useState<string>('09:30 AM');
  const [partySize, setPartySize] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<ReservationData['seatingArea']>('Sunlit Solarium');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<{
    code: string;
    details: ReservationData;
  } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const activeModal = isOpenModal !== undefined ? isOpenModal : isModalOpen;
  const handleClose = onCloseModal || (() => setIsModalOpen(false));

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isOpenModal) return;

    const ctx = gsap.context(() => {
      // Inner parallax: background image drifts at 0.3-0.5x page speed
      if (bgImageRef.current && sectionRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -18, scale: 1.15 },
          {
            yPercent: 18,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      // Content gently settles into place
      if (contentRef.current && sectionRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0.4, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 45%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isOpenModal]);

  const timeSlots = [
    { time: '07:30 AM', label: 'First Light & Brews' },
    { time: '09:30 AM', label: 'Morning Pour-Over & Bun' },
    { time: '12:00 PM', label: 'Midday Tartine Lunch' },
    { time: '03:00 PM', label: 'Afternoon Matcha & Pastry' },
    { time: '05:30 PM', label: 'Sunset Slow Drip' },
  ];

  const seatingOptions: { name: ReservationData['seatingArea']; desc: string }[] = [
    { name: 'Sunlit Solarium', desc: 'Airy greenhouse seating with natural morning light' },
    { name: 'Espresso Bar', desc: 'Front-row wooden stools facing manual levers' },
    { name: 'Quiet Study Nook', desc: 'Low-noise oak desks with soft library lamps' },
    { name: 'Main Hall', desc: 'Spacious communal tables for friends & team gatherings' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resData: ReservationData = {
      date,
      timeSlot,
      partySize,
      seatingArea,
      name,
      email,
      phone,
      notes,
    };
    const code = `NOOK-${Math.floor(100 + Math.random() * 900)}`;
    setConfirmedReservation({ code, details: resData });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c98f7e', '#ffffff', '#242424'],
      });
    } catch {}
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    handleClose();
  };

  return (
    <>
      {/* 4.6 Reservation Horizontal Band CTA Banner */}
      {!isOpenModal && (
        <section
          ref={sectionRef}
          id="reservation"
          className="relative py-24 sm:py-36 lg:py-44 flex items-center justify-center overflow-hidden bg-[#181818] z-20"
        >
          {/* Parallax inner image window */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              ref={bgImageRef}
              src={CAFE_IMAGES.geishaPourOver}
              alt="Velvet & Stone Roastery Interior"
              className="w-full h-[135%] -top-[17%] absolute inset-x-0 object-cover filter brightness-[0.28] contrast-125 will-change-transform"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#181818] via-transparent to-[#181818]" />
            <div className="absolute inset-0 bg-[#181818]/40" />
          </div>

          {/* Centered Content moving at natural speed */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6 will-change-transform will-change-opacity"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="script-kicker !text-[#c98f7e] !text-3xl sm:!text-5xl">
                Reservation
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
                Book Your Table
              </h2>

              <p className="text-xs sm:text-base text-[#d1cec7] font-sans font-light max-w-lg mx-auto leading-relaxed">
                Whether joining us for an unhurried morning pour-over, afternoon pastry, or reserved study nook.
              </p>

              <div className="pt-2 sm:pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-outline-editorial py-3 sm:py-3.5 px-7 sm:px-8 text-xs tracking-widest uppercase cursor-pointer"
                >
                  Online Booking
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Reservation Modal Window */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog with data-lenis-prevent */}
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#ffffff] text-[#181818] p-5 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] z-10 my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-[#736f68] hover:text-[#181818] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {confirmedReservation ? (
                /* Confirmation Voucher */
                <div className="text-center py-4 sm:py-6 space-y-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f4ece9] text-[#c98f7e] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>

                  <div className="space-y-1">
                    <div className="script-kicker !text-[#c98f7e] !text-2xl sm:!text-3xl">Reserved</div>
                    <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#181818]">
                      Your Table is Held, {confirmedReservation.details.name}!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#635f58]">
                      Reservation confirmation dispatch logged: <strong>#{confirmedReservation.code}</strong>.
                    </p>
                  </div>

                  {/* Voucher Ticket */}
                  <div className="max-w-md mx-auto bg-[#faf8f5] p-4 sm:p-6 border border-[#e5e0d8] text-left space-y-3 font-sans">
                    <div className="flex justify-between items-center border-b border-[#dfd9ce] pb-3">
                      <div>
                        <div className="text-[10px] text-[#7d7973] uppercase font-bold tracking-wider">Atmosphere Nook</div>
                        <div className="font-serif font-bold text-sm sm:text-base text-[#181818]">{confirmedReservation.details.seatingArea}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#7d7973] uppercase font-bold tracking-wider">Party</div>
                        <div className="font-mono font-bold text-sm sm:text-base text-[#c98f7e]">{confirmedReservation.details.partySize} Guests</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#7d7973]">Date: </span>
                        <span className="font-semibold text-[#181818]">{confirmedReservation.details.date}</span>
                      </div>
                      <div>
                        <span className="text-[#7d7973]">Time: </span>
                        <span className="font-semibold text-[#181818]">{confirmedReservation.details.timeSlot}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#7d7973] pt-2 border-t border-[#dfd9ce] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c98f7e] shrink-0" />
                      <span>Velvet & Stone Roastery · 142 Mercer St, Soho, NYC</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-8 py-3 bg-[#181818] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Reservation Form */
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="text-center space-y-1">
                    <div className="script-kicker !text-[#c98f7e] !text-2xl sm:!text-3xl">Discover</div>
                    <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#181818] tracking-tight">
                      Table & Study Nook Booking
                    </h3>
                    <p className="text-xs text-[#736f68]">
                      Select preferred time slot and atmosphere.
                    </p>
                  </div>

                  {/* Time slots */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#181818] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c98f7e]" />
                      <span>Select Time Slot</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setTimeSlot(slot.time)}
                          className={`p-2 border text-center transition-all cursor-pointer ${
                            timeSlot === slot.time
                              ? 'border-[#181818] bg-[#181818] text-white'
                              : 'border-[#dfd9ce] bg-[#faf8f5] text-[#555] hover:bg-white'
                          }`}
                        >
                          <div className="font-mono text-xs font-bold">{slot.time}</div>
                          <div className="text-[9px] opacity-80 truncate">{slot.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Party Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#181818] flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#c98f7e]" />
                        <span>Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#181818] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#c98f7e]" />
                        <span>Guests</span>
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[1, 2, 4, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setPartySize(num)}
                            className={`py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                              partySize === num
                                ? 'border-[#181818] bg-[#181818] text-white'
                                : 'border-[#dfd9ce] bg-[#faf8f5] text-[#555] hover:bg-white'
                            }`}
                          >
                            {num === 6 ? '6+' : num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Seating Nook */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Seating Area Atmosphere
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {seatingOptions.map((opt) => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => setSeatingArea(opt.name)}
                          className={`p-2.5 sm:p-3 border text-left transition-all cursor-pointer ${
                            seatingArea === opt.name
                              ? 'border-[#c98f7e] bg-[#faf8f5] ring-1 ring-[#c98f7e]'
                              : 'border-[#dfd9ce] bg-white hover:bg-[#faf8f5]'
                          }`}
                        >
                          <div className="font-serif font-bold text-xs text-[#181818]">{opt.name}</div>
                          <div className="text-[10px] text-[#736f68] mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name *"
                      className="px-3 py-2 text-sm border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="px-3 py-2 text-sm border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile Phone *"
                      className="px-3 py-2 text-sm border border-[#dfd9ce] bg-[#faf8f5] focus:bg-white focus:outline-none focus:border-[#c98f7e]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#181818] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
