// define the global state
const initialState = {
  level: null,
  gameHistory: [],
  showHistory: false,
  showNewGameBtn: false,
  showMines: false,
  minesAreRevealed: false,
  allCellsAreRevealed: false,
  isFlagMode: false,
  timer: 0,
  gameStatus: "", // can be "playing", "won", "lost"
  gameStarted: false,
  endGame: false,
  gameDuration: 0,
  gameSize: 0,
  gameOutcome: "",
  mines: 0,
  board: [],
};

export default initialState;
