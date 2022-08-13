import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletEntryFunction,
  GetEntryFunction,
  GetEntryFunctionId,
  UpdateEntryStatusFunction,
} from "../../../Slice/EntrySlice";
import Image from "../../Assets/noresult.webp";
import { Link, useNavigate } from "react-router-dom";
import TableHeaderLayout from "../../Common/TableLayout/TableHeaderLayout";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Loader from "../../Common/Loader";
import moment from "moment";
import DeleteDialog from "../../Common/DeleteDialog";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Header from "../../Common/Header";
import TableLayout from "../../Common/TableLayout/TableLayout";
import { GetUserFunctionCityWithTeam } from "../../../Slice/RegisterSlice";
import { Cities } from "../../Common/Constant/Constant";
import { UpdateAssignFunction } from "../../../Slice/CoordinationSlice";
import ToastComponent from "../../Common/TaostComponent";
const YourWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { deleteSuccess } = useSelector((state) => state.Entry.delete);
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );
  const { updateAssignTaskSuccess } = useSelector(
    (state) => state.Coordination.assignTask
  );
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  // Table Functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    if (isAuth || page || searchInput) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
    }
    if (!isAuth) {
      navigate("/login");
    }
    if (deleteSuccess) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
      setOpen(false);
    }
    if (updateStatusSuccess) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
      setOpen2(false);
    }
    if (updateAssignTaskSuccess) {
      setOpen3(false);
    }
  }, [
    isAuth,
    deleteSuccess,
    updateStatusSuccess,
    updateAssignTaskSuccess,
    page,
    searchInput,
  ]);

  const [id, setId] = React.useState("");
  const [selectData, setSelectData] = React.useState("");
  const [selectData2, setSelectData2] = React.useState("");
  const [selectData4, setSelectData4] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = (row) => {
    setOpen2(true);
    setSelectData(row);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen3 = (row) => {
    setOpen3(true);
    setSelectData2(row);
  };
  const handleClickOpen4 = (row) => {
    setOpen4(true);
    setSelectData4(row);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClickDeleteOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const deleteAction = (id) => {
    dispatch(DeletEntryFunction(id));
  };
  // const changeValue = (row, e) => {
  //   dispatch(UpdateEntryStatusFunction(row, e.target.value));
  // };

  return isAuth && entry.data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Task / Assignment" />
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
                <StyledTableCell align="left">{row.lossCity}</StyledTableCell>
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
                <StyledTableCell align="left">
                  <div className="flex justify-evenly items-center">
                    {row.currentJobHoldingTeam !== "ENTRY TEAM" ? (
                      <>
                        {/* <p>DONE BY ENTRY TEAM</p> */}
                        <Link
                          to={`/entry-details/${row._id}`}
                          state={"yourWork"}
                        >
                          <p className="text-blue-600 flex justify-center w-full cursor-pointer">
                            View More
                          </p>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to={`/update-entry/${row.uniqueJobId}`}>
                          <EditIcon className="text-blue-700 cursor-pointer" />
                        </Link>
                        <DeleteIcon
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleClickDeleteOpen(row.uniqueJobId)}
                        />
                        <p
                          onClick={() => handleClickOpen2(row)}
                          className="text-blue-600 cursor-pointer"
                        >
                          Status
                        </p>
                        <p
                          className="text-blue-600 cursor-pointer"
                          onClick={() => handleClickOpen3(row)}
                        >
                          Assign
                        </p>
                        {/* <p
                          className="text-blue-600 cursor-pointer"
                          onClick={() => handleClickOpen4(row)}
                        >
                          Comment
                        </p> */}
                      </>
                    )}
                  </div>
                </StyledTableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )} */}
          </TableBody>
        </TableLayout>
      )}
      {/* <CommentDialog
        open={open4}
        handleClose={handleClose4}
        data={selectData4}
        dispatch={dispatch}
        handleClickOpen={handleClickOpen4}
      /> */}
      <DeleteDialog
        open={open}
        handleClose={handleClose}
        deleteAction={deleteAction}
        id={id}
        handleClickOpen={handleClickOpen}
      />
      <AssignToSurveyDialogBox
        open={open3}
        selectData={selectData2}
        admin={admin}
        setOpen={setOpen3}
        handleClose={handleClose3}
        dispatch={dispatch}
      />
      <AssignDialogBox
        open={open2}
        admin={admin}
        handleClose={handleClose2}
        dispatch={dispatch}
        selectData={selectData}
      />
    </div>
  ) : null;
};

export default YourWork;

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
    value: "Loss City",
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
    align: "center",
  },
];

const AssignDialogBox = ({ open, handleClose, selectData, dispatch }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [demo, setDemo] = React.useState("");
  const onSubmit = () => {
    dispatch(UpdateEntryStatusFunction(selectData, demo));
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
      <DialogTitle id="responsive-dialog-title">Select Job Status</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          size="small"
          onChange={(e) => setDemo(e.target.value)}
        >
          {data &&
            data.map((r) => {
              return <MenuItem value={r.value}>{r.value}</MenuItem>;
            })}
        </Select>
      </DialogContent>
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

const AssignToSurveyDialogBox = ({
  open,
  dispatch,
  setOpen,
  selectData,
  admin,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [city, setCity] = useState("");
  const [survier, setSurvier] = useState("");
  const onSubmit = () => {
    const taskData = {
      userId: admin.user._id,
      uniqueJobId: selectData.uniqueJobId,
      currentJobHolder: survier,
      // isTaskAssigned: true,
    };
    if (survier) {
      dispatch(UpdateAssignFunction(taskData));
    } else {
      ToastComponent("Please Select Member", "error");
    }
  };
  const handleClose = () => {
    setOpen(false);
    setCity("");
  };
  const { data } = useSelector((state) => state.Register.get.users);

  useEffect(() => {
    if (city) {
      dispatch(GetUserFunctionCityWithTeam(city, "SURVEYOUR TEAM"));
    }
  }, [city]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      size={"lg"}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Select Surveyour</DialogTitle>
      <DialogContent>
        <div className="flex flex-col justify-start mb-3">
          <p className="text-sm mb-2">Select City</p>
          <Autocomplete
            value={city}
            fullWidth
            onChange={(event, newValue) => {
              setCity(newValue);
            }}
            size="small"
            options={Cities}
            renderInput={(params) => (
              <TextField
                size="small"
                fullWidth
                placeholder="City"
                {...params}
              />
            )}
          />
        </div>
        {city ? (
          <div className="flex flex-col justify-start">
            <p className="text-sm mb-2">Select Survery</p>
            <Select
              fullWidth
              size="small"
              onChange={(e) => setSurvier(e.target.value)}
              value={survier}
              style={{ background: "white" }}
            >
              {data &&
                data.map((r) => {
                  return (
                    <MenuItem key={r.name} value={r._id}>
                      {r.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        ) : (
          ""
        )}
      </DialogContent>
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

const data = [
  {
    value: "OPEN",
  },
  {
    value: "OPEN-FOR-NEXT-TEAM",
  },
  {
    value: "IN-PROGRESS",
  },
];
