import React, { useEffect } from "react";
import BasicLayout from "../../BasicLayout/BasicLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletEntryFunction,
  GetEntryFunctionId,
  UpdateEntryStatusFunction,
} from "../../../Slice/EntrySlice";
import Image from "../../Assets/noresult.webp";
import { Link, useNavigate } from "react-router-dom";
import TableHeaderLayout from "../../Common/TableLayout/TableHeaderLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Loader from "../../Common/Loader";
import moment from "moment";
import DeleteDialog from "../../Common/DeleteDialog";
import { MenuItem, Select } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ToastComponent from "../../Common/TaostComponent";
import Header from "../../Common/Header";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageOutlined from "@mui/icons-material/LastPageOutlined";
const YourWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry, isLoading } = useSelector((state) => state.Entry.get);
  const { deleteSuccess } = useSelector((state) => state.Entry.delete);
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunctionId(admin.user._id));
    }
    if (!isAuth) {
      navigate("/login");
    }
    if (deleteSuccess) {
      dispatch(GetEntryFunctionId(admin.user._id));
      setOpen(false);
    }
    if (updateStatusSuccess) {
      dispatch(GetEntryFunctionId(admin.user._id));
      setOpen2(false);
    }
  }, [isAuth, deleteSuccess, updateStatusSuccess]);

  const [id, setId] = React.useState("");
  const [selectData, setSelectData] = React.useState("");
  const [selectData2, setSelectData2] = React.useState("");
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
  const [searchInput, setSearchInput] = React.useState("");

  // Table Functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - entry.data.length) : 0;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return isAuth && entry.data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Your Work" />
      <TableHeaderLayout setSearchInput={setSearchInput} />
      {isLoading ? (
        <Loader />
      ) : entry.data && !entry.data.length ? (
        <div className="w-full flex justify-center items-center">
          <img src={Image} className="w-1/2" />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  <StyledTableCell align="left">
                    <div className="flex justify-evenly items-center">
                      {row.currentJobHoldingTeam !== "ENTRY TEAM" ? (
                        "DONE BY ENTRY TEAM"
                      ) : (
                        <>
                          <Link to={`/update-entry/${row.uniqueJobId}`}>
                            <EditIcon className="text-blue-700 cursor-pointer" />
                          </Link>
                          <DeleteIcon
                            className="text-red-700 cursor-pointer"
                            onClick={() =>
                              handleClickDeleteOpen(row.uniqueJobId)
                            }
                          />
                          <p
                            onClick={() => handleClickOpen2(row)}
                            className="text-blue-600 cursor-pointer"
                          >
                            Update Status
                          </p>
                          <p
                            className="text-blue-600 cursor-pointer"
                            onClick={() => handleClickOpen3(row)}
                          >
                            Assign Here
                          </p>
                        </>
                      )}
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={entry.data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
            <DeleteDialog
              open={open}
              handleClose={handleClose}
              deleteAction={deleteAction}
              handleClickOpen={handleClickOpen}
              id={id}
            />
            <AssignToSurveyDialogBox
              open={open3}
              admin={admin}
              handleClose={handleClose3}
              dispatch={dispatch}
              selectData={selectData2}
            />
            <AssignDialogBox
              open={open2}
              admin={admin}
              handleClose={handleClose2}
              dispatch={dispatch}
              selectData={selectData}
            />
          </Table>
        </TableContainer>
      )}
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
  handleClose,
  selectData,
  dispatch,
}) => {
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
      <DialogTitle id="responsive-dialog-title">Select Survyier</DialogTitle>
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

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageOutlined /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageOutlined />}
      </IconButton>
    </Box>
  );
}
