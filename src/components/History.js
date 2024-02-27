import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function History({ showHistory, gameHistory }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} sx={{ fontWeight: "bold" }}>
              Last 10 Games History
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Level </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Time </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameHistory.length > 0 && gameHistory.map((obj, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>{obj.gameSize}</TableCell>
              <TableCell>{obj.gameDuration}</TableCell>
              <TableCell>{obj.gameOutcome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
