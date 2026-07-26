import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './hooks/AuthContext';
import HomePage from './components/HomePage';

// Code-split components with dynamic imports
const PuzzleSelector = React.lazy(() => import('./components/PuzzleSelector'));
const PuzzleGame = React.lazy(() => import('./components/PuzzleGame'));
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.About })));

function App() {
  const basename = import.meta.env.BASE_URL || '';
  
  return (
    <AuthProvider>
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/select" 
          element={
            <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
              <PuzzleSelector />
            </Suspense>
          } 
        />
        <Route 
          path="/puzzle/:puzzleId" 
          element={
            <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
              <PuzzleGame />
            </Suspense>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
              <About />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
