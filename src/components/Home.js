import BeginnerGrid from "./beginner/BeginnerGrid"
import IntermediateGrid from "./intermediate/IntermediateGrid"
import Button from "@mui/material/Button"

function Home() {
    return (
      <>
            <h1>Minesweeper</h1>
            <h2>Choose a difficulty</h2>
            <Button variant="contained" color="primary" href="/beginner">
                <BeginnerGrid />
            </Button>
            <Button variant="contained" color="primary" href="/intermediate">
                <IntermediateGrid />
            </Button>
      </>
      
  )
}
export default Home