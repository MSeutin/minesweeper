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
const bomb = "\u{1F4A3}";

const Cell = (props) => {
  const { cellContent, onClickCallback } = props;

  // Initially, copy cellContent to newCellContent to potentially modify it
  let newCellContent = { ...cellContent };

  // Adjust newCellContent based on conditions
  if (cellContent.isRevealed && cellContent.isMine) {
    // When the cell is revealed and it's a mine, modify newCellContent accordingly
    newCellContent = {
      ...newCellContent, // Make sure to spread newCellContent, not cellContent
      backgroundColor: "white", // Setting a specific background color for revealed mines
      content: bomb, // Adding specific content (e.g., a bomb icon) for mines
    };
  } else {
    // For other conditions, you can add more else/if blocks to modify newCellContent as needed
    // Example:
    // if (cellContent.isRevealed && !cellContent.isMine) {
    //   newCellContent.content = cellContent.minesAround > 0 ? cellContent.minesAround : '';
    // }
  }

  return (
    <Box
      onClick={() => onClickCallback()}
      sx={{
        width: cellWidth,
        height: cellHeight,
        border: 1,
        borderColor: "#f9f9f9",
        backgroundColor: newCellContent.backgroundColor, // Use backgroundColor from newCellContent
        cursor: "pointer",
        boxSizing: "border-box",
        display: "flex", // Ensure content is centered
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
      }}
    >
      {newCellContent.content} {/* Display content from newCellContent */}
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
  }, [dispatch, rows, columns, mines]);
    
console.log(`board: ${board}`);

const onClickCallback = (rowIdx, colIdx) => {
  console.log(`Row: ${rowIdx}, Column: ${colIdx}`);

  // Dispatch an action to update the board state
  dispatch({
    type: "UPDATE_BOARD",
    payload: { rowIdx, colIdx, backgroundColor: "blue" },
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
