import React from 'react';
import './App.css';
import { useGameState } from './hooks/useGameState';
import PuzzleArea from './components/PuzzleArea';
import WinCelebration from './components/WinCelebration';

function App() {
  const { gameState, updateUserOrder, resetPuzzle, nextPuzzle } = useGameState();

  const getCorrectOrderDisplay = () => {
    if (!gameState.currentPuzzle) return '';
    return gameState.currentPuzzle.correctOrder.map(el => el.content).join(' ');
  };

  const getUserOrderDisplay = () => {
    return gameState.userOrder.map(el => el.content).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            SQL Puzzle Game
          </h1>
          <p className="text-gray-600 text-lg">
            Arrange the SQL elements in the correct order to form a valid statement
          </p>
        </header>

        {/* Game Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-white rounded-lg px-6 py-3 shadow-md">
            <span className="text-gray-600 text-sm">Moves</span>
            <p className="text-2xl font-bold text-blue-600">{gameState.moves}</p>
          </div>
          <div className="bg-white rounded-lg px-6 py-3 shadow-md">
            <span className="text-gray-600 text-sm">Status</span>
            <p className="text-2xl font-bold text-green-600">
              {gameState.isWon ? 'Won! 🎉' : 'Playing'}
            </p>
          </div>
        </div>

        {/* Puzzle Info */}
        {gameState.currentPuzzle && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {gameState.currentPuzzle.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {gameState.currentPuzzle.description}
            </p>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Keyword</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Identifier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span>Operator</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Value</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Function</span>
              </div>
            </div>
          </div>
        )}

        {/* Current SQL Display */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your SQL Statement:</h3>
          <div className={`p-4 rounded-lg font-mono text-lg overflow-x-auto ${
            gameState.isWon 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-900 text-green-400'
          }`}>
            {getUserOrderDisplay() || <span className="text-gray-500">Start arranging elements above...</span>}
          </div>
          {gameState.isWon && (
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-green-600">🎉 Perfect! You solved it!</p>
            </div>
          )}
        </div>

        {/* Puzzle Area */}
        <PuzzleArea
          elements={gameState.userOrder}
          onElementsChange={updateUserOrder}
          disabled={gameState.isWon}
        />

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={resetPuzzle}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            Reset Puzzle
          </button>
          <button
            onClick={nextPuzzle}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            Next Puzzle
          </button>
        </div>

        {/* Win Celebration */}
        {gameState.isWon && (
          <WinCelebration
            moves={gameState.moves}
            onNextPuzzle={nextPuzzle}
            onResetPuzzle={resetPuzzle}
          />
        )}
      </div>
    </div>
  );
}

export default App;
