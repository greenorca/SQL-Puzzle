import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface PuzzleCompletion {
  puzzleId: number;
  completedAt: Date;
}

const USERNAME_KEY = 'sql_puzzle_username';
const PUZZLES_COMPLETED_KEY = 'sql_puzzle_puzzles_completed';

export const useUserInfo = () => {
  const [username, setUsername] = useState<string>('');
  const [puzzlesCompleted, setPuzzlesCompleted] = useState<PuzzleCompletion[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { user } = useAuth();

  // Load username from localStorage on mount
  useEffect(() => {
    const storedUsername = user?.username;
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedIsAdmin = localStorage.getItem('sql_puzzle_is_admin');
    if (storedIsAdmin) {
      setIsAdmin(JSON.parse(storedIsAdmin));
    }
    
    const storedPuzzlesCompleted = localStorage.getItem(PUZZLES_COMPLETED_KEY);
    if (storedPuzzlesCompleted) {
      setPuzzlesCompleted(JSON.parse(storedPuzzlesCompleted));
    }
  }, []);

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (user?.username) {
      localStorage.setItem(USERNAME_KEY, user.username);
    } else {
      localStorage.removeItem(USERNAME_KEY);
    }
  }, [user]);

  const addCompletedPuzzle = (puzzleId: number) => {
    setPuzzlesCompleted([...puzzlesCompleted, { puzzleId, completedAt: new Date() }]);
    localStorage.setItem(PUZZLES_COMPLETED_KEY, JSON.stringify(puzzlesCompleted));
  };

  return {
    username,
    setUsername,
    clearUsername: () => setUsername(''),
    addCompletedPuzzle,
    puzzlesCompleted,
    hasUsername: !!username,
    isAdmin
  };
};
