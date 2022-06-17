import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Popover from "./Popover";
const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { isAuth} = useSelector((state) => state.Login);
  const navigate = useNavigate()
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    if(!isAuth){
    navigate("/login")
    }
  }, [screenSize]);
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <button
        type="button"
        onClick={() => handleActiveMenu()}
        style={{ currentColor }}
        className="relative text-xl rounded-full p-2 hover:bg-light-gray"
      >
        <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
        <AiOutlineMenu />
      </button>

      <Popover />
    </div>
  );
};

export default Navbar;
