import React, { Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import BoardControls from "./BoardControls";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {  initBoard, placeMines } from "../utils/boardUtils";

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
        backgroundColor: cellContent.isRevealed ? "white" : "lightgrey", 
        cursor: "pointer",
        boxSizing: "border-box",
        display: "flex", // Ensure content is centered
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
      }}
    >
      {cellContent.isRevealed && (
        <Typography variant="h5" sx={{ color: "pink" }}>
          {cellContent.content}
        </Typography>
      )}
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

const Board = ({ config, dispatch, board }) => {
  const { rows, columns, mines } = config;

  // Initialize the board state when component mounts
  useEffect(() => {
    dispatch({
      type: "UPDATE_BOARD",
      payload: initBoard(rows, columns, mines),
    });
  }, []);
    

const onClickCallback = (rowIdx, colIdx) => {
  // Dispatch an action to update the board state
  dispatch({
    type: "REVEAL_CELL",
    payload: { row: rowIdx, col: colIdx },
  });
};

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
        <SentimentSatisfiedAltIcon color="warning" />
        <Typography variant="h5" color="crimson">
          000
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
      <BoardControls dispatch={dispatch} />
    </Box>
  );
};

export default Board;
