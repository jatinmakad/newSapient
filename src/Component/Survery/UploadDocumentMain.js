import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../../Slice/CoordinationSlice";
import Loader from "../Common/Loader";
import axios from "axios";
import UploadDocument from "./UploadDocument";
import { Engineering, Fire, Marine } from "../Common/Constant/Constant";
export default function UploadDocumentMain() {
  const [dataRow, setDataRow] = useState("");
  const { id, type } = useParams();
  const { isAuth } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { document } = useSelector((state) => state.Coordination.getDocument);
  // const { uploadDocumentSuccess } = useSelector(
  //   (state) => state.Coordination.uploadDocument
  // );
  useEffect(() => {
    if (isAuth) {
      func();
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, id]);

  const func = async () => {
    const { data } = await axios.get(
      `https://sap-data-management-mcs.herokuapp.com/get-jobs-by-id?uniqueJobId=${id}`
    );
    if (data.success === true) {
      let rowUploaded =
        type === "Engineering"
          ? Engineering
          : type === "Fire"
          ? Fire
          : type === "Marine"
          ? Marine
          : "";
      let updatedArray = rowUploaded.map((x) => {
        const item = data.data[0].documents.find((r) => r.name === x.name);
        return item ? { ...x, ...item, uploaded: true } : x;
      });
      setDataRow(updatedArray);
      // getDocument(updatedArray);
    }
  };
  return dataRow ? (
    <UploadDocument setDataRow={setDataRow} dataRow={dataRow} func={func} />
  ) : (
    <Loader />
  );
}
