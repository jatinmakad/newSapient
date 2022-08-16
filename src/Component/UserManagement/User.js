import React, { useEffect } from "react";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import { Button, Grid } from "@mui/material";
import {
  GetUserFunction,
} from "../../Slice/RegisterSlice";
import Header from "../Common/Header";
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { data } = useSelector((state) => state.Register.get.users);
  const { success } = useSelector((state) => state.Register.deleteuser);
  // Table Layout Function
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");
  const Func = (slug) => {
    if (slug == "reset" && searchInput !== "") {
      setSearchInput("");
      let count = Number(`${page}0`);
      dispatch(GetUserFunction("",count,"",10));
    } else if (slug == "search") {
      if (searchInput !== "") {
        let count = Number(`${page}0`);
        dispatch(GetUserFunction(searchInput,count,"",10));
      }
    }
  };
  useEffect(() => {
    if (page  || isAuth || success) {
      let count = Number(`${page}0`);
      dispatch(GetUserFunction(searchInput,count,"",10));
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, page,success]);

  return isAuth && data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Users" />
      <TableHeaderLayout
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        Func={Func}
      >
        {admin.user.role === "ADMIN" ? (
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display="flex"
            justifyContent="flex-end"
          >
            <Link to={"/create-user"}>
              <Button variant="contained" color="primary">
                {/* <AddIcon /> */}
                Create User
              </Button>
            </Link>
          </Grid>
        ) : (
          ""
        )}
      </TableHeaderLayout>
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

export default User;
