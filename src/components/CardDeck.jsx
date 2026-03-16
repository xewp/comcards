import { motion, AnimatePresence } from 'framer-motion';

/**
 * CardDeck
 * Visual stacked deck with counter and the "Draw Card" button.
 * Shows ghost cards layered behind to simulate a deck.
 */
export default function CardDeck({ remaining, totalCards, onDraw, darkMode, hasCard }) {
  const isEmpty = remaining === 0;
  const pct     = Math.round(((totalCards - remaining) / totalCards) * 100);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Deck stack visual */}
      <div className="relative w-[200px] h-[130px] flex items-center justify-center cursor-pointer group"
           onClick={!isEmpty ? onDraw : undefined}>

        {/* Ghost layers */}
        {[2, 1].map(i => (
          <motion.div
            key={i}
            className={`
              absolute w-[170px] h-[110px] rounded-2xl border
              ${darkMode
                ? 'bg-warm-800 border-warm-600/40'
                : 'bg-beige-100 border-beige-200/80'}
            `}
            style={{
              transform: `rotate(${i === 2 ? -6 : -3}deg) translateY(${i === 2 ? -8 : -4}px)`,
              zIndex: i,
            }}
            animate={{ rotate: i === 2 ? -6 : -3 }}
          />
        ))}

        {/* Top card */}
        <motion.div
          className={`
            absolute z-10 w-[170px] h-[110px] rounded-2xl border
            flex flex-col items-center justify-center gap-2
            transition-shadow duration-300
            ${isEmpty
              ? (darkMode ? 'bg-warm-900/60 border-warm-700/30' : 'bg-beige-50 border-beige-200/50')
              : (darkMode ? 'bg-warm-700 border-warm-500/50 shadow-dark-card group-hover:shadow-glow' : 'bg-gradient-to-br from-cream-100 to-beige-200 border-beige-300 shadow-card group-hover:shadow-card-hover')
            }
          `}
          whileHover={!isEmpty ? { y: -4 } : {}}
          whileTap={!isEmpty ? { scale: 0.97 } : {}}
        >
          {isEmpty ? (
            <span className={`text-sm font-medium ${darkMode ? 'text-beige-500' : 'text-warm-400'}`}>
              🔄 Deck empty
            </span>
          ) : (
            <>
              <span className="text-2xl">🃏</span>
              <span className={`text-xs font-semibold tracking-wide ${darkMode ? 'text-beige-300' : 'text-warm-500'}`}>
                {remaining} left
              </span>
            </>
          )}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="w-48">
        <div className="flex justify-between text-xs mb-1 font-medium"
          style={{ color: darkMode ? '#c9a87c' : '#a87d50' }}>
          <span>Drawn</span>
          <span>{pct}%</span>
        </div>
        <div className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? 'bg-warm-700' : 'bg-beige-200'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-warm-400 to-cream-500"
            style={{ width: `${pct}%` }}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>
        <p className={`text-center text-[10px] mt-1 ${darkMode ? 'text-beige-500' : 'text-warm-400'}`}>
          {totalCards - remaining} / {totalCards} cards drawn
        </p>
      </div>

      {/* Draw button */}
      <motion.button
        onClick={onDraw}
        disabled={false}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.93 }}
        className={`
          px-8 py-3.5 rounded-full font-bold text-base
          transition-all duration-200 shadow-lg
          ${darkMode
            ? 'bg-gradient-to-r from-warm-500 to-warm-400 text-warm-900 hover:from-warm-400 hover:to-cream-500 shadow-warm-800'
            : 'bg-gradient-to-r from-warm-500 to-warm-400 text-white hover:from-warm-600 hover:to-warm-500'
          }
          active:shadow-none
        `}
        aria-label="Draw a new card"
      >
        {hasCard ? '✨ Draw Another' : '🎴 Draw a Card'}
      </motion.button>
    </div>
  );
}
