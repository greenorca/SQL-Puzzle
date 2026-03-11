export interface SQLElement {
  id: string;
  content: string;
  type: 'keyword' | 'identifier' | 'operator' | 'value' | 'function';
  group?: string; // Elements with same group are interchangeable
}

export type Topic = 'SimpleCRUD' | 'FILTERS' | 'JOINS' | 'ORDER_LIMIT_AGGREGATES' | 'USERS_PERMISSIONS' |'DDL';

export const ALL_TOPICS: Topic[] = ['SimpleCRUD', 'FILTERS', 'JOINS', 'ORDER_LIMIT_AGGREGATES', 'USERS_PERMISSIONS', 'DDL'];

export interface SQLPuzzle {
  id: string;
  title: string;
  description: string;
  correctOrder: SQLElement[];
  shuffledOrder: SQLElement[];
  topics: Topic[];
  img?: string;
}

export interface GameState {
  currentPuzzle: SQLPuzzle | null;
  userOrder: SQLElement[];
  isWon: boolean;
  isGivenUp: boolean;
  moves: number;
}
