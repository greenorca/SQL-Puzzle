import React, { useState, useEffect } from 'react';

interface WinCelebrationProps {
  moves: number;
  onNextPuzzle: () => void;
  onResetPuzzle: () => void;
  onClose: () => void;
}

const WinCelebration: React.FC<WinCelebrationProps> = ({ 
  moves, 
  onNextPuzzle, 
  onResetPuzzle,
  onClose 
}) => {
  const [shouldBounce, setShouldBounce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldBounce(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-8 max-w-md mx-4 text-center transform scale-100 ${
        shouldBounce ? 'animate-bounce' : ''
      }`}>
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          You've Won!
        </h2>
        <p className="text-gray-700 mb-2">
          Congratulations! You've successfully arranged the SQL statement.
        </p>
        <p className="text-lg font-semibold text-blue-600 mb-6">
          Completed in {moves} {moves === 1 ? 'move' : 'moves'}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Close
          </button>
          <button
            onClick={onNextPuzzle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Next Puzzle
          </button>
          <button
            onClick={onResetPuzzle}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinCelebration;
