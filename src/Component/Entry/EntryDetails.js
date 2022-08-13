import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button } from "@mui/material";
import Header from "../Common/Header";
const EntryDetails = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry } = useSelector((state) => state.Entry.get);
  const { id } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
    if (id) {
      let updated = entry?.data?.filter((r) => r._id === id);
      setData(updated);
    }
  }, [isAuth, id]);
  const innerP = "w-1/2 text-blue-700 font-medium";
  const innerText = "w-1/2";
  const outerDiv = "flex justify-between items-center text-lg";
  return isAuth && data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Entry Details" />
      <div className="bg-white lg:p-5 md:p-5 p-3 rounded-md">
        <div className=" flex lg:flex-row md:flex-row flex-col mb-5">
          <div className="lg:w-1/2 md:w-1/2 flex flex-col w-full ">
            <div className={outerDiv}>
              <p className={innerP}>Refrence Refrence No.</p>
              <p className={innerText}>
                {data[0] && data[0].reportRefrenceNo
                  ? data[0].reportRefrenceNo
                  : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Intimation Date</p>
              <p className={innerText}>
                {data && data[0].intimationDate
                  ? moment(data[0].intimationDate).format("LL")
                  : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Finanical Year</p>
              <p className={innerText}>
                {data[0] && data[0].finanicalYear
                  ? moment(data[0].finanicalYear).format("LL")
                  : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Claim Type</p>
              <p className={innerText}>
                {data && data[0].claimType ? data[0].claimType : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured Claim No.</p>
              <p className={innerText}>
                {data && data[0].claimNo ? data[0].claimNo : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured Policy No.</p>
              <p className={innerText}>
                {data && data[0].policyNo ? data[0].policyNo : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Executing Branch Location</p>
              <p className={innerText}>
                {data && data[0].executingBranchLocation
                  ? data[0].executingBranchLocation
                  : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insurer Name</p>
              <p className={innerText}>
                {data && data[0].insurer ? data[0].insurer : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insurer Location</p>
              <p className={innerText}>
                {data && data[0].insurerCity ? data[0].insurerCity : ""}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured Name</p>
              <p className={innerText}>
                {data && data[0].insured ? data[0].insured : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured Location</p>
              <p className={innerText}>
                {data && data[0].insuredCity ? data[0].insuredCity : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Date of Loss</p>
              <p className={innerText}>
                {data && data[0].date ? data[0].date : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Estimated Loss</p>
              <p className={innerText}>
                {data && data[0].estimatedLoss ? data[0].estimatedLoss : "N/A"}
              </p>
            </div>

            <div className={outerDiv}>
              <p className={innerP}>Cause/Nature of loss</p>
              <p className={innerText}>
                {data && data[0].natureOfLoss ? data[0].natureOfLoss : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Damaged Item/Other</p>
              <p className={innerText}>
                {data && data[0].itemDamage ? data[0].itemDamage : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Loss Location</p>
              <p className={innerText}>
                {data && data[0].lossCity ? data[0].lossCity : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Broker Reference No</p>
              <p className={innerText}>
                {data && data[0].brokerReferenceNumber
                  ? data[0].brokerReferenceNumber
                  : "N/A"}
              </p>
            </div>

            <div className={outerDiv}>
              <p className={innerP}>Broker Name</p>
              <p className={innerText}>
                {data && data[0].broker ? data[0].broker : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Broker Location</p>
              <p className={innerText}>
                {data && data[0].brokerLocation
                  ? data[0].brokerLocation
                  : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Consignor Name</p>
              <p className={innerText}>
                {data && data[0].consignor ? data[0].consignor : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Consignee Name</p>
              <p className={innerText}>
                {data && data[0].consignee ? data[0].consignee : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Invoice No.</p>
              <p className={innerText}>
                {" "}
                {data && data[0].invoiceNo ? data[0].invoiceNo : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Invoice Value</p>
              <p className={innerText}>
                {data && data[0].invoiceValue ? data[0].invoiceValue : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>LR/GR/Other</p>
              <p className={innerText}>
                {data && data[0].lrGrOther ? data[0].lrGrOther : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Vehicle No</p>
              <p className={innerText}>
                {data && data[0].vehicleNumber ? data[0].vehicleNumber : "N/A"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Remarks</p>
              <p className={innerText}>
                {data && data[0]?.remarks ? data[0]?.remarks : "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex">
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              color="error"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EntryDetails;

const StatusData = [{ value: "Approved" }];
