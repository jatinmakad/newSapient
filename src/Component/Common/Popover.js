import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Assets/avatar.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LogoutFunction } from "../../Slice/AdminSlice";
export default function Popover() {
  const [anchorEl, setAnchorEl] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.Login);
  let role = admin.user && admin.user.role.toLowerCase();
  return (
    <div>
      <div
        className="flex items-center justify-center p-4"
        onClick={handleClick}
      >
        <img src={Avatar} className="w-12 rounded-full mr-2 cursor-pointer" />
        <div className="mr-3">
          <p className="capitalize text-md">{admin.user && admin.user.name}</p>
          <p className="capitalize text-sm">{role}</p>
        </div>
        <KeyboardArrowDownIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => dispatch(LogoutFunction())} className="w-48">
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
