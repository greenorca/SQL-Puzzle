import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { puzzles } from '../puzzleData';
import { Topic } from '../types';

const PuzzleSelector: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'all'>('all');

  const filteredPuzzles = puzzles.filter(puzzle => {
    const matchesSearch = puzzle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         puzzle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         puzzle.id.includes(searchTerm);
    
    const matchesTopic = selectedTopic === 'all' || puzzle.topics.includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose a Puzzle</h2>
      
      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search puzzles by title, description, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Topic:</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value as Topic | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Topics</option>
            <option value="SimpleCRUD">Simple CRUD</option>
            <option value="FILTERS">Filters</option>
            <option value="JOINS">Joins</option>
            <option value="ORDER_LIMIT_AGGREGATES">Order/Limit/Aggregates</option>
            <option value="USERS_PERMISSIONS">Users & Permissions</option>
            <option value="DDL">DDL</option>
          </select>
        </div>
      </div>

      {/* Puzzle Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPuzzles.map((puzzle) => (
          <Link
            key={puzzle.id}
            to={`/puzzle/${puzzle.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">Puzzle #{puzzle.id}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {puzzle.topics.join(', ')}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{puzzle.title}</h4>
            <p className="text-xs text-gray-600 line-clamp-2">{puzzle.description}</p>
          </Link>
        ))}
      </div>

      {filteredPuzzles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No puzzles found matching your criteria.</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Back to Random Play
        </Link>
      </div>
    </div>
  );
};

export default PuzzleSelector;
