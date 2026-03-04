export interface SQLElement {
  id: string;
  content: string;
  type: 'keyword' | 'identifier' | 'operator' | 'value' | 'function';
  group?: string; // Elements with same group are interchangeable
}

export interface SQLPuzzle {
  id: string;
  title: string;
  description: string;
  correctOrder: SQLElement[];
  shuffledOrder: SQLElement[];
}

export interface GameState {
  currentPuzzle: SQLPuzzle | null;
  userOrder: SQLElement[];
  isWon: boolean;
  moves: number;
}
