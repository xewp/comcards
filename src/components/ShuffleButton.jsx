import { motion } from 'framer-motion';

/**
 * ShuffleButton
 * Animated shuffle/reshuffle button that spins its icon on click.
 */
export default function ShuffleButton({ onShuffle, darkMode, isShuffle }) {
  return (
    <motion.button
      onClick={onShuffle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        font-medium text-sm border transition-colors duration-200
        ${darkMode
          ? 'bg-warm-800/60 border-warm-600/50 text-beige-200 hover:bg-warm-700/60'
          : 'bg-beige-100/80 border-beige-300/60 text-warm-600 hover:bg-beige-200'}
        backdrop-blur-sm
      `}
      aria-label="Shuffle deck"
    >
      {/* Spinning icon on shuffle */}
      <motion.span
        key={isShuffle ? 'shuffling' : 'idle'}
        animate={isShuffle ? { rotate: 720 } : { rotate: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="text-base select-none"
      >
        🔀
      </motion.span>
      <span className="hidden sm:inline">Shuffle Deck</span>
    </motion.button>
  );
}
