import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import DashBoardComponent from "./DashBoardComponent";
const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  return isAuth ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Dashboard" />
      <Grid container spacing={2} lg={12} md={12} sm={12} xs={12}>
        {data.map((r) => {
          return <DashBoardComponent heading={r.heading} />;
        })}
      </Grid>
    </div>
  ) : null;
};

export default Dashboard;

const data = [
  {
    heading: "Entry Team",
  },
  {
    heading: "Entry Team",
  },
  {
    heading: "Entry Team",
  },
  {
    heading: "Entry Team",
  },
  {
    heading: "Entry Team",
  },
];
