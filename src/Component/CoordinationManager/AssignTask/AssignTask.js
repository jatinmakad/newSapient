import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEntryDoneFunction,
  GetEntryFunction,
} from "../../../Slice/EntrySlice";
import { useNavigate } from "react-router-dom";
import TableHeaderLayout from "../../Common/TableLayout/TableHeaderLayout";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Loader from "../../Common/Loader";
import moment from "moment";
import { MenuItem, Select } from "@mui/material";
import { GetUserFunction } from "../../../Slice/RegisterSlice";
import { UpdateAssignFunction } from "../../../Slice/CoordinationSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ToastComponent from "../../Common/TaostComponent";
import Header from "../../Common/Header";
import Image from "../../Assets/noresult.webp";
import TableLayout from "../../Common/TableLayout/TableLayout";
const AssignTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { data } = useSelector((state) => state.Register.get.users);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { updateAssignTaskSuccess } = useSelector(
    (state) => state.Coordination.assignTask
  );
  const [open, setOpen] = React.useState(false);
  const [selectData, setSelectData] = useState("");

  // Table Function
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (isAuth) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, admin.user.team));
      dispatch(GetUserFunction("", "", "COORDINATION TEAM"));
    }
    if (page) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, admin.user.team));
    }
    if (isAuth === false) {
      navigate("/login");
    }
    if (updateAssignTaskSuccess) {
      setOpen(false);
    }
  }, [isAuth, updateAssignTaskSuccess, page]);
  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectData(row);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectData("");
  };
  const [searchInput, setSearchInput] = React.useState("");
  let updated =
    data &&
    data.filter((r) => {
      return r.role === "COORDINATION TEAM EMPLOYEE";
    });

  console.log(data, "entry");
  return isAuth && entry.data ? (
    <div className="m-2 md:m-10  mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Assign Task" />
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
                {row.isTaskAssigned ? (
                  <StyledTableCell align="center">Assigned</StyledTableCell>
                ) : (
                  <StyledTableCell
                    align="center"
                    onClick={() => handleClickOpen(row)}
                  >
                    <p className="text-blue-600 flex justify-center w-full cursor-pointer">
                      Assign Here
                    </p>
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
          <AssignDialogBox
            open={open}
            admin={admin}
            handleClose={handleClose}
            data={selectData}
            updated={updated}
            dispatch={dispatch}
          />
        </TableLayout>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default AssignTask;

const AssignDialogBox = ({
  open,
  handleClose,
  data,
  updated,
  admin,
  dispatch,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [demo, setDemo] = useState("");
  const onSubmit = () => {
    const taskData = {
      userId: admin.user._id,
      uniqueJobId: data.uniqueJobId,
      currentJobHolder: demo._id,
      // isTaskAssigned: true,
    };
    if (demo._id) {
      dispatch(UpdateAssignFunction(taskData));
    } else {
      ToastComponent("Please Select Member", "error");
    }
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
      <DialogTitle id="responsive-dialog-title">Select Team Member</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          size="small"
          onChange={(e) => setDemo(e.target.value)}
        >
          {updated &&
            updated.map((r) => {
              return <MenuItem value={r}>{r.name}</MenuItem>;
            })}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit} color="info">
          Assgin
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
    value: "Assign To",
    align: "center",
  },
];
