enum blockState {
  'empty',
  'mine',
  'closeToMine'
}

export interface IBlock {
  state: blockState;
  minesCount?: number
}
