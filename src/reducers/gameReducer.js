import {
  revealAllMines,
  revealAllCells,
  revealCell,
} from "../utils/boardUtils";

// gameReducer.js
const bomb = "\u{1F4A3}";
const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_LEVEL":
      return {
        ...state,
        level: action.payload,
      };
    case "SHOW_HISTORY":
      return {
        ...state,
        showHistory: action.payload, // true or false
      };
    case "UPDATE_BOARD":
      return {
        ...state,
        board: action.payload,
      };
    case "REVEAL_CELL":
      const { row, col } = action.payload;
      // Use the revealCell function to update the board state
      const updatedBoard = revealCell(state.board, row, col);

      return {
        ...state,
        board: updatedBoard,
      };

    case "REVEAL_ALL_MINES":
      return {
        ...state,
        board: revealAllMines(state.board, state.minesAreRevealed),
        minesAreRevealed: !state.minesAreRevealed,
      };

    case "REVEAL_ALL_CELLS":
      return {
        ...state,
        board: revealAllCells(state.board, state.allCellsAreRevealed),
        allCellsAreRevealed: !state.allCellsAreRevealed,
      };

    default:
      return state;
  }
};

export default gameReducer;
