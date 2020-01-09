export type DifficultyLevel = {
  id: string;
  name: string;
  cols: number;
  rows: number;
  mines: number;
};


export type DifficultyName  = 'beginner' | 'intermediate' | 'professional';

export const DifficultyEnum: {[id: string]: DifficultyLevel} = {
  'beginner': {
    id: 'beginner',
    name: 'Новичок',
    cols: 9,
    rows: 9,
    mines: 10
  },
  'intermediate': {
    id: 'intermediate',
    name: 'Любитель',
    cols: 16,
    rows: 16,
    mines: 40
  },
  'professional': {
    id: 'professional',
    name: 'Профессионал',
    cols: 30,
    rows: 16,
    mines: 99
  }
};
