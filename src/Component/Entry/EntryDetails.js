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
      let updated = entry.data.filter((r) => r._id === id);
      setData(updated);
    }
  }, [isAuth, id]);
  const innerP = "w-2/5 text-blue-700 font-medium";
  const innerText = "w-3/5";
  const outerDiv = "flex justify-between items-center text-lg";
  return isAuth && data ? (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Entry Details" />
      <div className="bg-white lg:p-5 md:p-5 p-3 rounded-md">
        <div className=" flex lg:flex-row md:flex-row flex-col mb-5">
          <div className="lg:w-1/2 md:w-1/2 flex flex-col w-full">
            <div className={outerDiv}>
              <p className={innerP}>Refrence</p>
              <p className={innerText}>{data[0].reportRefrenceNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Claim No.</p>
              <p className={innerText}>{data[0].claimNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Claim Type</p>
              <p className={innerText}>{data[0].claimType}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Consignee</p>
              <p className={innerText}>{data[0].consignee}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Consignor</p>
              <p className={innerText}>{data[0].consignor}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Date</p>
              <p className={innerText}>{moment(data[0].date).format("L")}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Invocie No.</p>
              <p className={innerText}>{data[0].invoiceNo}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Invoice Value</p>
              <p className={innerText}>{data[0].invoiceValue}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Finanical Year</p>
              <p className={innerText}>
                {moment(data[0].financialYear).format("YYYY")}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insurer</p>
              <p className={innerText}>{data[0].insuer}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured</p>
              <p className={innerText}>{data[0].insured}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Insured City</p>
              <p className={innerText}>{data[0].insuredCity}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>State</p>
              <p className={innerText}>{data[0].state}</p>
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 flex flex-col w-full ">
            <div className={outerDiv}>
              <p className={innerP}>Policy No.</p>
              <p className={innerText}>
                {data[0].policyNo ? data[0].policyNo : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Broker</p>
              <p className={innerText}>
                {data[0].broker ? data[0].broker : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Broker Location</p>
              <p className={innerText}>
                {data[0].brokerLocation ? data[0].brokerLocation : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Age</p>
              <p className={innerText}>{data[0].age ? data[0].age : "-"}</p>
            </div>

            <div className={outerDiv}>
              <p className={innerP}>City</p>
              <p className={innerText}>{data[0].city ? data[0].city : "-"}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>State</p>
              <p className={innerText}>{data[0].state ? data[0].state : "-"}</p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Intimation</p>
              <p className={innerText}>
                {data[0].intimation ? data[0].intimation : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Loss City</p>
              <p className={innerText}>
                {data[0].lossCity ? data[0].lossCity : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Month</p>
              <p className={innerText}>
                {" "}
                {data[0].month ? moment(data[0].month).format("MM") : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Current Job Status</p>
              <p className={innerText}>
                {data[0].currentJobStatus ? data[0].currentJobStatus : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Current Job Holding Team</p>
              <p className={innerText}>
                {data[0].currentJobHoldingTeam
                  ? data[0].currentJobHoldingTeam
                  : "-"}
              </p>
            </div>
            <div className={outerDiv}>
              <p className={innerP}>Vehicle Number</p>
              <p className={innerText}>
                {data[0].vehicleNumber ? data[0].vehicleNumber : "-"}
              </p>
            </div>
          </div>
        </div>
        {location.state === "yourWork" ? (
          <>
            <p className="text-xl font-medium mb-4">Discrepancy</p>
            {data[0].discrepancy.map((r) => (
              <p>
                <span className={innerP}>Comment :</span>{" "}
                <span className={innerText}>{r.comment}</span>
              </p>
            ))}
          </>
        ) : (
          ""
        )}
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
