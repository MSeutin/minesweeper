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
    case "CELL_CLICKED":
      const { rowIdx, colIdx } = action.payload;
      let newBoard = state.board.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (rIdx === rowIdx && cIdx === colIdx) {
            // Additional logic to determine if the cell is a mine and update its state
            const cellUpdate = cell.isMine
              ? { isRevealed: true, backgroundColor: "red", content: bomb , isEndgame: true }
              : { ...cell, backgroundColor: "white", isRevealed: true }; // Handle non-mine cells or additional game logic here
            return { ...cell, ...cellUpdate };
          }
          return cell;
        })
      );
      return { ...state, board: newBoard };

    case "SHOW_MINES":
      return {
        ...state,
        board: state.board.map((row) =>
          row.map((cell) => {
            // toggle visibility back and forth
            if (cell.isMine) {
              return { ...cell, isRevealed: !cell.isRevealed };
            }
            return cell;
          })
        ),
      };
    default:
      return state;
  }
};

export default gameReducer;
