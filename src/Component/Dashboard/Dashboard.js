import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import DashBoardComponent from "./DashBoardComponent";
import axios from "axios";
import Loader from "../Common/Loader";
import DashBoardCommon from "./DashboardCommon";
import { GetEntryFunction } from "../../Slice/EntrySlice";
const Dashboard = () => {
  const { isAuth, admin } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [coordination, setCoordination] = useState("");
  const [entryArray, setEntry] = useState("");
  const [report, setReport] = useState("");
  const [account, setAccount] = useState("");
  const { entry } = useSelector((state) => state.Entry.get);
  const dataArray = [
    {
      heading: "Entry Team",
      array: entryArray,
      url: "/entry-admin",
    },
    {
      heading: "Coordination Team",
      array: coordination,
      url: "/coordination-admin",
    },
    {
      heading: "Report Team",
      array: report,
      url: "/report-team-admin",
    },
    {
      heading: "Account Team",
      array: account,
      url: "/account-admin",
    },
  ];
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    if(admin?.user?.role === "ENTRY TEAM EMPLOYEE"){
      dispatch(GetEntryFunction(0, "", "", ""));
    }
    if (isAuth) {
      const func = async () => {
        await axios
          .get(
            `https://sap-user-microservice.herokuapp.com/getUsers?team=COORDINATION TEAM`
          )
          .then((res) => {
            setCoordination(res.data.data);
          });
        await axios
          .get(
            `https://sap-user-microservice.herokuapp.com/getUsers?team=ENTRY TEAM`
          )
          .then((res) => {
            setEntry(res.data.data);
          });
        await axios
          .get(
            `https://sap-user-microservice.herokuapp.com/getUsers?team=REPORT TEAM`
          )
          .then((res) => {
            setReport(res.data.data);
          });
        await axios
          .get(
            `https://sap-user-microservice.herokuapp.com/getUsers?team=ACCOUNT TEAM`
          )
          .then((res) => {
            setAccount(res.data.data);
          });
      };
      func();
    }
  }, [isAuth]);
  return isAuth ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Dashboard" />
      {admin?.user && admin?.user?.role === "ADMIN" ? (
        <Grid container spacing={2} lg={12} md={12} sm={12} xs={12}>
          {coordination && entryArray && report && account ? (
            dataArray.map((r) => {
              return (
                <DashBoardComponent
                  heading={r.heading}
                  array={r.array}
                  url={r.url}
                />
              );
            })
          ) : (
            <Loader />
          )}
          <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
        </Grid>
      ) : admin?.user?.role === "ENTRY TEAM EMPLOYEE" ? (
        entry && entryArray && (
          <DashBoardCommon
            heading={"Entry Team Employee"}
            array={entryArray}
            url={"/entry"}
            array2={entry.data}
            heading2={"Entry's"}
          />
        )
      ) : (
        admin?.user?.role === "COORDINATION TEAM EMPLOYEE" ? 
        coordination && (
          <DashBoardCommon
            heading={"Coordination Team Employee"}
            array={coordination}
            url={"/coordination"}
            array2={entry.data}
            heading2={"Entry's"}
          />
        ) : ""
      ) 
      }
    </div>
  ) : null;
};

export default Dashboard;
