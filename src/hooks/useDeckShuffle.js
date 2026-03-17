import { useState, useCallback, useEffect } from 'react';
import { editions } from '../data/editions';

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
export function useDeckShuffle(editionId = 'classic') {
  const editionData = editions[editionId]?.data || editions.classic.data;

  const [deck, setDeck]             = useState(() => shuffle(editionData));
  const [currentCard, setCurrentCard] = useState(null);
  const [history, setHistory]       = useState([]);

  // When edition changes, reset everything
  useEffect(() => {
    const fresh = shuffle(editionData);
    setDeck(fresh);
    setCurrentCard(null);
    setHistory([]);
  }, [editionId]);

  const drawCard = useCallback(() => {
    let activeDeck = deck;

    // Auto-reshuffle when deck is exhausted
    if (activeDeck.length === 0) {
      activeDeck = shuffle(editions[editionId]?.data || editions.classic.data);
      setHistory([]);
    }

    const [next, ...rest] = activeDeck;
    setDeck(rest);
    setCurrentCard(next);
    setHistory(prev => [...prev, next]);
  }, [deck, editionId]);

  const shuffleDeck = useCallback(() => {
    const fresh = shuffle(editions[editionId]?.data || editions.classic.data);
    setDeck(fresh);
    setCurrentCard(null);
    setHistory([]);
  }, [editionId]);

  return {
    currentCard,
    remaining: deck.length,
    totalCards: editionData.length,
    drawCard,
    shuffleDeck,
    isLastCard: deck.length === 1,
  };
}
