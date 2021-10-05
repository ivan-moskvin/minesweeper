import {LANG} from "./lang";

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
    name: LANG.NOVICE,
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
  'professional': {
    id: 'professional',
    name: LANG.PRO,
    cols: 30,
    rows: 16,
    mines: 99
  }
};
