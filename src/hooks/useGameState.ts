import { useState, useCallback, useEffect } from 'react';
import { SQLPuzzle, SQLElement, GameState, Topic } from '../types';
import { getRandomPuzzle, getRandomPuzzleByTopics } from '../puzzleData';

export const useGameState = (selectedTopics: Topic[] = []) => {
  const [gameState, setGameState] = useState<GameState>({
    currentPuzzle: null,
    userOrder: [],
    isWon: false,
    moves: 0,
  });

  const initializeGame = useCallback(() => {
    const puzzle = selectedTopics.length > 0 
      ? getRandomPuzzleByTopics(selectedTopics)
      : getRandomPuzzle();
    setGameState({
      currentPuzzle: puzzle,
      userOrder: [...puzzle.shuffledOrder],
      isWon: false,
      moves: 0,
    });
  }, [selectedTopics]);

  const checkWinCondition = useCallback((userOrder: SQLElement[], correctOrder: SQLElement[]) => {
    if (userOrder.length !== correctOrder.length) return false;
    
    // Check each position
    for (let i = 0; i < correctOrder.length; i++) {
      const correctElement = correctOrder[i];
      const userElement = userOrder[i];
      
      // If exact match, continue
      if (userElement.id === correctElement.id || // same ID
        (correctElement.type === 'operator' && userElement.content === correctElement.content)) { // same operator content
        continue;
      }
      
      // If both have groups and groups match, they're interchangeable
      if (correctElement.group && userElement.group && correctElement.group === userElement.group) {
        continue;
      }
      
      // Otherwise, it's wrong
      return false;
    }
    
    // Debug logging
    console.log('Checking win condition:');
    console.log('User order:', userOrder.map(el => el.content).join(' '));
    console.log('Correct order:', correctOrder.map(el => el.content).join(' '));
    console.log('Is correct:', true);
    
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
        moves: 0,
      };
    });
  }, []);

  const nextPuzzle = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    updateUserOrder,
    resetPuzzle,
    nextPuzzle,
  };
};
