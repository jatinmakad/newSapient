import React, { Suspense, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { useSelector } from "react-redux";
import Logo from "../Assets/LogoLeft.png";
import {
  adminData,
  EntryData,
  CoordinationData,
  CoordinationManagerData,
  reportTeamData,
  reportTeamManagerData,
  SurveryData,
  accountTeamManagerData,
  accountTeamEmployee,
  dispatchTeamEmployee,
  disptachTeamManagerData,
} from "../../data/Data";
import Loader from "../Common/Loader";
const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  const condition =
    admin?.user && admin?.user?.role === "ADMIN"
      ? adminData
      : admin?.user?.role === "ENTRY TEAM EMPLOYEE"
      ? EntryData
      : admin?.user?.role === "COORDINATION TEAM EMPLOYEE"
      ? CoordinationData
      : admin?.user?.role === "COORDINATION TEAM MANAGER"
      ? CoordinationManagerData
      : admin?.user?.role === "REPORT TEAM MANAGER"
      ? reportTeamManagerData
      : admin?.user?.role === "REPORT TEAM EMPLOYEE"
      ? reportTeamData
      : admin?.user?.role === "SURVEYOUR"
      ? SurveryData
      : admin?.user?.role === "ACCOUNT TEAM MANAGER"
      ? accountTeamManagerData
      : admin?.user?.role === "ACCOUNT TEAM EMPLOYEE"
      ? accountTeamEmployee
      : admin?.user?.role === "DISPATCH TEAM EMPLOYEE"
      ? dispatchTeamEmployee
      : admin?.user?.role === "DISPATCH TEAM MANAGER"
      ? disptachTeamManagerData
      : "";
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return isAuth ? (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={Logo} className="w-1/2" />
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-8">
            {condition.map((item) => (
              <Suspense fallback={<Loader />}>
                <NavLink
                  to={`${item.click}`}
                  key={item.text}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {item.icon}
                  <span className="capitalize ">{item.text}</span>
                </NavLink>
              </Suspense>
            ))}
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default Sidebar;
