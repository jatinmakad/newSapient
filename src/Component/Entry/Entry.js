import React, { useEffect } from "react";
import BasicLayout from "../BasicLayout/BasicLayout";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import EntryTable from "./EntryTable";
import { useDispatch, useSelector } from "react-redux";
import { GetEntryFunction } from "../../Slice/EntrySlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import Header from "../Common/Header";
const Entry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry } = useSelector((state) => state.Entry.get);

  useEffect(() => {
    if (isAuth) {
      dispatch(GetEntryFunction());
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);

  const [searchInput, setSearchInput] = React.useState("");
  return isAuth && entry.data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Entry" />
      <TableHeaderLayout setSearchInput={setSearchInput}>
        {admin.user.role === "ENTRY TEAM EMPLOYEE" ? (
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display="flex"
            justifyContent="flex-end"
          >
            <Link to={"/create-entry"}>
              <Button variant="contained" color="primary">
                {/* <AddIcon /> */}
                Create Entry
              </Button>
            </Link>
          </Grid>
        ) : (
          ""
        )}
      </TableHeaderLayout>
      <EntryTable searchInput={searchInput} />
    </div>
  ) : (
    null
  );
};

export default Entry;
