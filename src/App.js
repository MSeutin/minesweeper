import { useReducer } from "react";
import { Box, Button } from "@mui/material";
import Board from "./components/Board";
import Header from "./components/Header";
import gameReducer from "./reducers/gameReducer";
import initialState from "./reducers/initialState";
import { levelConfig } from "./config/levelConfig";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  // initiate useReducer
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const matches = useMediaQuery("(min-width:600px)");

  // reset game
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const bgColor = state.gameStatus !== "playing" ? "#303030" : "#f2f2f2";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      flexDirection="column"
      sx={{ width: "100vw", height: "100vh", bgcolor: bgColor }}
    >
      <Header
        resetGame={resetGame}
        level={state.level}
        dispatch={dispatch}
        showHistory={state.showHistory}
        gameHistory={state.gameHistory}
        showNewGameBtn={state.showNewGameBtn}
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
            {matches && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() =>
                  dispatch({ type: "SET_LEVEL", payload: "expert" })
                }
              >
                Expert
              </Button>
            )}
          </>
        )}

        {state.level === "beginner" && (
          <Board
            config={levelConfig["beginner"]}
            dispatch={dispatch}
            state={state}
          />
        )}
        {state.level === "intermediate" && (
          <Board
            config={levelConfig["intermediate"]}
            dispatch={dispatch}
            state={state}
          />
        )}
        {state.level === "expert" && (
          <Board
            config={levelConfig["expert"]}
            dispatch={dispatch}
            state={state}
          />
        )}
      </div>
    </Box>
  );
}

export default App;
