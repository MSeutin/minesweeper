import React from "react";
import { Box, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const bomb = "\u{1F4A3}";

function BoardControls({ dispatch }) {
  // Toggle function to show/hide mines
  const toggleMinesVisibility = () => {
    dispatch({ type: "SHOW_MINES"}); 
  };
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
      <IconButton color="primary">
        <FlagIcon />
      </IconButton>
      <IconButton color="primary">
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={toggleMinesVisibility} color="error">
        {bomb}
      </IconButton>
    </Box>
  );
}

export default BoardControls;
