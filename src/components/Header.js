import * as React from "react";
import { IconButton, Typography, Box, Toolbar, Button, AppBar } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useTheme } from "@mui/material/styles";
import History from "./History";

export default function Header({
  resetGame,
  level,
  dispatch,
  showHistory,
  gameHistory,
  showNewGameBtn,
}) {
  const theme = useTheme();

  // use dispatch to toggle history
  const toggleShowHistory = (show) => {
    dispatch({ type: "SHOW_HISTORY", payload: show });
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f2f2f2",
          color: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* Logo and Bomb Icon */}
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                color: "#8B0000",
              }}
            >
              Minesweeper
              <img
                src="/images/bomb.png"
                alt="Bomb"
                style={{ width: "100px", height: "auto", marginLeft: "10px" }}
              />
            </Typography>
          </Box>
          {/* New Game button */}
          {showNewGameBtn && (
            <Button
              onClick={resetGame}
              sx={{
                textTransform: "capitalize",
                color: "#233142",
                borderColor: "#233142",
                border: "1px solid",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "0.8rem",
                "&:hover": {
                  bgcolor: "#233142",
                  color: "white",
                },
              }}
            >
              New Game
            </Button>
          )}
          {/* Toggle history */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 3,
              border: "1px solid",
              borderColor: "#556B2F",
              borderRadius: "4px",
            }}
          >
            <IconButton
              onMouseEnter={() => toggleShowHistory(true)}
              onMouseLeave={() => toggleShowHistory(false)}
              sx={{
                "&:hover": { bgcolor: "transparent", color: "green" },
                color: "#556B2F",
              }}
            >
              <HistoryIcon
                sx={{ fontWeight: "bold", fontSize: "1rem", color: "#556B2F" }}
              />

              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                  color: "#556B2F",
                  ml: 1,
                }}
              >
                History
              </Typography>
            </IconButton>
          </Box>

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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
