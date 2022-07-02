import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocument,
} from "../../Slice/CoordinationSlice";
import Loader from "../Common/Loader";
import axios from "axios";
import UploadDocument from "./UploadDocument";
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
          : type === "Non-Marine"
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

const Marine = [
  {
    id: 1,
    name: "Gabianus pacificus",
    text: "Zathin",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 2,
    name: "Recurvirostra avosetta",
    text: "Domainer",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 3,
    name: "Chauna torquata",
    text: "Zamit",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 4,
    name: "Antidorcas marsupialis",
    text: "Hatity",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 5,
    name: "Aonyx capensis",
    text: "Asoka",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 6,
    name: "Arctogalidia trivirgata",
    text: "Tempsoft",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 7,
    name: "Milvus migrans",
    text: "Flowdesk",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 8,
    name: "Felis silvestris lybica",
    text: "Bigtax",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 9,
    name: "Macropus agilis",
    text: "Bigtax",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 10,
    name: "Papio cynocephalus",
    text: "Flowdesk",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 11,
    name: "Anastomus oscitans",
    text: "Asoka",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 12,
    name: "Lycaon pictus",
    text: "Otcom",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
];

const Fire = [
  {
    id: 1,
    name: "Averell",
    text: "Kach",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 2,
    name: "Creight",
    text: "Pankettman",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 3,
    name: "Lionel",
    text: "Bezant",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 4,
    name: "Martha",
    text: "Juett",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 5,
    name: "Chelsy",
    text: "Wickens",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 6,
    name: "Arlina",
    text: "Wheelwright",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 7,
    name: "Elfreda",
    text: "Aleksandrikin",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 8,
    name: "Anton",
    text: "Mosley",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 9,
    name: "Wolfgang",
    text: "Henningham",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
  {
    id: 10,
    name: "Derwin",
    text: "Guinery",
    image: "",
    base64EncodedImage: "",
    uploaded: false,
  },
];

const arryData = [
  {
    value: "Engineering",
  },
  { value: "Fire" },
  { value: "Marine" },
];
const Engineering = [
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
