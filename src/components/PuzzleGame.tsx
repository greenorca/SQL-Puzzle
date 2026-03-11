import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSpecificPuzzle } from '../hooks/useSpecificPuzzle';
import { useUserInfo } from '../hooks/useUserInfo';
import { usePuzzleById } from '../hooks/usePuzzleById';
import PuzzleArea from './PuzzleArea';
import WinCelebration from './WinCelebration';
import MermaidDiagram from './MermaidDiagram';

const PuzzleGame: React.FC = () => {
  const { puzzleId } = useParams<{ puzzleId: string }>();
  const { puzzle, loading, error } = usePuzzleById(puzzleId || null);
  const { username, addCompletedPuzzle, puzzlesCompleted } = useUserInfo();
  const [showWinCelebration, setShowWinCelebration] = React.useState<boolean>(true);
  const [showDiagram, setShowDiagram] = React.useState<boolean>(false);

  // Initialize game state with the specific puzzle
  const { gameState, updateUserOrder, resetPuzzle, giveUp } = useSpecificPuzzle(puzzle);

  const getUserOrderDisplay = () => {
    let elements = gameState.userOrder.map(el => el.content)
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

  const getNumberPuzzlesSolvedToday = (): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    
    return puzzlesCompleted.filter(item => {
      const completionDate = new Date(item.completedAt);
      completionDate.setHours(0, 0, 0, 0); // Set to start of day
      return completionDate.getTime() === today.getTime();
    }).length;
  };

  React.useEffect(() => {
    setShowWinCelebration(true);
    if (gameState.isWon && gameState.currentPuzzle) {
      addCompletedPuzzle(parseInt(gameState.currentPuzzle.id));
    }
  }, [gameState.isWon, gameState.currentPuzzle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading puzzle...</p>
        </div>
      </div>
    );
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Puzzle not found'}</p>
          <Link
            to="/select"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Choose Another Puzzle
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 flex justify-between items-center">
          <div className="text-left">
            <Link to="/select" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ← Back to Puzzle Selection
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-2">
              SQL Puzzle
            </h1>
            <p className="text-gray-600 text-lg">
              Puzzle #{puzzle.id}: {puzzle.title}
            </p>
          </div>
          <div className="text-right">
            <h4 className="text-gray-800 font-bold text-lg">Hi {username}</h4>
            <p className="text-gray-600 text-lg">
              <b>{getNumberPuzzlesSolvedToday()}</b> puzzles solved today
            </p>
          </div>
        </header>

        {/* Puzzle Info */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {puzzle.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {puzzle.description}
          </p>
          
          {/* Schema Diagram Button */}
          {puzzle.img && (
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
          
          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {puzzle.topics.map(topic => (
              <span key={topic} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {topic.replace('_', ' ')}
              </span>
            ))}
          </div>
          
          {/* Game Stats */}
          <div className="flex justify-center gap-8">
            <div className="bg-gray-50 rounded-lg px-6 py-3 shadow-md">
              <span className="text-gray-600 text-sm">Moves</span>
              <p className="text-2xl font-bold text-blue-600">{gameState.moves}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-6 py-3 shadow-md">
              <span className="text-gray-600 text-sm">Status</span>
              <p className="text-2xl font-bold text-green-600">
                {gameState.isWon ? 'Won! 🎉' : 'Playing'}
              </p>
            </div>
          </div>
        </div>

        {/* Puzzle Area */}
        <PuzzleArea
          elements={gameState.userOrder}
          onElementsChange={updateUserOrder}
          disabled={gameState.isWon}
        />        
                
        {/* Current SQL Display */}
        { gameState.moves > 0 && (
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your SQL Statement:</h3>
          <div className={`p-4 rounded-lg font-mono text-lg overflow-x-auto ${
            gameState.isWon 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-900 text-green-400'
          }`}>
            {gameState.isGivenUp ? gameState.currentPuzzle?.correctOrder.map(el => el.content).join(' ') : getUserOrderDisplay() || <span className="text-gray-500">Start arranging elements above...</span>}
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
            onClick={() => giveUp()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            I give up. Show me the solution
          </button>
          <button
            onClick={resetPuzzle}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            Play this again
          </button>
          <Link
            to="/select"
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md"
          >
            Choose another puzzle
          </Link>
        </div>

        {/* Win Celebration */}
        {gameState.isWon && showWinCelebration && (
          <WinCelebration
            moves={gameState.moves}
            onNextPuzzle={() => window.location.href = '/select'}
            onResetPuzzle={resetPuzzle}
            onClose={() => setShowWinCelebration(false)}
          />
        )}
        
        {/* Mermaid Diagram Popup */}
        <MermaidDiagram
          mermaidCode={puzzle.img || ''}
          isOpen={showDiagram}
          onClose={() => setShowDiagram(false)}
        />
      </div>
    </div>
  );
};

export default PuzzleGame;
