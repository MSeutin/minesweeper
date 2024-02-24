// boardUtils.js

export const initBoard = (rows, columns, mines) => {
  // Create a new board with unique objects for each cell
  let board = new Array(rows).fill(null).map(() =>
    new Array(columns).fill(null).map(() => ({
      backgroundColor: "lightgrey",
      isRevealed: false,
      isMine: false,
      minesAround: 0,
      isFlagged: false,
      isEndgame: false,
      content: "",
    }))
  );

    board = placeMines(board, mines);
    board = calculateMinesAround(board);
  return board;
};

// place mines on the board
export const placeMines = (board, mines) => {
  const nums = new Set();
  const rows = board.length;
  const cols = board[0].length;
  const boardSize = rows * cols;
  // Generate unique positions for mines
  while (nums.size < mines) {
    const position = Math.floor(Math.random() * boardSize);
    nums.add(position);
  }

  // Map each cell to determine if it contains a mine
  const newBoard = board.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const flatIndex = rowIndex * cols + colIndex; // Calculate flat index for comparison
      const cellCopy = { ...cell };

      // If the flat index is in the set, mark this cell as containing a mine
      if (nums.has(flatIndex)) {
        cellCopy.isMine = true;
      }

      return cellCopy;
    });
  });

  return newBoard;
};

// calculate the number of mines around each cell
export const calculateMinesAround = (board) => {
  const rows = board.length;
  const columns = board[0].length;

  const newBoard = board.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      if (cell && cell.isMine) {
        return cell;
      }

      let minesAround = 0;
      for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (let j = colIndex - 1; j <= colIndex + 1; j++) {
          if (i >= 0 && i < rows && j >= 0 && j < columns) {
            if (board[i][j] && board[i][j].isMine) {
              minesAround++;
            }
          }
        }
      }

      return { ...cell, minesAround };
    });
  });

  return newBoard;
};

// reveal the cell
export const revealCell = (board, row, col) => {
  const rows = board.length;
  const columns = board[0].length;

  if (row < 0 || row >= rows || col < 0 || col >= columns) {
    return board;
  }

  if (board[row][col].isRevealed) {
    return board;
  }

  const newBoard = board.map((r, rowIndex) => {
    return r.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return { ...cell, isRevealed: true };
      }

      return cell;
    });
  });

  return newBoard;
};

// reveal all cells
export const revealAllCells = (board) => {
  return board.map((row) => {
    return row.map((cell) => {
      return { ...cell, isRevealed: true };
    });
  });
};

// check if the game is over
export const isGameOver = (board) => {
  return board.some((row) => {
    return row.some((cell) => {
      return cell.isMine && cell.isRevealed;
    });
  });
};

// check if the player has won
export const isGameWon = (board) => {
  return board.every((row) => {
    return row.every((cell) => {
      return (cell.isMine && cell.isFlagged) || cell.isRevealed;
    });
  });
};

// flag a cell
export const flagCell = (board, row, col) => {
  return board.map((r, rowIndex) => {
    return r.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return { ...cell, isFlagged: !cell.isFlagged };
      }

      return cell;
    });
  });
};

// reveal the empty cells
export const revealEmptyCells = (board, row, col) => {
  const rows = board.length;
  const columns = board[0].length;

  const newBoard = revealCell(board, row, col);

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < columns) {
        if (newBoard[i][j].minesAround === 0) {
          newBoard[i][j].isRevealed = true;
          revealEmptyCells(newBoard, i, j);
        } else {
          newBoard[i][j].isRevealed = true;
        }
      }
    }
  }

  return newBoard;
};
