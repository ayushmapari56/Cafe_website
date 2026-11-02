import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export const ParallaxElements: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Smooth springs for gentle mouse tilt
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mousePos.x, springConfig);

  // Parallax offsets down the scroll
  const ySpoon = useTransform(scrollY, [0, 2000], [0, -320]);
  const rotateSpoon = useTransform(scrollY, [0, 2000], [-15, -35]);

  const yStarAnise = useTransform(scrollY, [0, 2500], [0, -280]);
  const rotateStarAnise = useTransform(scrollY, [0, 2500], [20, 80]);

  const yCinnamon = useTransform(scrollY, [0, 3000], [40, -500]);
  const rotateCinnamon = useTransform(scrollY, [0, 3000], [35, 10]);

  const yMint = useTransform(scrollY, [0, 3000], [100, -420]);
  const rotateMint = useTransform(scrollY, [0, 3000], [-10, 25]);

  const yBeans = useTransform(scrollY, [0, 3500], [180, -600]);
  const rotateBeans = useTransform(scrollY, [0, 3500], [0, 120]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden hidden md:block" aria-hidden="true">
      {/* 1. Top-Left: Wooden Spoon with Spices */}
      <motion.div
        style={{
          y: ySpoon,
          rotate: rotateSpoon,
          x: useTransform(smoothMouseX, (val) => val * -15),
        }}
        className="absolute top-16 left-4 w-36 h-36 lg:w-44 lg:h-44"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_15px_22px_rgba(0,0,0,0.85)]">
            <defs>
              <linearGradient id="woodDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#734226" />
                <stop offset="50%" stopColor="#552c16" />
                <stop offset="100%" stopColor="#35190a" />
              </linearGradient>
            </defs>
            <path
              d="M-20,-10 C20,30 50,70 90,110 C96,116 102,118 110,114 C116,111 114,103 108,98 C70,60 30,20 -10,-20 Z"
              fill="url(#woodDark)"
            />
            <ellipse cx="125" cy="125" rx="34" ry="24" transform="rotate(-40 125 125)" fill="url(#woodDark)" />
            <ellipse cx="125" cy="124" rx="26" ry="16" transform="rotate(-40 125 125)" fill="#3a1c0d" />
            <circle cx="120" cy="122" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="128" cy="125" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="132" cy="120" r="1.5" fill="#c98f7e" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 2. Top-Right: Star Anise & Peppercorn */}
      <motion.div
        style={{
          y: yStarAnise,
          rotate: rotateStarAnise,
          x: useTransform(smoothMouseX, (val) => val * 20),
        }}
        className="absolute top-28 right-8 lg:right-16 w-28 h-28 lg:w-32 lg:h-32"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]">
            <g transform="translate(60,60)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle})`}>
                  <path d="M-6,0 C-8,-22 0,-34 0,-36 C0,-34 8,-22 6,0 Z" fill="#4d240e" />
                  <ellipse cx="0" cy="-20" rx="3" ry="4.5" fill="#a86230" />
                </g>
              ))}
              <circle cx="0" cy="0" r="7" fill="#331707" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* 3. Mid-Left: Ceylon Cinnamon Quills */}
      <motion.div
        style={{
          y: yCinnamon,
          rotate: rotateCinnamon,
          x: useTransform(smoothMouseX, (val) => val * -12),
        }}
        className="absolute top-[52vh] left-4 lg:left-8 w-28 h-28 lg:w-36 lg:h-36"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 140 140" className="w-full h-full filter drop-shadow-[0_16px_22px_rgba(0,0,0,0.85)]">
            <g transform="rotate(-35 70 70)">
              <rect x="25" y="58" width="90" height="18" rx="5" fill="#693315" />
              <ellipse cx="28" cy="67" rx="4.5" ry="7" fill="#3b1706" />
              <line x1="38" y1="62" x2="105" y2="62" stroke="#8c4720" strokeWidth="1.2" opacity="0.6" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* 4. Mid-Right: Fresh Rosemary & Mint Leaves */}
      <motion.div
        style={{
          y: yMint,
          rotate: rotateMint,
          x: useTransform(smoothMouseX, (val) => val * 16),
        }}
        className="absolute top-[64vh] right-6 lg:right-12 w-24 h-24 lg:w-30 lg:h-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_14px_18px_rgba(0,0,0,0.8)]">
            <path d="M30,70 C15,45 25,20 55,20 C55,45 45,70 30,70 Z" fill="#3e6b41" />
            <path d="M38,65 C60,65 80,45 75,25 C55,30 40,50 38,65 Z" fill="#4d7c4b" opacity="0.9" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 5. Lower-Left: Coffee Bean Cluster */}
      <motion.div
        style={{
          y: yBeans,
          rotate: rotateBeans,
        }}
        className="absolute top-[85vh] left-10 lg:left-24 w-24 h-24"
      >
        <svg viewBox="0 0 90 90" className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.85)]">
          <g transform="translate(30, 32) rotate(28)">
            <ellipse cx="0" cy="0" rx="14" ry="9" fill="#29140a" />
            <path d="M-11,0 C-4,-2 4,2 11,0" stroke="#4a2715" strokeWidth="2" fill="none" />
          </g>
          <g transform="translate(56, 52) rotate(-38)">
            <ellipse cx="0" cy="0" rx="12" ry="8" fill="#1e0c05" />
          </g>
          <g transform="translate(58, 20) rotate(15)">
            <ellipse cx="0" cy="0" rx="7" ry="4" fill="#788f5c" />
          </g>
        </svg>
      </motion.div>

      {/* 6. Subtle Steam & Salt Aura */}
      <div className="absolute top-[40vh] left-1/3 w-80 h-80 rounded-full bg-radial from-white/[0.025] to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};
