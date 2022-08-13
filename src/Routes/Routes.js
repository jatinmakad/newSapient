import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../Component/Common/Loader";
import NotFound from "../Component/Common/NotFound";
const DispatchAdmin = lazy(() =>
  import("../Component/Dispatch/DispatchAdmin")
);
const DispatchManager = lazy(() =>
  import("../Component/DispatchManager/DispatchManager")
);
const AccountDispatchedTeam = lazy(() => import("../Component/Account/AccountDispatchTeam"))
const DispatchTeam = lazy(() => import("../Component/Dispatch/DispatchTeam"));
const AccountTeam = lazy(() => import("../Component/Account/AccountTeam"));
const AccountTeamAdmin = lazy(() =>
  import("../Component/Account/AccountTeamAdmin")
);
const AccountManager = lazy(() =>
  import("../Component/AccountManager/AccountManager")
);
const AdminCoordinationTeam = lazy(() =>
  import("../Component/Coordination/AdminCoordinationTeam")
);
const AdminEntryTeam = lazy(() => import("../Component/Entry/AdminEntryTeam"));
const AdminReportTeam = lazy(() =>
  import("../Component/ReportTeam/AdminReportTeam")
);
const Dashboard = lazy(() => import("../Component/Dashboard/Dashboard"));
const Entry = lazy(() => import("../Component/Entry/Entry"));
const Login = lazy(() => import("../Component/Login/Login"));
const CreateEntry = lazy(() => import("../Component/Entry/Create/CreateEntry"));
const User = lazy(() => import("../Component/UserManagement/User"));
const CreateUser = lazy(() =>
  import("../Component/UserManagement/Create/CreateUser")
);
const UpdateEntry = lazy(() => import("../Component/Entry/Update/UpdateEntry"));
const EntryDetails = lazy(() => import("../Component/Entry/EntryDetails"));
const YourWork = lazy(() => import("../Component/Entry/YourWork/YourWork"));
const Coordination = lazy(() =>
  import("../Component/Coordination/Coordination")
);
const AssignTask = lazy(() =>
  import("../Component/CoordinationManager/AssignTask/AssignTask")
);
const UpdateCoordination = lazy(() =>
  import("../Component/Coordination/Update/UpdateCoordination")
);
const ReportTeam = lazy(() => import("../Component/ReportTeam/reportTeam"));
const AssignTaskReportTeam = lazy(() =>
  import("../Component/ReportTeamManager/AssignTaskReportTeam")
);
const Survery = lazy(() => import("../Component/Survery/Survery"));
const UploadDocumentMain = lazy(() =>
  import("../Component/Survery/UploadDocumentMain")
);
const SurveryUpdate = lazy(() => import("../Component/Survery/SurveryUpdate"));
const InvoiceComponent = lazy(() => import("../Component/Invoices/index"));

const RoutesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        /* Entry */
        <Route path={"/entry"} element={<Entry />} />
        <Route path={"/entry-admin"} element={<AdminEntryTeam />} />
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
          path={"/coordination-admin"}
          element={<AdminCoordinationTeam />}
        />
        <Route
          path={"/update-coordination/:id"}
          element={<UpdateCoordination />}
        />
        <Route path={"/assign-task"} element={<AssignTask />} />
        /* REPORT */
        <Route path={"/report-team"} element={<ReportTeam />} />
        <Route path={"/report-team-admin"} element={<AdminReportTeam />} />
        /* DISPATCH */
        <Route path={"/dispatch-team"} element={<DispatchTeam />} />
        <Route path={"/dispatch-manager"} element={<DispatchManager />} />
        <Route path={"/dispatch-admin"} element={<DispatchAdmin />} />
        {/* <Route
          path={"/update-coordination/:id"}
          element={<UpdateCoordination />}
        />
        */}
        <Route
          path={"/assign-task-report-team"}
          element={<AssignTaskReportTeam />}
        />
        /* Account */
        <Route path={"/account-admin"} element={<AccountTeamAdmin />} />
        <Route path={"/account-team"} element={<AccountTeam />} />
        <Route path={"/account-dispatched"} element={<AccountDispatchedTeam />} />
        <Route path={"/account-manager"} element={<AccountManager />} />
        <Route path={"/survery"} element={<Survery />} />
        <Route path={"/survery-update/:id"} element={<SurveryUpdate />} />
        <Route
          path={"/upload-document/:id/:type"}
          element={<UploadDocumentMain />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesPage;
