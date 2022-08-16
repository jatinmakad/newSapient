import { Grid } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import moment from "moment";
import { styled } from "@mui/material/styles";
const DashBoardCommon = ({ heading, array, heading2, url, array2 }) => {
  return (
    <Grid container spacing={2} lg={12} md={12} sm={12} xs={12}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <div className="flex flex-col justify-center shadow-md bg-white">
          <p className="border-b-2 p-3 text-lg font-medium">{heading}</p>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="a dense table"
              sx={{ border: "none", maxWidth: 700 }}
            >
              <TableHead>
                <StyledTableCell
                  align={"left"}
                  // sx={{
                  //   color: "gray",
                  //   borderBottom: "0.5px solid lightgray",
                  // }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  align={"left"}
                  // sx={{
                  //   color: "gray",
                  //   borderBottom: "0.5px solid lightgray",
                  // }}
                >
                  Email
                </StyledTableCell>
              </TableHead>
              <TableBody sx={{ border: "none" }}>
                {array.slice(0, 6).map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
      {array2 ? (
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className="flex flex-col justify-center shadow-md bg-white">
            <div className="flex justify-between p-3 items-center">
              {" "}
              <p className="text-lg font-medium">{heading2}</p>
              <Link to={url}>
                <span
                  style={{ color: "#03C9D7" }}
                  className="cursor-pointer font-medium"
                >
                  View all
                </span>
              </Link>
            </div>

            <TableContainer component={Paper}>
              <Table
                size="small"
                aria-label="a dense table"
                sx={{ border: "none", maxWidth: 700 }}
              >
                <TableHead>
                  {headerCell.map((r) => {
                    return (
                      <StyledTableCell
                        align={"left"}
                        sx={{
                          color: "gray",
                          borderBottom: "0.5px solid lightgray",
                        }}
                      >
                        {r.value}
                      </StyledTableCell>
                    );
                  })}
                </TableHead>
                <TableBody sx={{ border: "none" }}>
                  {array2.length > 0 ? (
                    array2.slice(0, 6).map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell align="left">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.reportRefrenceNo}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.insurerCity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.date ? moment(row.date).format("LL") : "--"}
                        </StyledTableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        No Record Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <div className="w-full flex justify-center items-center p-2">
              <Link to={url}>
                <span className="text-blue-800 cursor-pointer font-medium">
                  View all
                </span>
              </Link>
            </div> */}
          </div>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#03C9D7",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "black",
  },
}));
export default DashBoardCommon;

const headerCell = [
  {
    value: "Sr no.",
    align: "left",
  },
  {
    value: "Reference No.",
    align: "left",
  },
  {
    value: "City",
    align: "left",
  },
  {
    value: "Date",
    align: "left",
  },
  // {
  //   value: Insurer,
  //   align: "left",
  // },
];
