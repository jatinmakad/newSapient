import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

const TableHeaderLayout = ({
  heading,
  link,
  setSearchInput,
  searchInput,
  children,
  Func,
}) => {
  const { isAuth, admin } = useSelector((state) => state.Login);
  return (
    <Grid lg={12} container justifyContent={"space-between"} spacing={2} mb={2}>
      <Grid item lg={6} md={6} xs={12} sm={12}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Search Ref no. / Insurer / City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            background: "#fff",
            padding: "7px 10px",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
          size="small"
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Grid>
      <Grid item lg={3} md={3} xs={6} sm={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => Func("search")}
          size="large"
          sx={{ marginRight: "5px" }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => Func("reset")}
          size="large"
        >
          Reset
        </Button>
      </Grid>
      {children}
    </Grid>
  );
};

export default TableHeaderLayout;
