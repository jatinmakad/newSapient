import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { GetUserFunction } from "../../Slice/RegisterSlice";
import UserTable from "../UserManagement/UserTable";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import Header from "../Common/Header";
const DispatchAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { data } = useSelector((state) => state.Register.get.users);
  const { success } = useSelector((state) => state.Register.deleteuser);
  const { isSuccess } = useSelector((state) => state.Register.register);
  // Table Layout Function
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");

  useEffect(() => {
    if (page || searchInput || isAuth || success || isSuccess) {
      let count = Number(`${page}0`);
      dispatch(GetUserFunction(searchInput, count, "DISPATCH TEAM",10));
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, searchInput, page, success,isSuccess]);

  return isAuth && data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Dispatch Team" />
      <TableHeaderLayout
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      ></TableHeaderLayout>
      <UserTable
        searchInput={searchInput}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  ) : null;
};

export default DispatchAdmin;
