import { motion, AnimatePresence } from 'framer-motion';
import { editions } from '../data/editions';
import { useState, useRef, useEffect } from 'react';

export default function EditionSelector({ selectedEdition, onSelectEdition, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeEdition = editions[selectedEdition] || editions['classic'];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all
          ${darkMode 
            ? 'bg-warm-800/80 text-cream-100 hover:bg-warm-700/80 border border-warm-700/50' 
            : 'bg-white/80 text-warm-800 hover:bg-beige-50 border border-beige-200'}
        `}
      >
        <span className="truncate max-w-[100px] sm:max-w-[150px]">{activeEdition.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px]"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-48 rounded-2xl shadow-xl overflow-hidden z-50
              ${darkMode ? 'bg-warm-900 border border-warm-700' : 'bg-white border border-beige-200'}
            `}
          >
            <div className="flex flex-col py-2">
              {Object.values(editions).map((edition) => {
                const isSelected = selectedEdition === edition.id;
                return (
                  <button
                    key={edition.id}
                    onClick={() => {
                      onSelectEdition(edition.id);
                      setIsOpen(false);
                    }}
                    className={`
                      text-left px-4 py-2 text-sm font-medium transition-colors
                      ${isSelected 
                        ? (darkMode ? 'bg-warm-800 text-cream-100' : 'bg-beige-100/50 text-warm-800') 
                        : (darkMode ? 'text-beige-400 hover:bg-warm-800/50 hover:text-cream-100' : 'text-warm-600 hover:bg-beige-50')}
                    `}
                  >
                    {edition.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
