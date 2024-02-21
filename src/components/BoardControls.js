import React from "react";
import { Box, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const bomb = "\u{1F4A3}";

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
      <IconButton onClick={onShowMines} color="primary">
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={onRevealBoard} color="error">
        {bomb}
      </IconButton>
    </Box>
  );
}

export default BoardControls;
