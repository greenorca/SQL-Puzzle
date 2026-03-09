import { Topic, ALL_TOPICS } from '../types';

interface TopicSelectorProps {
  selectedTopics: Topic[];
  onTopicsChange: (topics: Topic[]) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopics, onTopicsChange }) => {
  const handleTopicToggle = (topic: Topic) => {
    if (selectedTopics.includes(topic)) {
      // Remove topic if already selected
      const newTopics = selectedTopics.filter(t => t !== topic);
      onTopicsChange(newTopics);
    } else {
      // Add topic if not selected
      const newTopics = [...selectedTopics, topic];
      onTopicsChange(newTopics);
    }
  };

  const handleSelectAll = () => {
    onTopicsChange(ALL_TOPICS);
  };

  const handleSelectNone = () => {
    onTopicsChange([]);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-lg max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Topics:</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {ALL_TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => handleTopicToggle(topic)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTopics.includes(topic)
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {topic.replace('_', ' ')}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleSelectAll}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
        >
          Select All
        </button>
        <button
          onClick={handleSelectNone}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
        <span className="text-sm text-gray-600 ml-auto">
          {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
        </span>
      </div>
    </div>
  );
};

export default TopicSelector;
