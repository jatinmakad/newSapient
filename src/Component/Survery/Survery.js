import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletEntryFunction,
  GetEntryFunctionId,
  UpdateEntryStatusFunction,
} from "../../Slice/EntrySlice";
import Image from "../Assets/noresult.webp";
import { Link, useNavigate } from "react-router-dom";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Loader from "../Common/Loader";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Header from "../Common/Header";
import TableLayout from "../Common/TableLayout/TableLayout";
const Survery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunctionId(admin.user._id));
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  // const changeValue = (row, e) => {
  //   dispatch(UpdateEntryStatusFunction(row, e.target.value));
  // };
  const [searchInput, setSearchInput] = React.useState("");

  // Table Functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - entry.data.length) : 0;

  return isAuth && entry.data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Survey" />
      <TableHeaderLayout setSearchInput={setSearchInput} />
      {isLoading ? (
        <Loader />
      ) : entry.data && !entry.data.length ? (
        <div className="w-full flex justify-center items-center">
          <img src={Image} className="w-1/2" />
        </div>
      ) : (
        <TableLayout
          headerCell={headerCell}
          data={entry.data}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          <TableBody>
            {(
              entry.data &&
              entry.data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            ).map((row, index) => (
              <TableRow sx={{ border: "none" }}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.reportRefrenceNo}
                </StyledTableCell>
                <StyledTableCell align="left">{row.city}</StyledTableCell>
                <StyledTableCell align="left">
                  {moment(row.date).format("L")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {/* <StatusColor status={row.status} /> */}
                  {row.insured}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.currentJobStatus}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {/* <Link to={`/survery-update/${row._id}`}>
                    <EditIcon className="text-blue-700 cursor-pointer mr-3" />
                  </Link> */}
                  <Link
                    to={`/upload-document/${row.uniqueJobId}/${row.claimType}`}
                  >
                    <p className="text-blue-700 cursor-pointer">
                      Upload Document
                    </p>
                  </Link>
                </StyledTableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </TableLayout>
      )}
    </div>
  ) : null;
};

export default Survery;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "black",
    fontWeight: "500",
  },
}));

const headerCell = [
  {
    value: "Sr no.",
    align: "left",
  },
  {
    value: "Refrence No.",
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
  {
    value: "Insure",
    align: "left",
  },
  {
    value: "Status",
    align: "left",
  },
  {
    value: "Action",
    align: "left",
  },
];
