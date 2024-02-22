import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(level, time, result) {
  return { level, time, result };
}

const rows = [
  createData("beginner", 159, "win"),
  createData("Intermediate", 237, "loss"),
  createData("Expert", 262, "win"),
  createData("beginner", 305, "loss"),
  createData("Intermediate", 356, "win"),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} sx={{ fontWeight: "bold" }}>
              Game History
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Level </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Time </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>{row.level}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
