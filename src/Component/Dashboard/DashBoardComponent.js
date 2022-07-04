import { Grid } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const DashBoardComponent = ({ heading, array, url }) => {
  return (
    <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                {/* <TableCell align="left">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {array.slice(0, 5).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  {/* <TableCell align="left">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-full flex justify-center items-center p-2">
          <Link to={url}>
            <span className="text-blue-800 cursor-pointer font-medium">
              View all
            </span>
          </Link>
        </div>
      </div>
    </Grid>
  );
};

export default DashBoardComponent;
