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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import moment from "moment";
import { styled } from "@mui/material/styles";
const Dashboard = () => {
  const { isAuth, admin } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coordination, setCoordination] = useState("");
  const [entryArray, setEntry] = useState("");
  const [report, setReport] = useState("");
  const [account, setAccount] = useState("");
  const { entry } = useSelector((state) => state.Entry.get);
  const [dispatchData, setDispatchData] = useState("");
  const [dispatchTeam,setDispatch] = useState("")
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
    {
      heading: "Disptach Team",
      array: dispatchTeam,
      url: "/dispatch-admin",
    },
  ];
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    if (admin?.user?.role === "ADMIN") {
      dispatch(GetEntryFunction(0, "ENTRY TEAM", "", ""));
    }
    if (
      admin?.user?.role === "REPORT TEAM MANAGER" ||
      admin?.user?.role === "COORDINATION TEAM MANAGER" ||
      admin?.user?.role === "ACCOUNT TEAM MANAGER" ||
      admin?.user?.role === "DISPATCH TEAM MANAGER"
    ) {
      dispatch(GetEntryFunction(0, admin.user.team, "", ""));
    }
    if (
      admin?.user?.role === "ACCOUNT TEAM EMPLOYEE" ||
      admin?.user?.role === "REPORT TEAM EMPLOYEE" ||
      admin?.user?.role === "COORDINATION TEAM EMPLOYEE" ||
      admin?.user?.role === "ENTRY TEAM EMPLOYEE" ||
      admin?.user?.role === "DISPATCH TEAM EMPLOYEE"
    ) {
      dispatch(GetEntryFunction(0, "", "", admin.user._id));
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
            `https://sap-user-microservice.herokuapp.com/getUsers?team=DISPATCH TEAM`
          )
          .then((res) => {
            setDispatch(res.data.data);
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
        await axios
          .get(
            `https://sap-user-microservice.herokuapp.com/getUsers?team=DISPATCH TEAM`
          )
          .then((res) => {
            setDispatchData(res.data.data);
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="flex flex-col justify-center shadow-md bg-white rounded-lg">
              {/* <p className="border-b-2 p-3 text-lg font-medium">
                Tasks/Assignments
              </p> */}
              <div className="flex justify-between p-3 items-center">
              {" "}
              <p className="text-lg font-medium"> Tasks/Assignments</p>
              <Link to={"/entry"}>
                <span
                  style={{ color: "#03C9D7" }}
                  className="cursor-pointer font-medium"
                >
                  View all
                </span>
              </Link>
            </div>
              <TableContainer component={Paper} style={{ padding: "3px" }}>
                <Table
                  size="small"
                  aria-label="a dense table"
                  sx={{ border: "none" }}
                >
                  <TableHead>
                   
                      {headerCell.map((r) => {
                        return (
                          <StyledTableCell
                            align={"left"}
                            sx={{
                              color: "gray",
                              borderBottom: "0.5px solid lightgray",
                            }}
                          >
                            {r.value}
                          </StyledTableCell>
                        );
                      })}
                   
                  </TableHead>
                  <TableBody>
                    {entry.data && entry.data.length > 0 ? (
                      entry.data.slice(0, 9).map((row, index) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell align="left">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.reportRefrenceNo}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.city}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.date ? moment(row.date).format("LL") : "--"}
                          </StyledTableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          No Record Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <div className="w-full flex justify-center items-center p-2">
                <Link to={"/entry"}>
                  <span className="text-blue-800 cursor-pointer font-medium">
                    View all
                  </span>
                </Link>
              </div> */}
            </div>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      {admin?.user?.role === "ENTRY TEAM EMPLOYEE" ? (
        entry && entryArray ? (
          <DashBoardCommon
            heading={"Entry Team Employee"}
            array={entryArray}
            url={"/entry"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}
      {admin?.user?.role === "COORDINATION TEAM EMPLOYEE" ? (
        coordination ? (
          <DashBoardCommon
            heading={"Coordination Team Employee"}
            array={coordination}
            url={"/coordination"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}
      {admin?.user?.role === "REPORT TEAM EMPLOYEE" ? (
        report ? (
          <DashBoardCommon
            heading={"Report Team Employee"}
            array={report}
            url={"/report-team"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}
      {admin?.user?.role === "REPORT TEAM MANAGER" ? (
        report ? (
          <DashBoardCommon
            heading={"Report Team Employee"}
            array={report}
            url={"/assign-task-report-team"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}
      {admin?.user?.role === "ACCOUNT TEAM EMPLOYEE" ? (
        account ? (
          <DashBoardCommon
            heading={"Account Team Employee"}
            array={account}
            url={"/account"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}
      {admin?.user?.role === "ACCOUNT TEAM MANAGER" ? (
        account ? (
          <DashBoardCommon
            heading={"Account Team Employee"}
            array={account}
            url={"/account-manager"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}

      {admin?.user?.role === "COORDINATION TEAM MANAGER" ? (
        coordination ? (
          <DashBoardCommon
            heading={"Coordination Team Employee"}
            array={coordination}
            url={"/assign-task"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}

      {admin?.user?.role === "DISPATCH TEAM MANAGER" ? (
        dispatchData ? (
          <DashBoardCommon
            heading={"Dispatch Team Employee"}
            array={dispatchData}
            url={"/assign-task"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}

      {admin?.user?.role === "DISPATCH TEAM EMPLOYEE" ? (
        dispatchData ? (
          <DashBoardCommon
            heading={"Dispatch Team Employee"}
            array={dispatchData}
            url={"/assign-task"}
            array2={entry.data}
            heading2={"Tasks/Assignments"}
          />
        ) : (
          <Loader />
        )
      ) : (
        ""
      )}
    </div>
  ) : null;
};

export default Dashboard;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#03C9D7",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "black",
  },
}));

const headerCell = [
  {
    value: "Sr no.",
    align: "left",
  },
  {
    value: "Refrence No.",
    align: "left",
  },
  {
    value: "City",
    align: "left",
  },
  {
    value: "Date",
    align: "left",
  },
  // {
  //   value: "Insure",
  //   align: "left",
  // },
];
