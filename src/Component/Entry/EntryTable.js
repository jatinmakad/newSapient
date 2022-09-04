import React, { useEffect, useRef } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Common/Loader";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { DeletEntryFunction, GetEntryFunction } from "../../Slice/EntrySlice";
import Image from "../Assets/noresult.webp";
import TableLayout from "../Common/TableLayout/TableLayout";
export default function EntryTable({
  searchInput,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { deleteSuccess } = useSelector((state) => state.Entry.delete);

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (deleteSuccess) {
      dispatch(GetEntryFunction());
      setOpen(false);
    }
  }, [isAuth, deleteSuccess]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDeleteOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const deleteAction = (id) => {
    dispatch(DeletEntryFunction(id));
  };

  return isLoading ? (
    <Loader />
  ) : entry.data && entry.data.length === 0 ? (
    <div className="w-full flex justify-center items-center">
      <img src={Image} className="w-1/2" />
    </div>
  ) : (
    <>
      <TableLayout
        headerCell={headerCell}
        data={entry.total}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      >
        <TableBody>
          {(entry.data && entry.data).map((row, index) => (
            <TableRow sx={{ border: "none" }}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.reportRefrenceNo}
              </StyledTableCell>
              <StyledTableCell align="left">{row.insurerCity}</StyledTableCell>
              <StyledTableCell align="left">
                {moment(row.date).format("L")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {/* <StatusColor status={row.status} /> */}
                {row.insured}
              </StyledTableCell>

              <StyledTableCell align="left">
                <div className="flex justify-evenly items-center">
                  {admin.user.role === "ADMIN" ? (
                    <>
                      <Link to={`/update-entry/${row.uniqueJobId}`}>
                        <EditIcon className="text-blue-700 cursor-pointer" />
                      </Link>
                      <DeleteIcon
                        className="text-red-700 cursor-pointer"
                        onClick={() =>
                          handleClickDeleteOpen(row.reportRefrenceNo)
                        }
                      />
                    </>
                  ) : (
                    ""
                  )}
                  <Link to={`/entry-details/${row._id}`}>
                    <p className="text-blue-600 flex justify-center w-full cursor-pointer">
                      View More
                    </p>
                  </Link>
                </div>
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
    </>
  );
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
  {
    value: "Insurer",
    align: "left",
  },
  {
    value: "Action",
    align: "center",
  },
];
