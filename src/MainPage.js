import React, { useEffect } from "react";
import Navbar from "./Component/Common/Navbar";
import Sidebar from "./Component/Common/Sidebar";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import RoutesPage from "./Routes/Routes";
import Login from "./Component/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Component/Dashboard/Dashboard";

const MainPage = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
    useStateContext();
  const { isAuth } = useSelector((state) => state.Login);
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return isAuth ? (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="static bg-white dark:bg-main-dark-bg drop-shadow-md navbar w-full ">
            <Navbar />
          </div>
          <div>
            <RoutesPage />
          </div>
        </div>
      </div>
    </div>
  ) : (
     <RoutesPage/>
  );
};

export default MainPage;
