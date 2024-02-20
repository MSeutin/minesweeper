import React from "react";
import { Box, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function BoardControls({ onPlaceFlag, onShowMines, onRevealBoard }) {
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
      <IconButton onClick={onPlaceFlag} color="primary">
        <FlagIcon />
      </IconButton>
      <IconButton onClick={onShowMines} color="secondary">
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={onRevealBoard} color="error">
        <HighlightOffIcon />
      </IconButton>
    </Box>
  );
}

export default BoardControls;
