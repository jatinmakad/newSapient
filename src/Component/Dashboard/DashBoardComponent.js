import { Grid } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const DashBoardComponent = ({ heading }) => {
  return (
    <Grid item lg={4} md={6} sm={12} xs={12}>
      <div className="flex flex-col justify-center shadow-md bg-white rounded-lg">
        <p className="border-b-2 p-3 text-lg font-medium">{heading}</p>
        <TableContainer component={Paper} style={{ padding: "3px" }}>
          <Table
            size="small"
            aria-label="a dense table"
            sx={{ border: "none" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Fat&nbsp;(g)</TableCell>
                <TableCell align="left">Carbs&nbsp;(g)</TableCell>
                <TableCell align="left">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.fat}</TableCell>
                  <TableCell align="left">{row.carbs}</TableCell>
                  <TableCell align="left">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-full flex justify-center items-center p-2">
          <span className="text-blue-800 cursor-pointer font-medium">
            View all
          </span>
        </div>
      </div>
    </Grid>
  );
};

export default DashBoardComponent;
