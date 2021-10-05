import {LANG} from "./lang";

export type DifficultyLevel = {
  id: string;
  name: string;
  cols: number;
  rows: number;
  mines: number;
};

export const DifficultyEnum: {[id: string]: DifficultyLevel} = {
  'beginner': {
    id: 'beginner',
    name: LANG.BEGINNER,
    cols: 9,
    rows: 9,
    mines: 10
  },
  'intermediate': {
    id: 'intermediate',
    name: LANG.INTERMEDIATE,
    cols: 16,
    rows: 16,
    mines: 40
  },
  'expert': {
    id: 'expert',
    name: LANG.EXPERT,
    cols: 30,
    rows: 16,
    mines: 99
  }
};
