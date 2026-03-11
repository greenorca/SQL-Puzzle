import { useState, useEffect } from 'react';
import { SQLPuzzle } from '../types';
import { getPuzzleById } from '../puzzleData';

export const usePuzzleById = (puzzleId: string | null) => {
  const [puzzle, setPuzzle] = useState<SQLPuzzle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puzzleId) {
      setPuzzle(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const foundPuzzle = getPuzzleById(puzzleId);
    
    if (foundPuzzle) {
      setPuzzle(foundPuzzle);
    } else {
      setError(`Puzzle with ID "${puzzleId}" not found`);
    }
    
    setLoading(false);
  }, [puzzleId]);

  return { puzzle, loading, error };
};
