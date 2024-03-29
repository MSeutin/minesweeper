import React from "react";
import { Box, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const bomb = "\u{1F4A3}";

function BoardControls({ dispatch, isFlagMode }) {
  // Toggle functions
  const toggleRevealAllCells = () => {
    dispatch({ type: "REVEAL_ALL_CELLS" });
  };
  const toggleMinesVisibility = () => {
    dispatch({ type: "REVEAL_ALL_MINES" });
  };

  const toggleFlagMode = () => {
    dispatch({ type: "TOGGLE_FLAG_MODE" });
  };

  // get flag color
  const flagColor = isFlagMode ? "warning" : "primary";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        mt: 2, // Adjust the margin top as needed to match your layout
      }}
    >
      <IconButton color={flagColor} onClick={toggleFlagMode}>
        <FlagIcon />
      </IconButton>
      <IconButton color="primary" onClick={toggleRevealAllCells}>
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={toggleMinesVisibility} color="error">
        {bomb}
      </IconButton>
    </Box>
  );
}

export default BoardControls;
