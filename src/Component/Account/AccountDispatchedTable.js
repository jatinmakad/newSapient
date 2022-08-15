import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEntryFunction,
  GetEntryFunctionId,
  UpdateEntryStatusFunction2,
  UpdateEntryStatusFunction3,
  UpdateEntryStatusFunction4,
} from "../../Slice/EntrySlice";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Loader from "../Common/Loader";
import { MenuItem, Select } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import moment from "moment";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageOutlined from "@mui/icons-material/LastPageOutlined";
import Image from "../Assets/noresult.webp";
import TableLayout from "../Common/TableLayout/TableLayout";
import CommentDialog from "../Common/CommentDialog";
import ToastComponent from "../Common/TaostComponent";
import axios from "axios";
const AccountDispatchedTable = ({
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
  const [open2, setOpen2] = React.useState(false);
  const [selectData, setSelectData] = React.useState("");

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (updateStatusSuccess) {
      // dispatch(GetEntryFunctionId(admin.user._id));
      setOpen2(false);
    }
  }, [isAuth, updateStatusSuccess]);

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
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [document, setDocument] = React.useState("");

  const handleSubmitFile = (row) => {
    if (!document) return;
    const reader = new FileReader();
    reader.readAsDataURL(document);
    reader.onloadend = () => {
      uploadImage(reader.result, row.uniqueJobId);
    };
  };
  const uploadImage = async (base64EncodedImage, id) => {
    let body = JSON.stringify({
      data: base64EncodedImage,
      uniqueJobId: id,
    });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "https://sap-data-management-mcs.herokuapp.com/upload-final-documents",
      body,
      config
    );
    if (data.success === true) {
      dispatch(GetEntryFunction(page, "", searchInput, admin.user._id));
      ToastComponent("Document Uploaded SuccessFully", "success");
    }
  };
  let updated =
    entry.data &&
    entry.data.filter(
      (r) =>
        r.dispatch.trackId !== "" &&
        r.dispatch.courierServiceName !== "" &&
        r.dispatch.courierServiceUrl !== ""
    );
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
          data={updated.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          <TableBody>
            {(updated && updated).map((row, index) => (
              <TableRow sx={{ border: "none" }}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.reportRefrenceNo}
                </StyledTableCell>
                <StyledTableCell align="left">{row.insured}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.reportDocument !== "" ? (
                    <a
                      href={row.reportDocument}
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
                  {row.finalScannedReport == "" ? (
                    <>
                      <input
                        name="userfile"
                        accept=".pdf"
                        type="file"
                        onChange={(e) => setDocument(e.target.files[0])}
                      />
                      <Button onClick={() => handleSubmitFile(row)}>
                        upload
                      </Button>
                    </>
                  ) : (
                    "Uploaded"
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className="flex justify-start items-left">
                    {row.currentJobHoldingTeam !== "ACCOUNT TEAM" ? (
                      "DONE BY REPORT TEAM"
                    ) : (
                      <>
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
          dispatch={dispatch}
          handleClickOpen={handleClickOpen4}
        />
      </>
    )
  ) : (
    <Loader />
  );
};

export default AccountDispatchedTable;

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
    value: "Insurer",
    align: "left",
  },
  {
    value: "Download Report",
    align: "left",
  },
  {
    value: "Upload",
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
    dispatch(UpdateEntryStatusFunction4(selectData, demo));
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
        <div className="flex flex-col justify-start mb-3">
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
        </div>
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
