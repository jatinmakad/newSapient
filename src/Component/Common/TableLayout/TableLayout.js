import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";

export default function TableLayout({
  headerCell,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  data,
  children,
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {headerCell.map((r) => {
              return (
                <StyledTableCell
                  align={r.align}
                  // sx={{
                  //   color: "gray",
                  //   borderBottom: "0.5px solid lightgray",
                  // }}
                >
                  {r.value}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {children}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={""}
              colSpan={9}
              count={data}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
