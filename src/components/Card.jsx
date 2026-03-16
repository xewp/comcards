import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import confetti from 'canvas-confetti';

/**
 * Card
 * The main conversation card with:
 *  - 3D flip animation (Framer Motion rotateY)
 *  - Floating idle animation
 *  - Swipe left/right to navigate cards
 *  - Favorite button with confetti burst
 *  - Tagalog / English / Both language modes
 */
export default function Card({ card, language, isFavorite, onFavorite, onSwipeLeft, onSwipeRight, darkMode }) {
  const [flipped, setFlipped]     = useState(false);
  const [direction, setDirection] = useState(0);   // -1 left, 1 right
  const heartRef                  = useRef(null);

  /* Reset flip when card changes */
  const [prevId, setPrevId] = useState(card?.id);
  if (card?.id !== prevId) {
    setFlipped(false);
    setPrevId(card?.id);
  }

  /* Swipe handlers */
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setDirection(-1);
      onSwipeLeft?.();
    },
    onSwipedRight: () => {
      setDirection(1);
      onSwipeRight?.();
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    delta: 60,
  });

  /* Confetti burst from the heart button */
  const fireConfetti = useCallback(() => {
    if (!heartRef.current) return;
    const rect = heartRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 28,
      origin: { x, y },
      colors: ['#F2A7B0', '#F5C96B', '#DFC9AC', '#C9A87C', '#FDDEE2'],
      shapes: ['circle', 'square'],
      scalar: 0.9,
      gravity: 0.85,
    });
  }, []);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isFavorite) fireConfetti();
    onFavorite?.(card);
  };

  if (!card) return null;

  /* Text content based on language setting */
  const questionText = language === 'tagalog'
    ? card.question_tagalog
    : language === 'english'
      ? card.question_english
      : null; // 'both' handled below

  const quoteText = language === 'tagalog'
    ? card.quote_tagalog
    : language === 'english'
      ? card.quote_english
      : null;

  return (
    <div className="relative flex items-center justify-center w-full" {...handlers}>
      {/* 3D flip wrapper */}
      <motion.div
        className="relative w-full max-w-sm cursor-pointer select-none"
        style={{ perspective: '1000px' }}
        animate={{ y: flipped ? 0 : [0, -8, 0] }}
        transition={flipped ? {} : {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setFlipped(f => !f)}
      >
        {/* Card inner */}
        <motion.div
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {/* ---- FRONT ---- */}
          <div
            className={`
              w-full rounded-3xl p-8 min-h-[420px] sm:min-h-[460px]
              flex flex-col justify-between
              border relative overflow-hidden
              ${darkMode
                ? 'bg-gradient-to-br from-warm-800 to-warm-900 border-warm-600/40 text-cream-100'
                : 'bg-gradient-to-br from-cream-50 to-beige-100 border-beige-200/70 text-warm-800'
              }
            `}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {/* Decorative circles */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20
              ${darkMode ? 'bg-warm-600' : 'bg-cream-400'}`} />
            <div className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-15
              ${darkMode ? 'bg-warm-700' : 'bg-beige-300'}`} />

            {/* Card number */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className={`text-xs font-semibold tracking-widest uppercase
                ${darkMode ? 'text-beige-400' : 'text-warm-400'}`}>
                Card #{card.id}
              </span>
              <span className="text-lg">💕</span>
            </div>

            {/* Question */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              {language === 'both' ? (
                <div className="space-y-4 text-center">
                  <p className={`font-serif italic text-base leading-relaxed
                    ${darkMode ? 'text-cream-200' : 'text-warm-700'}`}>
                    {card.question_tagalog}
                  </p>
                  <div className={`h-px w-16 mx-auto ${darkMode ? 'bg-warm-600' : 'bg-beige-300'}`} />
                  <p className={`font-sans text-sm leading-relaxed
                    ${darkMode ? 'text-beige-300' : 'text-warm-500'}`}>
                    {card.question_english}
                  </p>
                </div>
              ) : (
                <p className={`font-serif italic text-lg sm:text-xl leading-relaxed text-center
                  ${darkMode ? 'text-cream-100' : 'text-warm-800'}`}>
                  {questionText}
                </p>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-4 relative z-10">
              <p className={`text-xs ${darkMode ? 'text-beige-500' : 'text-warm-400'}`}>
                Tap to reveal quote ✨
              </p>
              {/* Favorite button */}
              <motion.button
                ref={heartRef}
                onClick={handleFavorite}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.8 }}
                className="text-2xl focus:outline-none"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <motion.span
                  animate={isFavorite ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* ---- BACK (Quote) ---- */}
          <div
            className={`
              absolute inset-0 w-full rounded-3xl p-8 min-h-[420px] sm:min-h-[460px]
              flex flex-col justify-between
              border overflow-hidden
              ${darkMode
                ? 'bg-gradient-to-br from-warm-700 to-warm-900 border-warm-500/40 text-cream-100'
                : 'bg-gradient-to-br from-beige-200 to-cream-200 border-beige-300/70 text-warm-800'
              }
            `}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Decorative dots */}
            <div className={`absolute top-4 left-4 w-28 h-28 rounded-full opacity-15
              ${darkMode ? 'bg-cream-300' : 'bg-warm-300'}`} />
            <div className={`absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-10
              ${darkMode ? 'bg-cream-200' : 'bg-warm-400'}`} />

            {/* Quote label */}
            <div className="relative z-10 text-center">
              <span className={`text-xs font-semibold tracking-widest uppercase
                ${darkMode ? 'text-beige-400' : 'text-warm-400'}`}>
                ✨ Quote of the Heart
              </span>
            </div>

            {/* Quote body */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-2">
              {language === 'both' ? (
                <div className="space-y-4 text-center">
                  <p className={`font-serif italic text-base leading-relaxed
                    ${darkMode ? 'text-cream-200' : 'text-warm-700'}`}>
                    {card.quote_tagalog}
                  </p>
                  <div className={`h-px w-16 mx-auto ${darkMode ? 'bg-warm-500' : 'bg-beige-400'}`} />
                  <p className={`font-sans text-sm leading-relaxed
                    ${darkMode ? 'text-beige-300' : 'text-warm-500'}`}>
                    {card.quote_english}
                  </p>
                </div>
              ) : (
                <p className={`font-serif italic text-lg sm:text-xl leading-relaxed text-center
                  ${darkMode ? 'text-cream-100' : 'text-warm-800'}`}>
                  {quoteText}
                </p>
              )}
            </div>

            {/* Back footer */}
            <div className="flex items-center justify-between mt-4 relative z-10">
              <p className={`text-xs ${darkMode ? 'text-beige-500' : 'text-warm-400'}`}>
                Tap to see question 💬
              </p>
              <motion.button
                ref={heartRef}
                onClick={handleFavorite}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.8 }}
                className="text-2xl focus:outline-none"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <motion.span
                  animate={isFavorite ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Swipe hints (mobile) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <span className={`text-xl ${darkMode ? 'text-beige-400' : 'text-warm-400'}`}>‹</span>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <span className={`text-xl ${darkMode ? 'text-beige-400' : 'text-warm-400'}`}>›</span>
      </div>
    </div>
  );
}
