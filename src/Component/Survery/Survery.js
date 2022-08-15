import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletEntryFunction,
  GetEntryFunction,
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
import { UpdateAssignFunction } from "../../Slice/ReportSlice";
import axios from "axios";
import { Engineering, Fire, Marine } from "../Common/Constant/Constant";
import ToastComponent from "../Common/TaostComponent";
const Survery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { updateAssignTaskSuccess } = useSelector(
    (state) => state.Report.assignTask
  );
  const [searchInput, setSearchInput] = React.useState("");
  // Table Functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (isAuth || page || searchInput || updateAssignTaskSuccess) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
    }
    if (!isAuth) {
      navigate("/login");
    }
    if (updateAssignTaskSuccess) {
      setOpen(false);
      // dispatch(GetEntryFunctionId(admin.user._id));
    }
  }, [isAuth, updateAssignTaskSuccess, page, searchInput]);
  const [updatedData, setData] = useState("");

  const [selectData, setSelectData] = React.useState("");
  const handleClickOpen = async (row) => {
    setSelectData(row);
    const { data } = await axios.get(
      `https://sap-data-management-mcs.herokuapp.com/get-jobs-by-id?uniqueJobId=${selectData.uniqueJobId}`
    );
    if (data.success === true) {
      let rowUploaded =
        row.claimType === "Engineering"
          ? Engineering
          : row.claimType === "Fire"
          ? Fire
          : row.claimType === "Marine"
          ? Marine
          : "";
      let updatedArray = rowUploaded.map((x) => {
        const item = data.data[0].documents.find((r) => r.name === x.name);
        return item ? { ...x, ...item, uploaded: true } : x;
      });
      setOpen(true);
      setData(updatedArray);
    }
  };

  return isAuth && entry.data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Survey" />
      <TableHeaderLayout
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {isLoading ? (
        <Loader />
      ) : entry.data && !entry.data.length ? (
        <div className="w-full flex justify-center items-center">
          <img src={Image} className="w-1/2" />
        </div>
      ) : (
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
                <StyledTableCell align="left">
                  {row.insurerCity}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {moment(row.date).format("L")}
                </StyledTableCell>
                <StyledTableCell align="left">{row.insured}</StyledTableCell>
                <StyledTableCell align="left">
                  <p
                    className="text-blue-700 cursor-pointer"
                    onClick={() => handleClickOpen(row)}
                  >
                    Mark Done
                  </p>
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{ display: "flex", alignItems: "center" }}
                >
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
          <AssignToSurveyDialogBox
            open={open}
            setOpen={setOpen}
            selectData={selectData}
            admin={admin}
            dispatch={dispatch}
            updatedData={updatedData}
          />
        </TableLayout>
      )}
    </div>
  ) : null;
};

export default Survery;

const AssignToSurveyDialogBox = ({
  open,
  dispatch,
  setOpen,
  selectData,
  admin,
  updatedData,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onSubmit = () => {
    const taskData = {
      userId: admin.user._id,
      uniqueJobId: selectData.uniqueJobId,
      currentJobHolder: selectData.entryHandledBy,
    };
    let condition = updatedData.every((r) => r.uploaded === true);
    if (condition) {
      dispatch(UpdateAssignFunction(taskData));
    } else {
      ToastComponent("Please Upload All Documents", "error");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      size={"lg"}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Mark Done</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit} color="info">
          Submit
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
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
    value: "Status",
    align: "left",
  },
  {
    value: "Action",
    align: "left",
  },
];
