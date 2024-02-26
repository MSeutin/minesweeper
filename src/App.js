import { useReducer } from "react";
import { Box, Typography, Button } from "@mui/material";
import Board from "./components/Board";
import Header from "./components/Header";
import gameReducer from "./reducers/gameReducer";
import initialState from "./reducers/initialState";
import { levelConfig } from "./config/levelConfig";

function App() {
  // initiate useReducer
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      flexDirection="column"
      sx={{ width: "100vw", height: "100vh", bgcolor: "#f2f2f2" }}
    >
      <Header
        setLevel={(level) => dispatch({ type: "SET_LEVEL", payload: level })}
        level={state.level}
        dispatch={dispatch}
        showHistory={state.showHistory}
      />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "3rem",
        }}
      >
        {state.level === null && (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() =>
                dispatch({ type: "SET_LEVEL", payload: "beginner" })
              }
            >
              Beginner
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() =>
                dispatch({ type: "SET_LEVEL", payload: "intermediate" })
              }
            >
              Intermediate
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => dispatch({ type: "SET_LEVEL", payload: "expert" })}
            >
              Expert
            </Button>
          </>
        )}
        {state.level === "beginner" && (
          <Board
            config={levelConfig["beginner"]}
            dispatch={dispatch}
            board={state.board}
            isFlagMode={state.isFlagMode}
            isFlagged={state.isFlagged}
          />
        )}
        {state.level === "intermediate" && (
          <Board
            config={levelConfig["intermediate"]}
            dispatch={dispatch}
            board={state.board}
            isFlagMode={state.isFlagMode}
            isFlagged={state.isFlagged}
          />
        )}
        {state.level === "expert" && (
          <Board
            config={levelConfig["expert"]}
            dispatch={dispatch}
            board={state.board}
            isFlagMode={state.isFlagMode}
            isFlagged={state.isFlagged}
          />
        )}
      </div>
    </Box>
  );
}

export default App;
