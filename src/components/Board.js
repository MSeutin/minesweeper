import React, { Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import BoardControls from "./BoardControls";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { initBoard, countRevealedCells } from "../utils/boardUtils";
import Alert from "@mui/material/Alert";

// Constants for cell size and gaps
const cellWidth = 25;
const cellHeight = 25;

const Cell = (props) => {
  const { cellContent, onClickCallback } = props;

  return (
    <Box
      onClick={() => onClickCallback()}
      sx={{
        width: cellWidth,
        height: cellHeight,
        border: 1,
        borderColor: "#f9f9f9",
        backgroundColor: cellContent.backgroundColor,
        cursor: "pointer",
        boxSizing: "border-box",
        display: "flex", // Ensure content is centered
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
      }}
    >
      {cellContent.isRevealed || cellContent.isVisible ? (
        <Typography variant="h6" sx={{ color: cellContent.color }}>
          {cellContent.content}
        </Typography>
      ) : cellContent.isFlagged ? (
        <FlagIcon sx={{ color: cellContent.color }} />
      ) : null}
    </Box>
  );
};

const Row = (props) => {
  const { row, columns, onClickCallback } = props;

  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        sx={{ width: "100%", maxWidth: cellWidth * columns }}
      >
        {row.map((cellContent, colIdx) => {
          return (
            <Grid
              item
              key={colIdx}
              sx={{ width: `${100 / columns}%`, height: cellHeight }}
            >
              <Cell
                cellContent={cellContent}
                onClickCallback={() => onClickCallback(colIdx)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

const Board = ({ config, dispatch, state }) => {
    const { rows, columns, mines, full } = config;
    const {
      board,
      isFlagMode,
      timer,
      gameStarted,
      gameStatus,
    } = state;

  // Initialize the board state when component mounts
  useEffect(() => {
    dispatch({
      type: "UPDATE_BOARD",
      payload: initBoard(rows, columns, mines),
    });

    // Then, place the mines
    dispatch({
      type: "PLACE_MINES",
      payload: { mines },
    });
  }, []);
    
    // set timer
    useEffect(() => {
          let id;
          if (gameStarted) {
            id = setInterval(() => {
              dispatch({ type: "TICK" });
            }, 1000);
          }

        return () => clearInterval(id);
    }, [gameStarted])

    const onClickCallback = (rowIdx, colIdx) => {
      if (gameStatus === "won" || gameStatus === "lost") return;
      const cell = board[rowIdx][colIdx];
      if (!gameStarted) {
        dispatch({ type: "START_GAME" });
      }
      if (isFlagMode) {
        dispatch({
          type: "FLAG_CELL",
          payload: { row: rowIdx, col: colIdx },
        });
        return;
      }
      if (cell.isFlagged) {
        dispatch({
          type: "REMOVE_FLAG",
          payload: { row: rowIdx, col: colIdx },
        });
        return;
      }
      // if cell is empty, reveal all cells around it
      if (cell.content === "") {
        dispatch({
          type: "REVEAL_EMPTY_CELLS",
          payload: { newRow: rowIdx, newCol: colIdx },
        });
        return;
      }

      // if the cell is a mine, end the game
      if (cell.isMine) {
        dispatch({ type: "END_GAME", payload: "lost" });
      }

      // if none of the above conditions are met, reveal the cell
      dispatch({
        type: "REVEAL_CELL",
        payload: { row: rowIdx, col: colIdx },
      });

    };

    useEffect(() => {
      const newRevealedCells = countRevealedCells(board);
      console.log("Newly revealed cells:", newRevealedCells);
      if (newRevealedCells === full) {
        dispatch({ type: "END_GAME", payload: "won" });
      }
    }, [board]);

  // Dynamic width and height calculation
  const dynamicWidth = columns * cellWidth;
  const dynamicHeight = rows * cellHeight;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //   justifyContent: "center",
        justifyContent: "flex-start",
        height: "100%", // Take full height of the container to allow for proper alignment
        width: "100%", // Take full width
      }}
    >
      <Box
        sx={{
          border: 5,
          borderColor: "#f9f9f9",
          width: dynamicWidth,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h5" color="darkgreen">
          {mines}
        </Typography>
        {gameStatus === "lost" ? (
          <SentimentVeryDissatisfiedIcon color="secondary" />
        ) : (
          <SentimentSatisfiedAltIcon color="primary" />
        )}
        <Typography variant="h5" color="crimson">
          {timer.toString().padStart(3, "0")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: dynamicWidth,
          height: dynamicHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: 5,
          borderColor: "#f9f9f9",
          borderRadius: 1,
        }}
      >
        <Grid container sx={{ width: "100%", height: "100%" }}>
          {board.map((row, rowIdx) => (
            <Grid item key={rowIdx} xs={12}>
              <Row
                row={row}
                columns={columns}
                onClickCallback={(colIdx) => onClickCallback(rowIdx, colIdx)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <BoardControls dispatch={dispatch} isFlagMode={isFlagMode} />
          {(gameStatus === "lost" || gameStatus === "won") && (<Alert severity="info">Game Over</Alert>)}
    </Box>
  );
};

export default Board;
