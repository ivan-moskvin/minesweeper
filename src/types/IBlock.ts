export type IBlockState = 'empty' | 'mine' | 'closeToMine' | null;

export interface IBlock {
  opened: boolean;
  marked: boolean; // Marked with flag
  state: IBlockState;
  minesCount?: number
}
