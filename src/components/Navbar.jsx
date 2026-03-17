import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditionSelector from './EditionSelector';

/**
 * Navbar
 * Displays the app brand, dark mode toggle, and favorites count badge.
 */
export default function Navbar({ darkMode, setDarkMode, favoritesCount, onFavClick, selectedEdition, onSelectEdition }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-5 py-4
        backdrop-blur-md border-b
        ${darkMode
          ? 'bg-warm-900/80 border-warm-700/40 text-cream-100'
          : 'bg-beige-50/80 border-beige-200/60 text-warm-700'
        }
      `}
    >
      {/* Brand & Edition Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💕</span>
          <h1 className="font-serif font-bold text-base sm:text-lg leading-tight">
            Comfort Cards
          </h1>
        </div>
        
        {/* Edition Selector inside Navbar */}
        {selectedEdition && (
          <div className="pl-7 sm:pl-0">
             <EditionSelector 
                selectedEdition={selectedEdition} 
                onSelectEdition={onSelectEdition} 
                darkMode={darkMode} 
             />
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Favorites button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onFavClick}
          className={`
            relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-colors duration-200
            ${darkMode
              ? 'bg-warm-700/60 hover:bg-warm-600/60 text-cream-200'
              : 'bg-beige-100 hover:bg-beige-200 text-warm-600'
            }
          `}
          aria-label="View favorites"
        >
          <span>♥</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={favoritesCount}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="tabular-nums"
            >
              {favoritesCount}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Dark mode toggle */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => setDarkMode(d => !d)}
          className={`
            w-9 h-9 rounded-full flex items-center justify-center text-lg
            transition-colors duration-200
            ${darkMode
              ? 'bg-warm-700/60 hover:bg-warm-600/60'
              : 'bg-beige-100 hover:bg-beige-200'
            }
          `}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </motion.button>
      </div>
    </motion.nav>
  );
}
