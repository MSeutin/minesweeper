// gameReducer.js
import {
  revealAllMines,
  revealAllCells,
  revealCell,
  flagCell,
  removeFlag,
} from "../utils/boardUtils";

const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        gameStarted: true,
      };
      case "END_GAME":
          const gameSize = `${state.board.length}x${state.board[0].length}`;
          const newHistoryRecord = {
                gameSize: gameSize,
                gameOutcome: action.payload,
                gameDuration: state.timer,
          };
          let newGameHistory = [...state.gameHistory, newHistoryRecord];
          if (newGameHistory.length > 10) {
                newGameHistory = newGameHistory.slice(-10);
          }
        return {
            ...state,
            gameStarted: false, // stop the timer
            gameStatus: action.payload,
            gameHistory: newGameHistory,
        };
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

    case "TOGGLE_FLAG_MODE":
      return {
        ...state,
        isFlagMode: !state.isFlagMode,
      };

    case "FLAG_CELL": {
      const { row, col } = action.payload;
      const updatedBoard = flagCell(state.board, row, col);
      return {
        ...state,
        board: updatedBoard,
        // Assuming you want to exit flag mode after placing a flag
        isFlagMode: false,
      };
    }

    case "REMOVE_FLAG": {
      const { row, col } = action.payload;
      const updatedBoard = removeFlag(state.board, row, col);
      return {
        ...state,
        board: updatedBoard,
      };
    }

    case "TICK":
      return {
        ...state,
        timer: state.timer + 1,
      };

    case "RESET_GAME":
      return {
        ...state,
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
        gameStatus: "",
        gameStarted: false,
        board: [],
      };

    default:
      return state;
  }
};

export default gameReducer;
