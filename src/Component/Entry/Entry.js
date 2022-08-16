import React, { useEffect } from "react";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import EntryTable from "./EntryTable";
import { useDispatch, useSelector } from "react-redux";
import { GetEntryFunction } from "../../Slice/EntrySlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import Header from "../Common/Header";
const Entry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry } = useSelector((state) => state.Entry.get);

  // Table Layout Function
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");
  const Func = (slug) => {
    if (slug == "reset" && searchInput !== "") {
      setSearchInput("");
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", "", ""));
    } else if (slug == "search") {
      if (searchInput !== "") {
        let count = Number(`${page}0`);
        dispatch(GetEntryFunction(count, "", searchInput, ""));
      }
    }
  };
  useEffect(() => {
    if (page || isAuth) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", searchInput, ""));
    }
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, page]);

  return isAuth && entry.data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Entry" />
      <TableHeaderLayout
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        Func={Func}
      >
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
              <Button variant="contained" sx={{ background: "#03C9D7" }}>
                {/* <AddIcon /> */}
                Create Entry
              </Button>
            </Link>
          </Grid>
        ) : (
          ""
        )}
      </TableHeaderLayout>
      <EntryTable
        searchInput={searchInput}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  ) : null;
};

export default Entry;
