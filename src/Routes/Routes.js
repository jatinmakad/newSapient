import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Redirect,
} from "react-router-dom";
import Dashboard from "../Component/Dashboard/Dashboard";
import Entry from "../Component/Entry/Entry";
import Login from "../Component/Login/Login";
import CreateEntry from "../Component/Entry/Create/CreateEntry";
import User from "../Component/UserManagement/User";
import CreateUser from "../Component/UserManagement/Create/CreateUser";
import UpdateEntry from "../Component/Entry/Update/UpdateEntry";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Slice/AdminSlice";
import EntryDetails from "../Component/Entry/EntryDetails";
import YourWork from "../Component/Entry/YourWork/YourWork";
import Coordination from "../Component/Coordination/Coordination";

import AssignTask from "../Component/CoordinationManager/AssignTask/AssignTask";
import UpdateCoordination from "../Component/Coordination/Update/UpdateCoordination";
import ReportTeam from "../Component/ReportTeam/reportTeam";
import AssignTaskReportTeam from "../Component/ReportTeamManager/AssignTaskReportTeam";
import Survery from "../Component/Survery/Survery";
import NotFound from "../Component/Common/NotFound";
import SurveryUpdate from "../Component/Survery/SurveryUpdate";
const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
      /* Entry */
      <Route path={"/entry"} element={<Entry />} />
      <Route path={"/create-entry"} element={<CreateEntry />} />
      <Route path={"/update-entry/:id"} element={<UpdateEntry />} />
      <Route path={"/entry-details/:id"} element={<EntryDetails />} />
      <Route path={"/your-work"} element={<YourWork />} />
      /* User */
      <Route path={"/user"} element={<User />} />
      <Route path={"/create-user"} element={<CreateUser />} />
      /* Coordination */
      <Route path={"/coordination"} element={<Coordination />} />
      <Route
        path={"/update-coordination/:id"}
        element={<UpdateCoordination />}
      />
      <Route path={"/assign-task"} element={<AssignTask />} />
      /* REPORT */
      <Route path={"/report-team"} element={<ReportTeam />} />
      {/* <Route
          path={"/update-coordination/:id"}
          element={<UpdateCoordination />}
        />
        */}
      <Route
        path={"/assign-task-report-team"}
        element={<AssignTaskReportTeam />}
      />
      <Route path={"/survery"} element={<Survery />} />
      <Route path={"/survery-update/:id"} element={<SurveryUpdate />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};

export default RoutesPage;
