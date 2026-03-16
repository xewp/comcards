import { useState, useCallback } from 'react';
import cardsData from '../data/cards.json';

/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array without mutating the original.
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * useDeckShuffle
 * Manages a "no-duplicates until empty" card deck.
 *
 * Returns:
 *  - currentCard   : the currently displayed card (or null)
 *  - remaining     : number of cards left in deck
 *  - totalCards    : total number of cards
 *  - drawCard()    : draw the next card from the deck
 *  - shuffleDeck() : reshuffle and reset the deck
 *  - isLastCard    : true when only 1 card remains
 */
export function useDeckShuffle() {
  const [deck, setDeck]             = useState(() => shuffle(cardsData));
  const [currentCard, setCurrentCard] = useState(null);
  const [history, setHistory]       = useState([]);

  const drawCard = useCallback(() => {
    let activeDeck = deck;

    // Auto-reshuffle when deck is exhausted
    if (activeDeck.length === 0) {
      activeDeck = shuffle(cardsData);
      setHistory([]);
    }

    const [next, ...rest] = activeDeck;
    setDeck(rest);
    setCurrentCard(next);
    setHistory(prev => [...prev, next]);
  }, [deck]);

  const shuffleDeck = useCallback(() => {
    const fresh = shuffle(cardsData);
    setDeck(fresh);
    setCurrentCard(null);
    setHistory([]);
  }, []);

  return {
    currentCard,
    remaining: deck.length,
    totalCards: cardsData.length,
    drawCard,
    shuffleDeck,
    isLastCard: deck.length === 1,
  };
}
