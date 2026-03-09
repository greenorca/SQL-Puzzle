import React, { useState } from 'react';
import './App.css';
import { useGameState } from './hooks/useGameState';
import PuzzleArea from './components/PuzzleArea';
import WinCelebration from './components/WinCelebration';
import TopicSelector from './components/TopicSelector';
import MermaidDiagram from './components/MermaidDiagram';
import { Topic } from './types';

function App() {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [showDiagram, setShowDiagram] = useState(false);
  const { gameState, updateUserOrder, resetPuzzle, nextPuzzle } = useGameState(selectedTopics);

  const getUserOrderDisplay = () => {
    const elements = gameState.userOrder.map(el => el.content);
    return elements.map((content, index) => {
      const shouldBreak = ['JOIN', 'FROM', 'WHERE', 'VALUES', 'SET', 'GROUP BY','ORDER BY','LIMIT'].includes(content);
      return (
        <React.Fragment key={index}>
          {shouldBreak && <br />}
          <span>{content}</span>
          {index < elements.length - 1 && ' '}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            SQL Puzzle
          </h1>
          <p className="text-gray-600 text-lg">
            Arrange the elements to form a valid SQL statement
          </p>
        </header>

        {/* Topic Selector */}
        <TopicSelector
          selectedTopics={selectedTopics}
          onTopicsChange={setSelectedTopics}
        />

        {/* Puzzle Info */}
        {gameState.currentPuzzle && (
          <div className="flex justify-center gap-2">
          <div className="bg-white rounded-lg p-6 mb-8 shadow-lg max-w-4xl mx-auto grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {gameState.currentPuzzle.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {gameState.currentPuzzle.description}
            </p>
            
            {/* Schema Diagram Button */}
            {gameState.currentPuzzle.img && (
              <button
                onClick={() => setShowDiagram(true)}
                className="mb-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Database Schema
              </button>
            )}
            
            {/* Legend */}
            <div className="flex flex-wrap gap-1 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Keyword</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
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
          </div>
        )}

        {/* Puzzle Area */}
        <PuzzleArea
          elements={gameState.userOrder}
          onElementsChange={updateUserOrder}
          disabled={gameState.isWon}
        />        
                
        {/* Current SQL Display */}
        { gameState.moves > 0 && (
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
        ) }

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={resetPuzzle}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            Play this again
          </button>
          <button
            onClick={nextPuzzle}
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            Play another puzzle
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
        
        {/* Mermaid Diagram Popup */}
        <MermaidDiagram
          mermaidCode={gameState.currentPuzzle?.img || ''}
          isOpen={showDiagram}
          onClose={() => setShowDiagram(false)}
        />
      </div>
    </div>
  );
}

export default App;
