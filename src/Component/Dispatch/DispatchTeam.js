import React, { useEffect } from "react";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Loader from "../Common/Loader";
import { GetEntryFunction } from "../../Slice/EntrySlice";
import DispatchTable from "./DispatchTable";
const DispatchTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  // Table Function
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (isAuth || page || searchInput || updateStatusSuccess) {
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
    }
  }, [isAuth, page, searchInput, updateStatusSuccess]);

  return isAuth ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Dispatch Team" />
      <TableHeaderLayout
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <DispatchTable
        searchInput={searchInput}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={rowsPerPage}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default DispatchTeam;
