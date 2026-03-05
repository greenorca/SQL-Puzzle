import { create } from 'domain';
import { SQLPuzzle, SQLElement, Topic } from './types';

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createPuzzle = (id: string, title: string, description: string, elements: SQLElement[], topics: Topic[], img?: string  ): SQLPuzzle => {
  return {
    id,
    title,
    description,
    correctOrder: elements,
    shuffledOrder: shuffleArray(elements),
    topics,
    img
  };
};

// Add your MySQL SQL statements here
// Each puzzle needs: unique id, title, description, and array of SQL elements in CORRECT order
// Element types: 'keyword', 'identifier', 'operator', 'value', 'function'
export const puzzles: SQLPuzzle[] = [
  // Example - Replace with your MySQL statements
  createPuzzle(
    '1',
    'MySQL SELECT Query',
    'Create a MySQL SELECT statement that joins the tables "pupils" and "classes" on the appropriate keys. Display only members of the class IT-Primer, and sort the output by pupils names.',
    [
      { id: '1', content: 'SELECT', type: 'keyword' },
      { id: '2', content: '*', type: 'operator' },
      { id: '3', content: 'FROM', type: 'keyword' },
      { id: '4', content: 'pupils', type: 'identifier', group: 'table' },
      { id: "5", content: 'JOIN', type: 'keyword'},
      { id: '6', content: 'classes', type: 'identifier', group: 'table' },
      { id: "7", content: 'ON', type: 'keyword'},
      { id: '8', content: 'classes.id_classes', type: 'identifier', group: 'join_check' },
      { id: "9", content: ' = ', type: 'operator'},
      { id: '10', content: 'pupils.id_classes', type: 'identifier', group: 'join_check' },
      { id: "11", content: 'WHERE', type: 'keyword'},
      { id: '12', content: 'classes.name', type: 'identifier', group: 'where_check' },
      { id: '13', content: ' = ', type: 'operator' },
      { id: '14', content: '"IT-Primer"', type: 'identifier', group: 'where_check' },
      { id: "15", content: 'ORDER BY', type: 'keyword'},
      { id: '16', content: 'pupils.name', type: 'identifier'},
      { id: '17', content: ';', type: 'operator' }
    ],
    ['ORDER_LIMIT_AGGREGATES', 'JOINS']
  ),
  
  // Example with interchangeable columns
  createPuzzle(
    '2',
    'SELECT Multiple Columns',
    'Select name and age from users (order of columns doesn\'t matter)',
    [
      { id: '1', content: 'SELECT', type: 'keyword' },
      { id: '2', content: 'name', type: 'identifier', group: 'columns' },
      { id: '3', content: ',', type: 'operator' },
      { id: '4', content: 'age', type: 'identifier', group: 'columns' },
      { id: '5', content: 'FROM', type: 'keyword' },
      { id: '6', content: 'users', type: 'identifier' },
      { id: '7', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD']
  ),
  
  // Add your MySQL puzzles below this line
  // Use group: 'your-group-name' for interchangeable elements
  // Example: SELECT name, age FROM users - name and age can be in any order if they share the same group
  createPuzzle(
    '3',
    'INSERT DATA',
    'Create a new user named Amanda. The ID of the new user shall be 1, the age is 25.',
    [
      { id: '1', content: 'INSERT', type: 'keyword' },
      { id: '2', content: 'INTO', type: 'keyword' },
      { id: '3', content: 'users', type: 'identifier' },
      { id: '4', content: '(', type: 'operator' },
      { id: '5', content: 'id', type: 'identifier'},  
      { id: '6', content: ',', type: 'operator', group: 'comma' },
      { id: '7', content: 'name', type: 'identifier'},  
      { id: '8', content: ',', type: 'operator', group: 'comma' },
      { id: '9', content: 'age', type: 'identifier'},  
      { id: '10', content: ')', type: 'operator' },
      { id: '11', content: 'VALUES', type: 'keyword' },
      { id: '12', content: '(1, "Amanda", 25)', type: 'identifier' },
      { id: '13', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD']
  ),
  createPuzzle(
    '4',
    'UPDATE DATA',
    'Update the age of the user with ID 1 to 26.',
    [
      { id: '1', content: 'UPDATE', type: 'keyword' },
      { id: '2', content: 'users', type: 'identifier' },
      { id: '3', content: 'SET', type: 'keyword' },
      { id: '4', content: 'age', type: 'identifier' },
      { id: '5', content: '=', type: 'operator', group: 'operator' },
      { id: '6', content: '26', type: 'identifier' },
      { id: '7', content: 'WHERE', type: 'keyword' },
      { id: '8', content: 'id', type: 'identifier' },
      { id: '9', content: '=', type: 'operator', group: 'operator' },
      { id: '10', content: '1', type: 'identifier' },
      { id: '11', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD']
  ),
  createPuzzle(
    '5',
    'DELETE DATA',
    'Delete the user with ID 1.',
    [
      { id: '1', content: 'DELETE', type: 'keyword' },
      { id: '2', content: 'FROM', type: 'keyword' },
      { id: '3', content: 'users', type: 'identifier' },
      { id: '4', content: 'WHERE', type: 'keyword' },
      { id: '5', content: 'id', type: 'identifier' },
      { id: '6', content: '=', type: 'operator', group: 'operator' },
      { id: '7', content: '1', type: 'identifier' },
      { id: '8', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD', 'FILTERS']
  ),
  createPuzzle(
    '6',
    'SELECT DATA',
    'Select all users.',
    [
      { id: '1', content: 'SELECT', type: 'keyword' },
      { id: '2', content: '*', type: 'identifier' },
      { id: '3', content: 'FROM', type: 'keyword' },
      { id: '4', content: 'users', type: 'identifier' },
      { id: '5', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD', 'FILTERS']
  ),
  createPuzzle(
    '7',
    'SELECT DATA',
    'Select all users with age greater than 25.',
    [
      { id: '1', content: 'SELECT', type: 'keyword' },
      { id: '2', content: '*', type: 'identifier' },
      { id: '3', content: 'FROM', type: 'keyword' },
      { id: '4', content: 'users', type: 'identifier' },
      { id: '5', content: 'WHERE', type: 'keyword' },
      { id: '6', content: 'age', type: 'identifier' },
      { id: '7', content: '>', type: 'operator', group: 'operator' },
      { id: '8', content: '25', type: 'identifier' },
      { id: '9', content: ';', type: 'operator' }      
    ],
    ['SimpleCRUD', 'FILTERS']
  ),

  createPuzzle(
    '8',
    'UPDATE DATA',
    'Update the age of the user with ID 1 to 26.',
    [
      { id: '1', content: 'UPDATE', type: 'keyword' },
      { id: '2', content: 'users', type: 'identifier' },
      { id: '3', content: 'SET', type: 'keyword' },
      { id: '4', content: 'age', type: 'identifier' },
      { id: '5', content: '=', type: 'operator', group: 'operator' },
      { id: '6', content: '26', type: 'identifier' },
      { id: '7', content: 'WHERE', type: 'keyword' },
      { id: '8', content: 'id', type: 'identifier' },
      { id: '9', content: '=', type: 'operator', group: 'operator' },
      { id: '10', content: '1', type: 'identifier' },
      { id: '11', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD']
  ),
  createPuzzle(
    '8',
    'SELECT DATA',
    'Select all users whose name contains "na". Upper- and Lowercase don\'t matter.',
    [
      { id: '1', content: 'SELECT', type: 'keyword' },
      { id: '2', content: '*', type: 'identifier' },
      { id: '3', content: 'FROM', type: 'keyword' },
      { id: '4', content: 'users', type: 'identifier' },
      { id: '5', content: 'WHERE', type: 'keyword'},
      { id: '6', content: 'name', type: 'identifier'},
      { id: '7', content: 'LIKE', type: 'keyword'},
      { id: '8', content: '%na%', type: 'value'},
      { id: '9', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD', 'FILTERS']
  ),
  
];

export const getRandomPuzzle = (): SQLPuzzle => {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
};

export const getRandomPuzzleByTopics = (selectedTopics: Topic[]): SQLPuzzle => {
  const filteredPuzzles = puzzles.filter(puzzle => 
    puzzle.topics.some(topic => selectedTopics.includes(topic))
  );
  
  if (filteredPuzzles.length === 0) {
    return getRandomPuzzle(); // Fallback to any puzzle if no matches
  }
  
  const randomIndex = Math.floor(Math.random() * filteredPuzzles.length);
  return filteredPuzzles[randomIndex];
};
