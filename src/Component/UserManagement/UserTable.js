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
import DeleteDialog from "../Common/DeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteUserFunction } from "../../Slice/RegisterSlice";
export default function UserTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const { users } = useSelector((state) => state.Register.get);
  const { isLoading } = useSelector((state) => state.Register.get);
  const { success } = useSelector((state) => state.Register.deleteuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.Login);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (success) {
      setOpen(false);
    }
  }, [isAuth, success]);

  const handleClickDeleteOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteAction = (p) => {
    dispatch(DeleteUserFunction(p));
  };
  return isAuth ? (
    isLoading ? (
      <Loader />
    ) : users.data && users.data.length === 0 ? (
      <div className="w-full flex justify-center items-center">
        <img src={Image} className="w-1/2" />
      </div>
    ) : (
      <>
        <TableLayout
          headerCell={headerCell}
          data={users.total}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          <TableBody>
            {(users.data && users.data).map((row, index) => (
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
                <StyledTableCell align="center">
                  <DeleteIcon
                    className="text-red-700 cursor-pointer"
                    onClick={() => handleClickDeleteOpen(row._id)}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableLayout>
        <DeleteDialog
          open={open}
          id={id}
          handleClose={handleClose}
          deleteAction={deleteAction}
        />
      </>
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
  {
    value: "Action",
    align: "center",
  },
];
