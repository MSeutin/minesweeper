import BeginnerGrid from "./beginner/BeginnerGrid"
import IntermediateGrid from "./intermediate/IntermediateGrid"
import { Button, Box } from "@mui/material"

function Home() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
        sx={{ width: "100%", height: "100%", bgcolor: "lightblue" }}
      >
        <h1>Minesweeper</h1>
        <Box display="flex" gap={4}>
          <Button variant="contained" color="primary" href="/beginner">
            <BeginnerGrid />
          </Button>
          <Button variant="contained" color="primary" href="/intermediate">
            <IntermediateGrid />
          </Button>
        </Box>
      </Box>
    );
}
export default Home