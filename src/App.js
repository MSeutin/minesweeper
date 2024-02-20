import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  const [level, setLevel] = useState(null);
  const levelConfig = {
    beginner: { rows: 8, columns: 8, mines: 10 },
    intermediate: { rows: 16, columns: 16, mines: 40 },
    expert: { rows: 16, columns: 30, mines: 99 },
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      flexDirection="column"
      sx={{ width: "100vw", height: "100vh", bgcolor: "#f2f2f2" }}
    >
      <Header setLevel={setLevel} />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "3rem",
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
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setLevel("expert")}
            >
              Expert
            </Button>
          </>
        )}
        {level === "beginner" && <Board config={levelConfig["beginner"]} />}
        {level === "intermediate" && (
          <Board config={levelConfig["intermediate"]} />
        )}
        {level === "expert" && <Board config={levelConfig["expert"]} />}
      </div>
    </Box>
  );
}

export default App;
