import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import CardDeck from '../components/CardDeck';
import ShuffleButton from '../components/ShuffleButton';
import LanguageToggle from '../components/LanguageToggle';
import { useDeckShuffle } from '../hooks/useDeckShuffle';
import { useFavorites } from '../hooks/useFavorites';
import { editions } from '../data/editions';

/* Warm gradient backgrounds that cycle on shuffle */
const BG_GRADIENTS = [
  'linear-gradient(135deg, #FAF7F2 0%, #FFF3D6 50%, #F9F0E8 100%)',
  'linear-gradient(145deg, #F9EFE8 0%, #FFF0E0 50%, #FAF4EC 100%)',
  'linear-gradient(125deg, #F5EFE6 0%, #FFF3E0 50%, #FAEEE2 100%)',
  'linear-gradient(155deg, #FBF6F0 0%, #FFE8D4 55%, #F9EDE5 100%)',
  'linear-gradient(115deg, #FAF8F3 0%, #FFEDD5 50%, #F5EAE2 100%)',
];
const DARK_BG_GRADIENTS = [
  'linear-gradient(135deg, #1c1410 0%, #2a1f14 50%, #1c1410 100%)',
  'linear-gradient(145deg, #171210 0%, #261a10 55%, #1a120d 100%)',
  'linear-gradient(125deg, #1e1610 0%, #2e2015 50%, #1c1410 100%)',
];

export default function Home({ darkMode, setDarkMode }) {
  const [selectedEdition, setSelectedEdition] = useState('classic');
  const { currentCard, remaining, totalCards, drawCard, shuffleDeck } = useDeckShuffle(selectedEdition);
  const { favorites, toggleFavorite, isFavorite, clearFavorites }     = useFavorites();

  const [language, setLanguage]         = useState('both');
  const [bgIndex, setBgIndex]           = useState(0);
  const [isShuffle, setIsShuffle]       = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const favSectionRef                   = useRef(null);

  /* Draw a new card and cycle background */
  const handleDraw = useCallback(() => {
    drawCard();
    setBgIndex(i => (i + 1) % BG_GRADIENTS.length);
  }, [drawCard]);

  /* Shuffle deck with visual animation trigger */
  const handleShuffle = useCallback(() => {
    shuffleDeck();
    setBgIndex(i => (i + 1) % DARK_BG_GRADIENTS.length);
    setIsShuffle(true);
    setTimeout(() => setIsShuffle(false), 700);
  }, [shuffleDeck]);

  /* Toggle favorites panel */
  const handleFavClick = () => {
    setShowFavorites(s => !s);
    setTimeout(() => favSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const bgStyle = {
    background: darkMode
      ? DARK_BG_GRADIENTS[bgIndex % DARK_BG_GRADIENTS.length]
      : BG_GRADIENTS[bgIndex],
    transition: 'background 1s ease',
  };

  return (
    <div className="min-h-screen w-full relative" style={bgStyle}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        onFavClick={handleFavClick}
        selectedEdition={selectedEdition}
        onSelectEdition={setSelectedEdition}
      />

      {/* Main content */}
      <main className="relative z-10 pt-24 pb-16 px-4 flex flex-col items-center gap-10 max-w-lg mx-auto">

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-center"
        >
          <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-1
            ${darkMode ? 'text-cream-100' : 'text-warm-800'}`}>
            Connect Deeper 💬
          </h2>
          <p className={`text-sm ${darkMode ? 'text-beige-400' : 'text-warm-500'}`}>
            Draw a card. Ask the question. Listen with your whole heart.
          </p>
        </motion.div>

        {/* Language toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <LanguageToggle language={language} setLanguage={setLanguage} darkMode={darkMode} />
        </motion.div>

        {/* Current card area */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {currentCard ? (
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, y: 36, scale: 0.94, rotateZ: -3 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateZ: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              >
                <Card
                  card={currentCard}
                  language={language}
                  isFavorite={isFavorite(currentCard.id)}
                  onFavorite={toggleFavorite}
                  onSwipeLeft={handleDraw}
                  onSwipeRight={handleDraw}
                  darkMode={darkMode}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <p className={`font-serif italic text-base ${darkMode ? 'text-beige-400' : 'text-warm-400'}`}>
                  Your card awaits... press Draw to begin ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Deck + controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <CardDeck
            remaining={remaining}
            totalCards={totalCards}
            onDraw={handleDraw}
            darkMode={darkMode}
            hasCard={!!currentCard}
          />
          <ShuffleButton onShuffle={handleShuffle} darkMode={darkMode} isShuffle={isShuffle} />
        </motion.div>

        {/* ---- Favorites Section ---- */}
        <div ref={favSectionRef} className="w-full">
          <AnimatePresence>
            {showFavorites && (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <div className={`rounded-3xl border p-5 ${darkMode ? 'bg-warm-900/60 border-warm-700/40' : 'bg-beige-50/80 border-beige-200/60'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-serif font-bold text-lg ${darkMode ? 'text-cream-100' : 'text-warm-800'}`}>
                        ❤️ Favorites ({favorites.length})
                      </h3>
                      {favorites.length > 0 && (
                        <button
                          onClick={clearFavorites}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors
                            ${darkMode
                              ? 'border-warm-600 text-beige-400 hover:bg-warm-700'
                              : 'border-beige-300 text-warm-400 hover:bg-beige-100'}`}
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {favorites.length === 0 ? (
                      <p className={`text-sm text-center py-6 font-serif italic
                        ${darkMode ? 'text-beige-500' : 'text-warm-400'}`}>
                        Tap 🤍 on any card to save it here
                      </p>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {favorites.map(fav => (
                          <motion.div
                            key={fav.id}
                            layout
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12 }}
                            className={`
                              p-4 rounded-2xl border relative
                              ${darkMode
                                ? 'bg-warm-800/60 border-warm-600/30'
                                : 'bg-white/70 border-beige-200/60'}
                            `}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold mb-1
                                  ${darkMode ? 'text-beige-500' : 'text-warm-400'}`}>
                                  #{fav.id} · Question
                                </p>
                                <p className={`text-sm font-serif italic leading-snug
                                  ${darkMode ? 'text-cream-200' : 'text-warm-700'}`}>
                                  {language === 'english'
                                    ? fav.question_english
                                    : fav.question_tagalog}
                                </p>
                              </div>
                              <button
                                onClick={() => toggleFavorite(fav)}
                                className="text-lg flex-shrink-0 hover:scale-125 transition-transform"
                              >
                                ❤️
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-center text-xs ${darkMode ? 'text-warm-600' : 'text-warm-300'}`}
        >
          Made with 💕 — Comfort Cards {editions[selectedEdition]?.name || 'Couples Edition'}
        </motion.p>
      </main>
    </div>
  );
}
