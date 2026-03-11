import { useState, useCallback, useEffect } from 'react';
import { SQLElement, GameState, SQLPuzzle } from '../types';

export const useSpecificPuzzle = (puzzle: SQLPuzzle | null) => {
  const [gameState, setGameState] = useState<GameState>({
    currentPuzzle: null,
    userOrder: [],
    isWon: false,
    isGivenUp: false,
    moves: 0,
  });

  const initializeGame = useCallback(() => {
    if (!puzzle) return;
    
    setGameState({
      currentPuzzle: puzzle,
      userOrder: [...puzzle.shuffledOrder],
      isWon: false,
      isGivenUp: false,
      moves: 0,
    });
  }, [puzzle]);

  const checkWinCondition = useCallback((userOrder: SQLElement[], correctOrder: SQLElement[]) => {
    if (userOrder.length !== correctOrder.length) return false;
    
    // Check each position
    for (let i = 0; i < correctOrder.length; i++) {
      const correctElement = correctOrder[i];
      const userElement = userOrder[i];
      
      // If exact match, continue
      if (userElement.id === correctElement.id || // same ID
        (userElement.content === correctElement.content)) { // same content
        continue;
      }
      
      // If both have groups and groups match, they're interchangeable
      if (correctElement.group && userElement.group && correctElement.group === userElement.group) {
        continue;
      }
      
      // Otherwise, it's wrong
      return false;
    }
    
    return true;
  }, []);

  const updateUserOrder = useCallback((newOrder: SQLElement[]) => {
    setGameState(prev => {
      if (!prev.currentPuzzle) return prev;
      
      const isWon = checkWinCondition(newOrder, prev.currentPuzzle.correctOrder);
      
      return {
        ...prev,
        userOrder: newOrder,
        moves: prev.moves + 1,
        isWon,
        isGivenUp: false,
      };
    });
  }, [checkWinCondition]);

  const resetPuzzle = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPuzzle) return prev;
      
      return {
        ...prev,
        userOrder: [...prev.currentPuzzle.shuffledOrder],
        isWon: false,
        isGivenUp: false,
        moves: 0,
      };
    });
  }, []);

  const giveUp = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPuzzle) return prev;
      
      return {
        ...prev,
        userOrder: [...prev.currentPuzzle.correctOrder],
        isWon: false,
        isGivenUp: true,
      };
    });
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    updateUserOrder,
    resetPuzzle,
    giveUp,
  };
};
