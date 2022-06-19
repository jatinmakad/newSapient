import React, { useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Common/Loader";
import { useNavigate } from "react-router-dom";
import Image from "../Assets/noresult.webp";
import TableLayout from "../Common/TableLayout/TableLayout";

export default function UserTable({ searchInput }) {
  const { data } = useSelector((state) => state.Register.get.users);
  const { isLoading } = useSelector((state) => state.Register.get);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.Login);
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);

  // Table Layout Functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return isAuth ? (
    isLoading ? (
      <Loader />
    ) : data && data.length === 0 ? (
      <div className="w-full flex justify-center items-center">
        <img src={Image} className="w-1/2" />
      </div>
    ) : (
      <TableLayout
        headerCell={headerCell}
        data={data}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      >
        <TableBody>
          {(
            data &&
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ).map((row, index) => (
            <TableRow sx={{ border: "none" }}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.role}</StyledTableCell>
              <StyledTableCell align="left">
                {/* <StatusColor status={row.status} /> */}
                {row.contactNumber}
              </StyledTableCell>
              {/* <StyledTableCell align="left">
                <div className="flex justify-evenly items-center">
                  <EditIcon className="text-blue-700 cursor-pointer" />
                  <DeleteIcon className="text-red-700 cursor-pointer" />
                </div>
              </StyledTableCell> */}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </TableLayout>
    )
  ) : null;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "black",
  },
}));

const headerCell = [
  {
    value: "Sr no.",
    align: "left",
  },
  {
    value: "Name",
    align: "left",
  },
  {
    value: "Email",
    align: "left",
  },
  {
    value: "Role",
    align: "left",
  },
  {
    value: "Contact Number",
    align: "left",
  },
  // {
  //   value: "Action",
  //   align: "center",
  // },
];
