import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import sizes from "../utils/sizes";
import { Grid } from "@mui/material";
import BoardControls from "./BoardControls";

const initBoard = () => {
  // returns the internal representation of the board.

  return new Array(sizes.num_rows).fill(
    new Array(sizes.num_columns).fill({
      backgroundColor: "white",
    })
  );
};

const Cell = (props) => {
  const { cellContent, onClickCallback } = props;

  return (
    <Box
      onClick={() => onClickCallback()}
      sx={{
        width: sizes.cell_width,
        height: sizes.cell_height,
        border: 1,
        backgroundColor: cellContent.backgroundColor,
        borderRadius: "50%",
      }}
    ></Box>
  );
};

const Row = (props) => {
  const { row, onClickCallback } = props;

  return (
    <Fragment>
      <Grid container columns={sizes.num_columns}>
        {row.map((cellContent, colIdx) => {
          return (
            <Grid item xs={1} key={colIdx}>
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

const Board = (props) => {
  const [board, setBoard] = useState(initBoard);

  const width = () =>
    sizes.num_columns * sizes.cell_width +
    (sizes.num_columns - 1) * sizes.h_gap;
  const height = () =>
    sizes.num_rows * sizes.cell_height + (sizes.num_rows - 1) * sizes.v_gap;

  const onClickCallback = (rowIdx, colIdx) => {
    console.log(`rowIdx = ${rowIdx}, colIdx = ${colIdx}`);

    const newBoard = board.slice();
    const affectedRow = board[rowIdx].slice();
    // const content = affectedRow[colIdx];

    // content['backgroundColor'] = 'blue';

    affectedRow[colIdx] = {
      ...affectedRow[colIdx],
      backgroundColor: "blue",
    };

    newBoard[rowIdx] = affectedRow;
    setBoard(newBoard);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: width() + 100,
          height: height() + 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          columns={1}
          sx={{
            width: width(),
            height: height(),
          }}
        >
          {board.map((row, rowIdx) => (
            <Grid item key={rowIdx} xs={1}>
              <Row
                row={row}
                onClickCallback={(colIdx) => onClickCallback(rowIdx, colIdx)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <BoardControls />
    </Box>
  );
};

export default Board;
