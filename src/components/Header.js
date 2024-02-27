import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HistoryIcon from "@mui/icons-material/History";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import History from "./History";

export default function Header({ resetGame, level, dispatch, showHistory, gameHistory }) {
    const theme = useTheme();
    
    // use dispatch to toggle history
    const toggleShowHistory = (show) => {
        dispatch({ type: "SHOW_HISTORY", payload: show });
        }

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f2f2f2", color: theme.palette.primary.main }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Minesweeper
          </Typography>
          {/* Toggle history */}
          {level && (
            <IconButton
              color="primary"
              onMouseEnter={() => toggleShowHistory(true)}
              onMouseLeave={() => toggleShowHistory(false)}
              sx={{ mr: 2 }}
            >
              <HistoryIcon />
            </IconButton>
          )}

          {showHistory && (
            <Box
              sx={{
                position: "absolute",
                top: "100%", // Display below the icon
                right: 0,
                backgroundColor: "white",
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                p: 2,
                mt: 1,
                borderRadius: "4px",
                zIndex: 1, // Ensure it's above other content
              }}
            >
              <History showHistory={showHistory} gameHistory={gameHistory} />
            </Box>
          )}
          {/* Reset button */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={resetGame}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
