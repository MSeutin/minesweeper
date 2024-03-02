// boardUtils.js
const bomb = "\u{1F4A3}";

export const initBoard = (rows, columns, mines) => {
  // Create a new board with unique objects for each cell
  let board = new Array(rows).fill(null).map(() =>
    new Array(columns).fill(null).map(() => ({
      backgroundColor: "lightgrey",
      color: "black",
      isRevealed: false,
      isVisible: false,
      isMine: false,
      minesAround: 0,
      isFlagged: false,
      content: "",
    }))
  );

  board = placeMines(board, mines);
  board = calculateMinesAround(board);
  return board;
};

// Function to count the number of revealed cells on the board
export const countRevealedCells = (board) => {
  let revealedCellsCount = 0;
  for (let row of board) {
    for (let cell of row) {
      if (cell.isRevealed && !cell.isMine) {
        revealedCellsCount++;
      }
    }
  }
  return revealedCellsCount;
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
        cellCopy.content = bomb;
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
      const content = minesAround === 0 ? "" : minesAround;
      return { ...cell, minesAround, content };
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
        return {
          ...cell,
          isRevealed: true,
          backgroundColor: "lightblue",
          color: "darkgreen",
        };
      }

      return cell;
    });
  });

  return newBoard;
};

// reveal all cells
export const revealAllCells = (board, allCellsAreRevealed) => {
  return board.map((row) => {
    return row.map((cell) => {
      return { ...cell, isRevealed: !allCellsAreRevealed };
    });
  });
};

// reveal all mines
export const revealAllMines = (board, minesAreRevealed) => {
  return board.map((row) => {
    return row.map((cell) => {
      if (cell.isMine) {
        return { ...cell, isRevealed: !minesAreRevealed };
      }

      return cell;
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
      if (rowIndex === row && colIndex === col && !cell.isRevealed) {
        const isFlagged = !cell.isFlagged;
        return {
          ...cell,
          isFlagged,
          backgroundColor: isFlagged ? "lightgrey" : cell.backgroundColor,
          color: isFlagged ? "crimson" : cell.color,
        };
      }

      return cell;
    });
  });
};

// remove flag
export const removeFlag = (board, row, col) => {
  return board.map((r, rowIndex) => {
    return r.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return {
          ...cell,
          isFlagged: false,
          backgroundColor: "lightgrey",
        };
      }

      return cell;
    });
  });
};

// reveal the empty cells
export const revealEmptyCells = (board, row, col) => {
  const rows = board.length;
  const columns = board[0].length;

  // Base case to stop recursion if the cell is already revealed or out of bounds
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= columns ||
    board[row][col].isRevealed
  ) {
    return board;
  }

  // Reveal the current cell
  board[row][col].isRevealed = true;

  // Recursive case: reveal all adjacent cells for an empty cell
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // Check bounds and avoid revealing the cell itself again
      if (
        i >= 0 &&
        i < rows &&
        j >= 0 &&
        j < columns &&
        !(i === row && j === col)
      ) {
          if (board[i][j].content === "" && !board[i][j].isRevealed) {
            // Recursively reveal empty cells
            board = revealEmptyCells(board, i, j);
          } else {
            // Reveal the cell
            board[i][j].isRevealed = true;
          }
      }
    }
  }

  return board;
};
