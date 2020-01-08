export interface IBlock {
  opened: boolean;
  state: 'empty' | 'mine' | 'closeToMine' | null;
  minesCount?: number
}
