import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

function createData(name, username, email, phone, website) {
  return { name, username, email, phone, website };
}

const rows = [];

export default function DynamicTable() {
  const data = [
    {
      id: 1,
      name: "Melissa",
      text: "Tortoishell",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 2,
      name: "Merrielle",
      text: "Harrie",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 3,
      name: "Florette",
      text: "Shrieve",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 4,
      name: "Hogan",
      text: "Blundon",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 5,
      name: "Midge",
      text: "Hallick",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 6,
      name: "Ken",
      text: "Beckingham",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 7,
      name: "Jessy",
      text: "Mackelworth",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 8,
      name: "Alix",
      text: "Durston",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 9,
      name: "Dedra",
      text: "Purselowe",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
    {
      id: 10,
      name: "Benetta",
      text: "Aust",
      image: "",
      base64EncodedImage: "",
      uploaded: false,
    },
  ];
  const [dataRow, setDataRow] = useState(data);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFileInputChange = (e, id) => {
    const file = e.target.files[0];

    setSelectedFile({
      ...selectedFile,
      [e.target.name]: file,
    });
    previewFile(file, id);
    // setFileInputState(e.target.value);
  };

  const previewFile = async (file, id) => {
    const reader = await new FileReader();
    reader.addEventListener("load", () => console.log());
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    reader.readAsDataURL(file);
    let imagetoSet = file.preview;
    // setPreviewSource(image);
    let newData = dataRow.map((item) =>
      item.id !== id
        ? item
        : { ...item, image: imagetoSet, base64EncodedImage: file }
    );
    setDataRow(newData);
  };
  const handleSubmitFile = (file, id) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result, id);
    };
    reader.onerror = () => {
      setErrMsg("something went wrong!");
    };
  };
  console.log(dataRow, ">>>>");
  const uploadImage = async (base64EncodedImage, id) => {
    try {
      await fetch("http://localhost:4000/upload-documents", {
        method: "PUT",
        body: JSON.stringify({
          data: base64EncodedImage,
          uniqueJobId:
            "f1ba19ff4fc242a1b2bea0ff26819332klg9i1vh7c1655581872958",
          name: "aditya",
        }),
        headers: { "Content-Type": "application/json" },
      });
      let newData = dataRow.map((item) =>
        item.id !== id ? item : { ...item, uploaded: true }
      );
      setDataRow(newData);
    } catch (err) {
      setErrMsg("Something went wrong!");
    }
  };

  return (
    <div style={{ maxWidth: "100%", padding: "12px" }}>
      <div className="text-xl pb-2">Upload Documents</div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableBody>
            {dataRow.map((row, index) => {
              return (
                <React.Fragment key={" " + index}>
                  <CommonTable
                    row={row}
                    handleFileInputChange={handleFileInputChange}
                    handleSubmitFile={handleSubmitFile}
                  />
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
const CommonTable = ({ row, handleSubmitFile, handleFileInputChange }) => {
  return (
    <TableRow key={row.id}>
      <TableCell align="left">{row.text}</TableCell>
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
              onClick={() => handleSubmitFile(row.base64EncodedImage, row.id)}
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
          <TableCell>
            <h>Uploaded</h>
          </TableCell>
          <TableCell></TableCell>
        </>
      )}
    </TableRow>
  );
};
const CommonInput = ({ id, name, handleFileInputChange, previewSource }) => {
  return (
    <div className="flex">
      <input
        id={id}
        accept=".png, .jpg, .jpeg, .pdf"
        type="file"
        name={name}
        onChange={(e) => handleFileInputChange(e, id)}
        className="form-input"
      />
      {previewSource && (
        <iframe className="w-48 h-48 object-contain" src={previewSource} />
      )}
    </div>
  );
};
