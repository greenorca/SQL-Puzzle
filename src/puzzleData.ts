import { SQLPuzzle, SQLElement } from './types';

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createPuzzle = (id: string, title: string, description: string, elements: SQLElement[]): SQLPuzzle => {
  return {
    id,
    title,
    description,
    correctOrder: elements,
    shuffledOrder: shuffleArray(elements)
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
    ]
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
    ]
  ),
  
  // Add your MySQL puzzles below this line
  // Use group: 'your-group-name' for interchangeable elements
  // Example: SELECT name, age FROM users - name and age can be in any order if they share the same group
];

export const getRandomPuzzle = (): SQLPuzzle => {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
};
