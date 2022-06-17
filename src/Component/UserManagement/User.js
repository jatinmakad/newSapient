import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import { Button, Grid } from "@mui/material";
import {
  GetUserFunction,
  GetUserFunctionSearch,
} from "../../Slice/RegisterSlice";
import Header from "../Common/Header";
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { data } = useSelector((state) => state.Register.get.users);
  const [searchInput, setSearchInput] = React.useState("");
  useEffect(() => {
    if (searchInput) {
      dispatch(GetUserFunctionSearch(searchInput));
    }
    if (searchInput === "") {
      dispatch(GetUserFunction());
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, searchInput]);

  return isAuth && data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Users" />
      <TableHeaderLayout setSearchInput={setSearchInput}>
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
      <UserTable searchInput={searchInput} />
    </div>
  ) : null;
};

export default User;
