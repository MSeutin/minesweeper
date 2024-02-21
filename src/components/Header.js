import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export default function Header({ setLevel }) {
    const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f2f2f2", color: theme.palette.primary.main }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Minesweeper
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setLevel(null)}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
