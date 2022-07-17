import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
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
                <TableCell
                  align={r.align}
                  sx={{
                    color: "gray",
                    borderBottom: "0.5px solid lightgray",
                  }}
                >
                  {r.value}
                </TableCell>
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
