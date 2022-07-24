import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../Redux/store";
import ToastComponent from "../Component/Common/TaostComponent";
const initialState = {
  //   get: {
  //     entry: "",
  //     isLoading: false,
  //     error: "",
  //   },
  //   create: {
  //     entry: "",
  //     isLoading: false,
  //     error: "",
  //   },
  //   delete: {
  //     deleteSuccess: false,
  //   },
  //   update: {
  //     updateSuccess: false,
  //   },
  updatedArray: {
    array: "",
  },
  getDocument: {
    document: "",
  },
  assignTask: {
    updateAssignTaskSuccess: false,
  },
  updateComment: {
    updateCommentSuccess: false,
  },
  uploadDocument: {
    isLoading: false,
    uploadDocumentSuccess: false,
  },
};
const CoordinationSlice = createSlice({
  name: "Coordination",
  initialState,
  reducers: {
    // GetEntryPending: (state) => {
    //   state.get.isLoading = true;
    // },
    // GetEntrySuccess: (state, { payload }) => {
    //   state.get.isLoading = false;
    //   state.get.error = "";
    //   state.get.entry = payload;
    // },
    // GetEntryFail: (state, { payload }) => {
    //   state.get.isLoading = false;
    //   state.get.error = payload;
    //   state.get.entry = "";
    // },
    // CreateEntryPending: (state) => {
    //   state.create.isLoading = true;
    // },
    // CreateEntrySuccess: (state, { payload }) => {
    //   state.create.isLoading = false;
    //   state.create.error = "";
    //   state.create.isSuccess = true;
    // },
    // CreateEntrySuccessAfter: (state, { payload }) => {
    //   state.create.isSuccess = false;
    // },
    // CreateEntryFail: (state, { payload }) => {
    //   state.create.isLoading = false;
    //   state.create.error = payload;
    //   state.create.entry = "";
    // },
    // DeleteEntry: (state) => {
    //   state.delete.deleteSuccess = true;
    // },
    // DeleteEntryCleanup: (state) => {
    //   state.delete.deleteSuccess = false;
    // },
    // UpdateEntryBefore: (state) => {
    //   state.update.isLoading = true;
    // },
    // UpdateEntry: (state) => {
    //   state.update.updateSuccess = true;
    //   state.update.isLoading = false;
    // },
    // UpdateEntryCleanup: (state) => {
    //   state.update.updateSuccess = false;
    // },
    getDocument: (state, { payload }) => {
      state.getDocument.document = payload;
    },
    documnetUpdateArray: (state, { payload }) => {
      state.updatedArray.array = payload;
    },
    UpdateAssignTaskBefore: (state) => {
      state.assignTask.isLoading = true;
    },
    UpdateAssignTaskStatus: (state) => {
      state.assignTask.isLoading = false;
      state.assignTask.updateAssignTaskSuccess = true;
    },
    UpdateAssignTaskCleanup: (state) => {
      state.assignTask.updateAssignTaskSuccess = false;
    },
    UpdateCommentBefore: (state) => {
      state.updateComment.updateCommentSuccess = true;
    },
    UpdateCommentCleanup: (state) => {
      state.updateComment.updateCommentSuccess = false;
    },
    UpdateDocumentLoading: (state) => {
      state.uploadDocument.isLoading = true;
    },
    UpdateDocumentBefore: (state) => {
      state.uploadDocument.uploadDocumentSuccess = true;
    },
    UpdateDocumentCleanup: (state) => {
      state.uploadDocument.isLoading = false;
      state.uploadDocument.uploadDocumentSuccess = false;
    },
  },
});

const { actions } = CoordinationSlice;
export const {
  //   GetEntryFail,
  //   GetEntryPending,
  //   GetEntrySuccess,
  //   CreateEntryFail,
  //   CreateEntrySuccess,
  //   CreateEntryPending,
  //   CreateEntrySuccessAfter,
  //   DeleteEntry,
  //   DeleteEntryCleanup,
  //   UpdateEntry,
  //   UpdateEntryCleanup,
  //   UpdateEntryBefore,
  UpdateDocumentLoading,
  documnetUpdateArray,
  getDocument,
  UpdateDocumentBefore,
  UpdateDocumentCleanup,
  UpdateAssignTaskBefore,
  UpdateAssignTaskStatus,
  UpdateAssignTaskCleanup,
  UpdateCommentBefore,
  UpdateCommentCleanup,
} = actions;
export default CoordinationSlice.reducer;

// export const GetEntryFunction = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(GetEntryPending());
//       let link = `https://sap-data-management-mcs.herokuapp.com/get-job-lists`;
//       const { data } = await axios.get(link);
//       dispatch(GetEntrySuccess(data));
//     } catch (error) {
//       ToastComponent("Somthing went wrong", "error");
//       dispatch(GetEntryFail(error));
//     }
//   };
// };

// export const GetEntryFunctionId = (id) => {
//   return async (dispatch) => {
//     try {
//       dispatch(GetEntryPending());
//       let link = `https://sap-data-management-mcs.herokuapp.com/view-my-jobs?currentJobHolder=${id}`;
//       const { data } = await axios.get(link);
//       dispatch(GetEntrySuccess(data));
//     } catch (error) {
//       ToastComponent("Somthing went wrong", "error");
//       dispatch(GetEntryFail(error));
//     }
//   };
// };
// https://sap-data-management-mcs.herokuapp.com/view-my-jobs?currentJobHolder=628b6d5ee298a1372b59c0c5

// export const CreateEntryFunction = (Data) => {
//   return async (dispatch) => {
//     try {
//       dispatch(CreateEntryPending());
//       const config = { headers: { "Content-Type": "application/json" } };
//       const { data } = await axios.post(
//         `https://sap-data-management-mcs.herokuapp.com/entry`,
//         Data,
//         config
//       );
//       dispatch(CreateEntrySuccess(data));
//       if (data.success === true) {
//         ToastComponent("Entry Created Successfully", "success");
//       }
//       dispatch(CreateEntrySuccessAfter());
//     } catch (error) {
//       ToastComponent("Somthing went wrong", "error");
//       dispatch(CreateEntryFail(error));
//     }
//   };
// };

// export const DeletEntryFunction = (id) => {
//   return async (dispatch) => {
//     const { data } = await axios.delete(
//       `https://sap-data-management-mcs.herokuapp.com/delete-job/${id}`
//     );
//     if (data.success === true) {
//       dispatch(DeleteEntry(data.success));
//       ToastComponent("Entry Deleted SuccessFully", "success");
//     }
//     dispatch(DeleteEntryCleanup());
//   };
// };

// export const UpdateEntryFunction = (id, Data) => {
//   return async (dispatch) => {
//     const config = { headers: { "Content-Type": "application/json" } };
//     dispatch(UpdateEntryBefore());
//     const { data } = await axios.put(
//       `https://sap-data-management-mcs.herokuapp.com/edit-job/${id}`,
//       Data,
//       config
//     );
//     if (data.success === true) {
//       dispatch(UpdateEntry(data.success));
//       ToastComponent("Entry Updated SuccessFully", "success");
//     }
//     dispatch(UpdateEntryCleanup());
//   };
// };

export const UpdateAssignFunction = (Data, id) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      dispatch(UpdateAssignTaskBefore());
      const { data } = await axios.post(
        `https://sap-data-management-mcs.herokuapp.com/assign-tasks`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(UpdateAssignTaskStatus());
        ToastComponent("Task Assigned SuccessFully", "success");
      }
      dispatch(UpdateAssignTaskCleanup());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};

export const UpdateCommentFunction = (Data) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://sap-data-management-mcs.herokuapp.com/add-job-discrepancy`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(UpdateCommentBefore());
        ToastComponent("Comment Added SuccessFully", "success");
      }
      dispatch(UpdateCommentCleanup());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};

export const UpdateCommentSendForApprovalFunction = (Data) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://sap-data-management-mcs.herokuapp.com/send-for-discrepnacy-approval`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(UpdateCommentBefore());
        ToastComponent("Approval Send SuccessFully", "success");
      }
      dispatch(UpdateCommentCleanup());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};

export const UpdateCommentDoneFunction = (Data) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://sap-data-management-mcs.herokuapp.com/mark-discrepancy-done`,
        Data,
        config
      );
      if (data.success === true) {
        dispatch(UpdateCommentBefore());
        ToastComponent("Discrepancy Done SuccessFully", "success");
      }
      dispatch(UpdateCommentCleanup());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};

export const UpdloadDocumentFunction = (Data, id) => {
  return async (dispatch) => {
    try {
      dispatch(UpdateDocumentLoading());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        "https://sap-data-management-mcs.herokuapp.com/upload-documents",
        Data,
        config
      );
      if (data.success === true) {
        dispatch(UpdateDocumentBefore());
        ToastComponent("Document Uploaded SuccessFully", "success");
      }
      dispatch(UpdateDocumentCleanup());
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};

export const GetDocumentFunction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://sap-data-management-mcs.herokuapp.com/get-jobs-by-id?uniqueJobId=${id}`
      );
      if (data.success === true) {
        dispatch(getDocument(data.data[0].documents));
      }
    } catch (error) {
      ToastComponent(error.response.data.message, "error");
    }
  };
};
