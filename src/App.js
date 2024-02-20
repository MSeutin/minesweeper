import { useState, useEffect } from "react";
import Home from "./components/Home";
import { Box, Typography, Button } from "@mui/material";
import BeginnerGrid from "./components/beginner/BeginnerGrid";
import IntermediateGrid from "./components/intermediate/IntermediateGrid";

function App() {
  const [level, setLevel] = useState(null);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="column"
      sx={{ width: "100vw", height: "100vh", bgcolor: "#f2f2f2" }}
    >
      <Typography
        variant="h2"
        color="primary"
        sx={{ alignSelf: "flex-start", marginLeft: "3rem", marginTop: "1rem"}}
      >
        Minesweeper
      </Typography>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5rem",
        }}
      >
        {level === null && (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setLevel("beginner")}
            >
              Beginner
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setLevel("intermediate")}
            >
              Intermediate
            </Button>
          </>
        )}
        {level === "beginner" && <BeginnerGrid />}
        {level === "intermediate" && <IntermediateGrid />}  
      </div>
    </Box>
  );
}

export default App;
