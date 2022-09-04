import React, { useEffect } from "react";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CoordinationTable from "./CoordinationTable";
import Header from "../Common/Header";
import { GetEntryFunction } from "../../Slice/EntrySlice";
const Coordination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const [open2, setOpen2] = React.useState(false);
  const { updateStatusSuccess } = useSelector(
    (state) => state.Entry.updateStatus
  );
  const { updateAssignTaskSuccess } = useSelector(
    (state) => state.Report.assignTask
  );
  const [open3, setOpen3] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [searchInput, setSearchInput] = React.useState("");
  const Func = (slug) => {
    if (slug == "reset" && searchInput !== "") {
      setSearchInput("");
      let count = Number(`${page}0`);
      dispatch(GetEntryFunction(count, "", "", admin.user._id));
    } else if (slug == "search") {
      if (searchInput !== "") {
        let count = Number(`${page}0`);
        dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
      }
    }
  };
  useEffect(() => {
    if (isAuth || page || updateStatusSuccess) {
      let count = Number(`${page}0`);
        dispatch(GetEntryFunction(count, "", searchInput, admin.user._id));
    }
    if (isAuth === false) {
      navigate("/login");
    }
    if (updateStatusSuccess) {
      setOpen2(false);
    }
    if (updateAssignTaskSuccess) {
      setOpen3(false);
    }
  }, [isAuth, updateStatusSuccess, page,updateAssignTaskSuccess]);

  return isAuth ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Coordination Team" />
      <TableHeaderLayout
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        Func={Func}
      />
      <CoordinationTable
        searchInput={searchInput}
        page={page}
        open2={open2}
        setOpen2={setOpen2}
        setPage={setPage}
        open3={open3}
        setOpen3={setOpen3}
      />
    </div>
  ) : (
    ""
  );
};

export default Coordination;
