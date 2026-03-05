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
    ['ORDER_LIMIT_AGGREGATES', 'JOINS'],
    `erDiagram
pupils }o--|| classes : gehoert_zu

pupils {
    int id_pupil PK
    varchar name 
    int id_classes FK
}

classes {
    int id_classes PK
    varchar name
}`
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
    ['SimpleCRUD'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
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
    ['SimpleCRUD'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
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
    ['SimpleCRUD'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
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
    ['SimpleCRUD', 'FILTERS'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
  ),
  createPuzzle(
    '6',
    'READ DATA',
    'Select all users.',
    [
      { id: '1', content: 'SELECT', type: 'keyword' },
      { id: '2', content: '*', type: 'identifier' },
      { id: '3', content: 'FROM', type: 'keyword' },
      { id: '4', content: 'users', type: 'identifier' },
      { id: '5', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD', 'FILTERS'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
  ),
  createPuzzle(
    '7',
    'READ DATA',
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
    ['SimpleCRUD', 'FILTERS'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
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
      { id: '5', content: '=', type: 'operator'},
      { id: '6', content: '26', type: 'identifier' },
      { id: '7', content: 'WHERE', type: 'keyword' },
      { id: '8', content: 'id', type: 'identifier' },
      { id: '9', content: '=', type: 'operator'},
      { id: '10', content: '1', type: 'identifier' },
      { id: '11', content: ';', type: 'operator' }
    ],
    ['SimpleCRUD'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
  ),
  createPuzzle(
    '9',
    'READ DATA',
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
    ['SimpleCRUD', 'FILTERS'],
    `erDiagram
users {
    int id PK
    varchar name
    int age
}`
  ),
  
  createPuzzle(
    '10',
    'CREATE USERS and GRANT Permissions',
    'Create a new user named mary with password secret and grant all privileges on mary_db database to mary.',
    [
      { id: '1', content: 'CREATE', type: 'keyword' },
      { id: '2', content: 'USER', type: 'keyword' },
      { id: '3', content: 'mary', type: 'identifier' },
      { id: '4', content: 'IDENTIFIED', type: 'keyword' },
      { id: '5', content: 'BY', type: 'keyword' },
      { id: '6', content: "'secret'", type: 'value' },
      { id: '7', content: ';', type: 'operator' },
      { id: '8', content: 'GRANT', type: 'keyword' },
      { id: '9', content: 'ALL', type: 'keyword' },
      { id: '10', content: 'ON', type: 'keyword' },
      { id: '11', content: 'mary_db.*', type: 'identifier' },
      { id: '12', content: 'TO', type: 'keyword' },
      { id: '13', content: 'mary', type: 'identifier' },
      { id: '14', content: ';', type: 'operator' }
    ],
    ['USERS_PERMISSIONS']
  ),
  
  createPuzzle(
    '10',
    'CREATE ROLES and GRANT Permissions',
    'Create a role named staff. Grant CRUD privileges on all tables of the staff_db database to the staff role.',
    [
      { id: '1', content: 'CREATE', type: 'keyword' },
      { id: '2', content: 'ROLE', type: 'keyword' },
      { id: '3', content: 'staff', type: 'identifier' },
      { id: '4', content: ';', type: 'operator' },
      { id: '5', content: 'GRANT', type: 'keyword' },
      { id: '6', content: 'SELECT', type: 'keyword', group: 'crud' },
      { id: '7', content: ',', type: 'operator' },
      { id: '8', content: 'INSERT', type: 'keyword', group: 'crud' },
      { id: '9', content: ',', type: 'operator' },
      { id: '10', content: 'UPDATE', type: 'keyword', group: 'crud' },
      { id: '11', content: ',', type: 'operator' },
      { id: '12', content: 'DELETE', type: 'keyword', group: 'crud' },
      { id: '13', content: 'ON', type: 'keyword' },
      { id: '14', content: 'staff_db.*', type: 'identifier' },
      { id: '15', content: 'TO', type: 'keyword' },
      { id: '16', content: 'staff', type: 'identifier' },
      { id: '17', content: ';', type: 'operator' }
    ],
    ['USERS_PERMISSIONS']
  ),
createPuzzle(
    '10',
    'COMPLEX JOINS AND GROUPING',
    'Retrieve user\'s name, game title and maximum score. Join the relevant tables from user to game to get this information.',
    [
        { id: '1', content: 'SELECT', type: 'keyword' },
        { id: '2', content: 'user.name', type: 'identifier' },
        { id: '3', content: ',', type: 'operator' },
        { id: '4', content: 'game.title', type: 'identifier' },
        { id: '5', content: ',', type: 'operator' },
        { id: '6', content: 'max(score)', type: 'function' },
        { id: '7', content: 'FROM', type: 'keyword' },
        { id: '8', content: 'user', type: 'identifier' },
        { id: '9', content: 'JOIN', type: 'keyword' },
        { id: '10', content: 'played', type: 'identifier' },
        { id: '11', content: 'ON', type: 'keyword' },
        { id: '12', content: 'user.id_user', type: 'identifier', group: 'joins_on_1' },
        { id: '13', content: '=', type: 'operator'},
        { id: '14', content: 'played.id_user', type: 'identifier', group: 'joins_on_1' },
        { id: '15', content: 'JOIN', type: 'keyword' },
        { id: '16', content: 'game', type: 'identifier' },
        { id: '17', content: 'ON', type: 'keyword' },
        { id: '18', content: 'game.id_game', type: 'identifier', group: 'joins_on_2' },
        { id: '19', content: '=', type: 'operator'},
        { id: '20', content: 'played.id_game', type: 'identifier', group: 'joins_on_2' },
        { id: '21', content: 'GROUP BY', type: 'keyword' },
        { id: '22', content: 'user.id_user', type: 'identifier', group: 'group_by' },
        { id: '23', content: ',', type: 'operator'},
        { id: '24', content: 'game.id_game', type: 'identifier', group: 'group_by' },
        { id: '25', content: ';', type: 'operator'},
        
    ],
    ['JOINS', 'ORDER_LIMIT_AGGREGATES'],
    `erDiagram
user }o--|| played : "plays"
played ||--o{ game : "plays"

user  {
    int id_user PK
    varchar name
}
played  {
    int id_user FK
    int id_game FK
    int score
    datetime played_date
}
game  {
    int id_game PK
    varchar title
}`
)
  
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
