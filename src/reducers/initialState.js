// define the initial state
const initialState = {
  level: null,
  showHistory: false,
  showMines: false,
  minesAreRevealed: false,
  allCellsAreRevealed: false,
    isFlagMode: false,
    isFlagged: false,
    color: "",
    backgroundColor: "",
    timer: 0,
  gameStatus: "", // can be "playing", "won", "lost"
  board: [],
};

export default initialState;
