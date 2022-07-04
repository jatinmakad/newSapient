import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import DashBoardComponent from "./DashBoardComponent";
import axios from "axios";
import Loader from "../Common/Loader";
const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  const [coordination, setCoordination] = useState("");
  const [entry, setEntry] = useState("");
  const [report, setReport] = useState("");
  const [account, setAccount] = useState("");

  const dataArray = [
    {
      heading: "Entry Team",
      array: entry,
      url: "/entry",
    },
    {
      heading: "Coordination Team",
      array: coordination,
      url: "/coordination",
    },
    {
      heading: "Report Team",
      array: report,
      url: "/report-team",
    },
    {
      heading: "Account Team",
      array: account,
      url: "/entry",
    },
  ];

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
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
  console.log(coordination, "cord");
  return isAuth ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Dashboard" />
      <Grid container spacing={2} lg={12} md={12} sm={12} xs={12}>
        {coordination && entry && report && account ? (
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
         <Grid item lg={12} md={12} sm={12} xs={12}>

         </Grid>
      </Grid>
    </div>
  ) : null;
};

export default Dashboard;
