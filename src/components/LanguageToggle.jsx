import { motion, AnimatePresence } from 'framer-motion';

/**
 * LanguageToggle
 * 3-segment pill selector: Tagalog | Both | English
 */
const OPTIONS = [
  { value: 'tagalog',  label: 'Tagalog', emoji: '🇵🇭' },
  { value: 'both',     label: 'Both',    emoji: '⇄'   },
  { value: 'english',  label: 'English', emoji: '🇺🇸' },
];

export default function LanguageToggle({ language, setLanguage, darkMode }) {
  return (
    <div
      className={`
        inline-flex rounded-full p-1 gap-1
        ${darkMode ? 'bg-warm-800/60' : 'bg-beige-100/80'}
        backdrop-blur-sm border
        ${darkMode ? 'border-warm-700/40' : 'border-beige-200/60'}
      `}
    >
      {OPTIONS.map(opt => {
        const active = language === opt.value;
        return (
          <motion.button
            key={opt.value}
            onClick={() => setLanguage(opt.value)}
            className={`
              relative px-3 py-1.5 rounded-full text-xs font-semibold
              flex items-center gap-1.5 transition-colors duration-200
              ${active
                ? (darkMode ? 'text-warm-900' : 'text-warm-800')
                : (darkMode ? 'text-beige-300 hover:text-cream-100' : 'text-warm-500 hover:text-warm-700')
              }
            `}
            whileTap={{ scale: 0.92 }}
          >
            {active && (
              <motion.div
                layoutId="langPill"
                className={`
                  absolute inset-0 rounded-full
                  ${darkMode ? 'bg-cream-300' : 'bg-white'}
                  shadow-sm
                `}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{opt.emoji}</span>
            <span className="relative z-10 hidden sm:inline">{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
