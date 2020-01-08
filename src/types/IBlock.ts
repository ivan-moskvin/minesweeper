export interface IBlock {
  opened: boolean;
  marked: boolean; // Marked with flag
  state: 'empty' | 'mine' | 'closeToMine' | null;
  minesCount?: number
}
