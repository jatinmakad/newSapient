import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEntryFunction,
  GetEntryFunctionId,
  UpdateEntryStatusFunction2,
} from "../../Slice/EntrySlice";
import { Link, useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Loader from "../Common/Loader";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import moment from "moment";
import Image from "../Assets/noresult.webp";
import TableLayout from "../Common/TableLayout/TableLayout";
import CommentDialog from "../Common/CommentDialog";
import { Cities } from "../Common/Constant/Constant";
import { GetUserFunctionCityWithTeam } from "../../Slice/RegisterSlice";
import ToastComponent from "../Common/TaostComponent";
import { UpdateAssignFunction } from "../../Slice/ReportSlice";

const CoordinationTable = ({ open2, setOpen2, page, setPage,open3,setOpen3 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const [selectData, setSelectData] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open4, setOpen4] = React.useState(false);

  const [selectData4, setSelectData4] = React.useState("");
  const [selectData2, setSelectData2] = React.useState("");
  const handleClickOpen2 = (row) => {
    setOpen2(true);
    setSelectData(row);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen4 = (row) => {
    setOpen4(true);
    setSelectData4(row);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClickOpen3 = (row) => {
    setOpen3(true);
    setSelectData2(row);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  return entry && isAuth ? (
    isLoading ? (
      <Loader />
    ) : entry.data && !entry.data.length ? (
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
                <StyledTableCell align="left">
                  {row.insurerCity}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {moment(row.date).format("L")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {/* <StatusColor status={row.status} /> */}
                  {row.insured}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {/* <StatusColor status={row.status} /> */}
                  {row.currentJobStatus}
                </StyledTableCell>
                {admin.user.role === "admin" ? (
                  ""
                ) : (
                  <StyledTableCell align="left">
                    <div className="flex justify-start items-left">
                      {row.currentJobHoldingTeam !== "COORDINATION TEAM" ? (
                        "DONE BY ENTRY TEAM"
                      ) : (
                        <div className="flex justify-around items-center w-full">
                          <Link to={`/entry-details/${row._id}`}>
                            <p className="text-blue-600 cursor-pointer">
                              View Details
                            </p>
                          </Link>

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
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleClickOpen4(row)}
                          >
                            Discrepancy
                          </p> */}
                        </div>
                      )}
                    </div>
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </TableLayout>
        <AssignDialogBox
          open={open2}
          admin={admin}
          handleClose={handleClose2}
          dispatch={dispatch}
          selectData={selectData}
        />
        <CommentDialog
          open={open4}
          handleClose={handleClose4}
          data={selectData4}
          id={admin.user._id}
          dispatch={dispatch}
          handleClickOpen={handleClickOpen4}
        />
         <AssignToSurveyDialogBox
        open={open3}
        selectData={selectData2}
        admin={admin}
        setOpen={setOpen3}
        handleClose={handleClose3}
        dispatch={dispatch}
      />
      </>
    )
  ) : (
    ""
  );
};

export default CoordinationTable;

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
    align: "center",
  },
];

const AssignDialogBox = ({ open, handleClose, selectData, dispatch }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [demo, setDemo] = React.useState("");
  const onSubmit = () => {
    dispatch(UpdateEntryStatusFunction2(selectData, demo));
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
          // value={}
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
      <DialogTitle id="responsive-dialog-title">Assign Surveyour</DialogTitle>
      <DialogContent>
        <div className="flex flex-col justify-start mb-3">
          <p className="text-sm mb-2">City</p>
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
            <p className="text-sm mb-2">Surveyour</p>
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