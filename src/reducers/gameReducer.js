// gameReducer.js

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LEVEL':
            return {
                ...state,
                level: action.payload,
            };
        case 'SHOW_HISTORY':
            return {
                ...state,
                showHistory: action.payload, // true or false
            };
        case 'UPDATE_BOARD':
            return {
                ...state,
                board: action.payload,
            };
        case 'SHOW_MINES':
            return {
              ...state,
              board: state.board.map((row) =>
                row.map((cell) => {
                  // If you want to toggle visibility back and forth
                  if (cell.isMine) {
                    return { ...cell, isRevealed: !cell.isRevealed };
                  }
                  return cell;
                })
              ),
            };
        default:
            return state;
    };
}

export default gameReducer;