import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'comfortCards_favorites';

/**
 * useFavorites
 * Manages a LocalStorage-backed list of favorite cards.
 *
 * Returns:
 *  - favorites         : array of favorited card objects
 *  - toggleFavorite(card) : add or remove a card from favorites
 *  - isFavorite(id)    : returns true if card is favorited
 *  - clearFavorites()  : wipe all favorites
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to LocalStorage whenever favorites changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Silently fail (private browsing, storage full, etc.)
    }
  }, [favorites]);

  const toggleFavorite = useCallback((card) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === card.id);
      return exists ? prev.filter(f => f.id !== card.id) : [...prev, card];
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some(f => f.id === id),
    [favorites]
  );

  const clearFavorites = useCallback(() => setFavorites([]), []);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}
