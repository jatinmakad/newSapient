import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ToastComponent from "../Component/Common/TaostComponent";
const initialState = {
  register: {
    isLoading: false,
    isSuccess: false,
  },
  get: {
    users: "",
    isLoading: false,
    error: "",
  },
  deleteuser: {
    success: false,
  },
};
const RegisterSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    GetUserPending: (state) => {
      state.get.isLoading = true;
    },
    GetUserSuccess: (state, { payload }) => {
      state.get.isLoading = false;
      state.get.users = payload;
    },
    GetUserFail: (state, { payload }) => {
      state.get.isLoading = false;
      state.get.error = payload;
    },
    RegisterPending: (state) => {
      state.register.isLoading = true;
    },
    RegisterSuccess: (state) => {
      state.register.isLoading = false;
      state.register.error = "";
      state.register.isSuccess = true;
    },
    RegisterSuccessAfter: (state) => {
      state.register.isSuccess = false;
    },
    RegisterFail: (state, { payload }) => {
      state.register.error = payload;
    },
    DeleteUserBefore: (state, { payload }) => {
      state.deleteuser.success = true;
    },
    DeleteUserAfter: (state, { payload }) => {
      state.deleteuser.success = false;
    },
  },
});

const { actions } = RegisterSlice;
export const {
  GetUserFail,
  GetUserPending,
  GetUserSuccess,
  RegisterFail,
  RegisterPending,
  RegisterSuccess,
  RegisterSuccessAfter,
  DeleteUserAfter,
  DeleteUserBefore,
} = actions;
export default RegisterSlice.reducer;

export const RegisterFunction = (Data) => {
  return async (dispatch) => {
    try {
      dispatch(RegisterPending());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://sap-user-microservice.herokuapp.com/register`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(RegisterSuccess());
        ToastComponent("User Created Successfully", "success");
      }
      dispatch(RegisterSuccessAfter());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
      dispatch(RegisterFail(error));
    }
  };
};

export const GetUserFunction = (user, count, team, limited) => {
  let search = user ? user : "";
  let countText = count ? count : "";
  let updatedTeam = team ? team : "";
  let limit = limited ? limited : "";
  return async (dispatch) => {
    try {
      dispatch(GetUserPending());
      let link = `https://sap-user-microservice.herokuapp.com/getUsers?searchKey=${search}&skip=${countText}&limit=${limit}&team=${updatedTeam}`;
      const { data } = await axios.get(link);
      dispatch(GetUserSuccess(data));
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
      dispatch(GetUserFail(error));
    }
  };
};

export const GetUserFunctionCityWithTeam = (search, team) => {
  return async (dispatch) => {
    try {
      dispatch(GetUserPending());
      let link = `https://sap-user-microservice.herokuapp.com/getUsers?city=${search}&team=${team}`;
      const { data } = await axios.get(link);
      dispatch(GetUserSuccess(data));
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
      dispatch(GetUserFail(error));
    }
  };
};

export const DeleteUserFunction = (id) => {
  const config = { headers: { "Content-Type": "application/json" } };
  return async (dispatch) => {
    try {
      let link = `https://sap-user-microservice.herokuapp.com/delete-user?id=${id}`;
      const { data } = await axios.put(link, config);
      console.log(data, "Data");
      if (data.success === true) {
        dispatch(DeleteUserBefore());
        ToastComponent("User Deleted Succesfully", "success");
      }
      dispatch(DeleteUserAfter());
    } catch (error) {
      ToastComponent("Something went wrong", "error");
      dispatch(GetUserFail(error));
    }
  };
};
