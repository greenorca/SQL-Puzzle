import { useState, useEffect } from 'react';

interface PuzzleCompletion {
  puzzleId: number;
  completedAt: Date;
}

const USERNAME_KEY = 'sql_puzzle_username';
const PUZZLES_COMPLETED_KEY = 'sql_puzzle_puzzles_completed';

export const useUserInfo = () => {
  const [username, setUsername] = useState<string>('');
  const [puzzlesCompleted, setPuzzlesCompleted] = useState<PuzzleCompletion[]>([]);

  // Load username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem(USERNAME_KEY);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem(USERNAME_KEY, username);
    } else {
      localStorage.removeItem(USERNAME_KEY);
    }
  }, [username]);

  const addCompletedPuzzle = (puzzleId: number) => {
    setPuzzlesCompleted([...puzzlesCompleted, { puzzleId, completedAt: new Date() }]);
  };

  return {
    username,
    setUsername,
    clearUsername: () => setUsername(''),
    addCompletedPuzzle,
    puzzlesCompleted,
    hasUsername: !!username
  };
};
