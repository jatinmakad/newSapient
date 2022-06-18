import React, { useEffect } from "react";
import TableHeaderLayout from "../Common/TableLayout/TableHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReportTable from "./reportTable";
import Header from "../Common/Header";
const ReportTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  const [searchInput, setSearchInput] = React.useState("");
  return isAuth ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Report Team" />
      <TableHeaderLayout setSearchInput={setSearchInput} />
      <ReportTable searchInput={searchInput} />
    </div>
  ) : (
    ""
  );
};

export default ReportTeam;
