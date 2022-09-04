import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { downloadExcel } from "react-export-table-to-excel";
import moment from "moment";
import { Button, Grid } from "@mui/material";
const ExportData = () => {
  const { isAuth } = useSelector((state) => state.Login);
  const [data, setData] = useState();
  const getFunc = async () => {
    let link = `https://sap-data-management-mcs.herokuapp.com/get-job-lists?skip=0&limit=2000`;
    const { data } = await axios.get(link);
    setData(data.data);
  };
  useEffect(() => {
    if (isAuth) {
      getFunc();
    }
  }, [isAuth]);
  const header = ["Refrence Number", "City", "Date", "Insure"];
  let updated =
    data &&
    data.map((user) => {
      return {
        reportRefrenceNo: user.reportRefrenceNo,
        city: user.insurerCity,
        date: moment(user.intimationDate).format("LL"),
        insure: user.insured,
      };
    });
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "jobData",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: updated,
      },
    });
  }
  return (
    <Grid
      item
      lg={3}
      md={3}
      sm={6}
      xs={6}
      display="flex"
      justifyContent="flex-end"
    >
      <Button variant="contained" color="info" onClick={handleDownloadExcel}>
        Export
      </Button>
    </Grid>
  );
};

export default ExportData;
