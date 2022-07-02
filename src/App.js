import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import MainPage from "./MainPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Cookie from "universal-cookie";
import { loginSuccess } from "./Slice/AdminSlice";
import Loader from "./Component/Common/Loader";
const MainPage = lazy(() => import("./MainPage"));
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var cookie = new Cookie();
    let local = cookie.get("auth");
    if (local === undefined) {
    } else {
      cookie.set("auth", JSON.stringify(local), { path: "/" });
      dispatch(loginSuccess(local));
    }
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<Loader/>}>
      <MainPage />
      </Suspense>
      
    </BrowserRouter>
  );
};

export default App;
