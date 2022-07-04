import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../Common/Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@material-ui/core";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Common/Loader";
import axios from "axios";
import {
  GetDocumentFunction,
  UpdloadDocumentFunction,
} from "../../Slice/CoordinationSlice";
import ToastComponent from "../Common/TaostComponent";
export default function UploadDocument({ setDataRow, dataRow, func }) {
  const { id, type } = useParams();
  const { isAuth } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  const [selectedFile, setSelectedFile] = useState();
  const handleFileInputChange = (e, id) => {
    const file = e.target.files[0];
    setSelectedFile({
      ...selectedFile,
      [e.target.name]: file,
    });
    previewFile(file, id);
  };

  const previewFile = async (file, id) => {
    const reader = await new FileReader();
    reader.addEventListener("load", () => console.log());
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    reader.readAsDataURL(file);
    let imagetoSet = file.preview;
    let newData = dataRow.map((item) =>
      item.id !== id
        ? item
        : { ...item, image: imagetoSet, base64EncodedImage: file }
    );
    setDataRow(newData);
  };
  const handleSubmitFile = (file, name) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result, name);
    };
  };
  const uploadImage = async (base64EncodedImage, name) => {
    let body = JSON.stringify({
      data: base64EncodedImage,
      uniqueJobId: id,
      name: name,
    });
    setLoading(true);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "https://sap-data-management-mcs.herokuapp.com/upload-documents",
      body,
      config
    );
    if (data.success === true) {
      func();
      setLoading(false);
      ToastComponent("Document Uploaded SuccessFully", "success");
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Upload Document" />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableBody>
            {dataRow
              ? dataRow.map((row, index) => {
                  return (
                    <React.Fragment key={" " + index}>
                      <CommonTable
                        row={row}
                        handleFileInputChange={handleFileInputChange}
                        handleSubmitFile={handleSubmitFile}
                      />
                    </React.Fragment>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
const CommonTable = ({ row, handleSubmitFile, handleFileInputChange }) => {
  return (
    <TableRow key={row.id}>
      <TableCell align="left">{row.name}</TableCell>
      {row.uploaded == false ? (
        <>
          <TableCell component="th" align="left" scope="row">
            <CommonInput
              id={row.id}
              name={row.name}
              handleFileInputChange={handleFileInputChange}
              previewSource={row.image}
            />
          </TableCell>
          <TableCell align="left">
            <button
              className="bg-gray-300 hover:bg-red-400 hover:text-white text-gray-800 font-normal tracking-wide py-2 px-4 rounded inline-flex items-center"
              onClick={() => handleSubmitFile(row.base64EncodedImage, row.name)}
              type="submit"
            >
              <svg
                class="fill-current w-4 h-4 mr-2 -rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Upload</span>
            </button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell></TableCell>
          <TableCell>
            <span>Uploaded</span>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
const CommonInput = ({ id, name, handleFileInputChange, previewSource }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="flex w-full justify-between items-center">
      <input
        id={id}
        accept=".png, .jpg, .jpeg, .pdf"
        type="file"
        name={name}
        onChange={(e) => handleFileInputChange(e, id)}
        className="form-input"
      />
      {previewSource && (
        <>
          <p className="text-blue-700 cursor-pointer" onClick={handleOpen}>
            Preview
          </p>
          <PreviewBox
            open={open}
            handleClose={handleClose}
            previewSource={previewSource}
          />
        </>
      )}
    </div>
  );
};
const PreviewBox = ({ open, handleClose, previewSource }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={"lg"}
    >
      <DialogContent style={{ height: "700px" }}>
        <iframe className="w-full h-full object-cover" src={previewSource} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};