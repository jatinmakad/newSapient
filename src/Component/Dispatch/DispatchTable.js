import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateEntryStatusFunction5 } from "../../Slice/EntrySlice";
import { Link, useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import * as Yup from "yup";
import { Grid, Button, TextField, Autocomplete } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Loader from "../Common/Loader";
import { MenuItem, Select } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import FomikTextField from "../Common/FormikComponent/FomikTextField";
import { Form, Formik } from "formik";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import Image from "../Assets/noresult.webp";
import TableLayout from "../Common/TableLayout/TableLayout";
import CommentDialog from "../Common/CommentDialog";
import { DispatchDeitlasFunction, UpdateAssignFunction } from "../../Slice/ReportSlice";
const DispatchTable = ({
  searchInput,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );
  const { updateAssignTaskSuccess } = useSelector(
    (state) => state.Report.assignTask
  );
  const [open2, setOpen2] = React.useState(false);
  const [selectData, setSelectData] = React.useState("");

  const [openDetails, setOpenDetails] = React.useState(false);
  const [selectDataDetails, setSelectDataDetails] = React.useState("");
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (updateStatusSuccess) {
      // dispatch(GetEntryFunctionId(admin.user._id));
      setOpen2(false);
    }
    if (updateAssignTaskSuccess) {
      setOpenDetails(false);
    }
  }, [isAuth, updateStatusSuccess, updateAssignTaskSuccess]);

  const [open4, setOpen4] = React.useState(false);
  const [selectData4, setSelectData4] = React.useState("");
  const handleClickOpen4 = (row) => {
    setOpen4(true);
    setSelectData4(row);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClickOpen2 = (row) => {
    setOpen2(true);
    setSelectData(row);
  };
  const handleClickOpenDetails = (row) => {
    setOpenDetails(true);
    setSelectDataDetails(row);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return isAuth && entry.data ? (
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
            {(entry.data && entry.data).map(
              (row, index) => (
                console.log(row, "row"),
                (
                  <TableRow sx={{ border: "none" }}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.reportRefrenceNo}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">{row.city}</StyledTableCell> */}
                    <StyledTableCell align="left">
                      {moment(row.date).format("L")}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {row.finalScannedReport ? (
                        <a
                          href={row.finalScannedReport}
                          target={"_blank"}
                          className="text-blue-800 cursor-pointer"
                        >
                          Download
                        </a>
                      ) : (
                        <p>---</p>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="flex justify-start items-left">
                        {row.currentJobHoldingTeam !== "DISPATCH TEAM" ? (
                          "DONE BY ACOUNT TEAM"
                        ) : (
                          <>
                            {row.currentJobHoldingTeam == "ACCOUNT TEAM" ? (
                              ""
                            ) : (
                              <p
                                onClick={() => handleClickOpenDetails(row)}
                                className="text-blue-600 cursor-pointer mr-2"
                              >
                                Courier Details
                              </p>
                            )}

                            <Link to={`/entry-details/${row._id}`}>
                              <p className="text-blue-600 flex justify-center w-full cursor-pointer">
                                View More
                              </p>
                            </Link>
                          </>
                        )}
                      </div>
                    </StyledTableCell>
                  </TableRow>
                )
              )
            )}
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
          dispatch={dispatch}
          handleClickOpen={handleClickOpen4}
        />
        <DetailDialogBox
          open={openDetails}
          handleClose={handleCloseDetails}
          dispatch={dispatch}
          admin={admin}
          selectData={selectDataDetails}
        />
      </>
    )
  ) : (
    <Loader />
  );
};

export default DispatchTable;

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
    value: "Date",
    align: "left",
  },
  {
    value: "Final Report",
    align: "left",
  },
  {
    value: "Action",
    align: "left",
  },
];

const AssignDialogBox = ({ open, handleClose, selectData, dispatch }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [demo, setDemo] = React.useState("");
  const onSubmit = () => {
    dispatch(UpdateEntryStatusFunction5(selectData, demo));
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

const DetailDialogBox = ({ open, handleClose, selectData, dispatch,admin }) => {
  // console.log(selectData,"==========")
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const validationSchema = Yup.object({
    trackId: Yup.number().required("Required"),
    dateOfDispatch: Yup.string().required("Required"),
    dateOfRecieve: Yup.string().required("Required"),
    courierServiceName: Yup.string().required("Required"),
    courierServiceUrl: Yup.string().required("Required"),
  });
  const initialValues = {
    trackId: "",
    dateOfDispatch: new Date(),
    dateOfRecieve: new Date(),
    courierServiceName: "",
    courierServiceUrl: "",
  };
  const onSubmitFormik = (values) => {
    dispatch(
      DispatchDeitlasFunction({
        ...values,
        uniqueJobId: selectData.uniqueJobId,
      })
    );
    dispatch(UpdateEntryStatusFunction5(selectData, "OPEN-FOR-NEXT-TEAM"));
    const taskData = {
      userId: admin.user._id,
      uniqueJobId: selectData.uniqueJobId,
      currentJobHolder: selectData.accountHandledBy
    };
      dispatch(UpdateAssignFunction(taskData));
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth={"lg"}
      fullWidth
      size={"lg"}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Courier Details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitFormik}
        >
          {({ errors, handleChange, values, touched, setFieldValue }) => (
            <Form className=" rounded-sm p-4 pt-5 pb-5">
              <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Track ID"
                    handleChange={handleChange}
                    name="trackId"
                    type="text"
                    error={touched.trackId && Boolean(errors.trackId)}
                    helperText={touched.trackId ? errors.trackId : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Courier Service Name"
                    handleChange={handleChange}
                    name="courierServiceName"
                    type="text"
                    error={
                      touched.courierServiceName &&
                      Boolean(errors.courierServiceName)
                    }
                    helperText={
                      touched.courierServiceName
                        ? errors.courierServiceName
                        : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Courier Service Url"
                    handleChange={handleChange}
                    name="courierServiceUrl"
                    type="text"
                    error={
                      touched.courierServiceUrl &&
                      Boolean(errors.courierServiceUrl)
                    }
                    helperText={
                      touched.courierServiceUrl ? errors.courierServiceUrl : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Date of Dispatch</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("dateOfDispatch", e)}
                        value={values.dateOfDispatch}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            sx={{ background: "#fff" }}
                            error={
                              touched.dateOfDispatch &&
                              Boolean(errors.dateOfDispatch)
                            }
                            helperText={
                              touched.dateOfDispatch
                                ? errors.dateOfDispatch
                                : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Date of Recieve</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("dateOfRecieve", e)}
                        value={values.dateOfRecieve}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            sx={{ background: "#fff" }}
                            error={
                              touched.dateOfRecieve &&
                              Boolean(errors.dateOfRecieve)
                            }
                            helperText={
                              touched.dateOfRecieve ? errors.dateOfRecieve : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>

                <Grid
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  justifyContent="flex-end"
                  display="flex"
                  item
                >
                  <Button
                    variant="contained"
                    // onClick={onSubmitFormik}
                    type="submit"
                    color="info"
                    sx={{ marginRight: "10px" }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    color="error"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
