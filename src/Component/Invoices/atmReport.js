import React, { useState } from "react";
import styled from "styled-components";
import "../../Component/Assets/custom.css";
import initStates from "./initStates";
import DeleteIcon from "@mui/icons-material/Delete";

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ButtonComponent = styled.div`
  z-index: 1;
  width: 129px;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 10px 0 10px 21px;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  overflow: hidden;
  transition: color 0.4s ease-in-out;
  border-radius: 5px;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: #a6a6a6;
    transform-origin: center;
    transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
    transition: transform 0.45s ease-in-out;
  }

  &:hover {
    cursor: pointer;
    color: #161616;
  }

  &:hover&::before {
    transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
  }
`;

export default function AtmDocReport() {
  const printReport = () => {
    document.getElementById("footer").style.pageBreakAfter = "always";
    window.print();
  };
  const [show, setShow] = useState(false);
  const [newData, setNewData] = React.useState(initStates);
  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  // const [newItems, setNewItems] = useState(initStates?.files);

  const handleItemsChange = (event, index, name) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      let newFormValues = [...newData?.files];
      newFormValues[index][name] = e.target.result;
      setNewData({ ...newData, files: newFormValues });
    };
  };

  const handleAdd = () => {
    setNewData({ ...newData, files: [...newData?.files, { image: "" }] });
  };

  const removeImage = (i) => {
    let newFormValues = [...newData?.files];
    newFormValues.splice(i, 1);
    setNewData({ ...newData, files: newFormValues });
  };

  return (
    <MainDiv>
      <div className="inner-div">
        {!show ? (
          <div className="display-flex flex-row col-gap-10">
            <ButtonComponent onClick={() => setShow(true)}>
              Edit Details
            </ButtonComponent>
            <ButtonComponent onClick={printReport}>
              Print Report
            </ButtonComponent>
          </div>
        ) : (
          <ButtonComponent onClick={() => setShow(false)}>
            Save Details
          </ButtonComponent>
        )}
        <br />
        <div className="display-flex justify-content-flex-start flex-col row-gap-10">
          {/* <CommonHead /> */}
          <br />
          <b>
            REF NO. : &nbsp;{" "}
            {show === false ? (
              newData?.refNum1 || <i className="link-color">(Ref No.)</i>
            ) : (
              <input
                name="refNum1"
                id="subject-init"
                placeholder="Enter Ref no."
                type="text"
                value={newData.refNum1}
                onChange={(e) => handleChange(e)}
              />
            )}{" "}
            <br />
            DATED : &nbsp;{" "}
            {show === false ? (
              newData?.dated1 || <i className="link-color">(Date)</i>
            ) : (
              <input
                name="dated1"
                id="subject-init"
                placeholder="Enter Date"
                type="date"
                value={newData.dated1}
                onChange={(e) => handleChange(e)}
              />
            )}{" "}
            <br />
          </b>
          <br />
          <div className="w-300">
            <b>To, </b>
            <div>
              {show === false ? (
                newData?.toAddress1 || <i className="link-color">(Address)</i>
              ) : (
                <textarea
                  name="toAddress1"
                  id="subject"
                  placeholder="Enter Address"
                  type="text"
                  value={newData.toAddress1}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </div>
          </div>
          <br />
          <div className="display-flex flex-col align-item-center justify-content-center">
            <h3>
              <b>
                <u>FINAL SURVEY REPORT</u>
              </b>
            </h3>
            <br /> <br />
            <div>
              {" "}
              <b>Claim under Insurance Policy</b> : &nbsp;{" "}
              {show === false ? (
                newData?.claimUnderInsurance || (
                  <i className="link-color">(Claim Under Insurance)</i>
                )
              ) : (
                <input
                  name="claimUnderInsurance"
                  id="subject-init"
                  placeholder="Enter Claim ..."
                  type="text"
                  value={newData.claimUnderInsurance}
                  onChange={(e) => handleChange(e)}
                />
              )}{" "}
              <br />
              <b>A/C </b> : &nbsp;{" "}
              {show === false ? (
                newData?.account1 || <i className="link-color">(Account)</i>
              ) : (
                <input
                  name="account1"
                  id="subject-init"
                  placeholder="Enter Account"
                  type="text"
                  value={newData.account1}
                  onChange={(e) => handleChange(e)}
                />
              )}{" "}
              <br />
              <b>Claim No</b>: &nbsp;{" "}
              {show === false ? (
                newData?.claimNumber1 || (
                  <i className="link-color">(Claim Number)</i>
                )
              ) : (
                <input
                  name="claimNumber1"
                  id="subject-init"
                  placeholder="Enter Claim Number"
                  type="text"
                  value={newData.claimNumber1}
                  onChange={(e) => handleChange(e)}
                />
              )}{" "}
            </div>
          </div>
          <br />
          <div>
            Dear Sir,
            <br /> Pursuant to the instructions received from your office on
            &nbsp;
            {show === false ? (
              newData.invoiceDate || <i className="link-color">(Date)</i>
            ) : (
              <input
                id="subject-init"
                name="invoiceDate"
                placeholder="Date"
                type="date"
                value={newData.invoiceDate}
                onChange={(e) => handleChange(e)}
              />
            )}{" "}
            &nbsp; to carry out the Survey &amp; Assessment of the reported loss
            suffered by the Insured&nbsp;
            {show === false ? (
              newData?.invoiceName || <i className="link-color">(name)</i>
            ) : (
              <input
                id="subject-init"
                name="invoiceName"
                placeholder="name"
                type="text"
                value={newData.invoiceName}
                onChange={(e) => handleChange(e)}
              />
            )}{" "}
            on account to loss/ damage to their CRM having CRM ID:&nbsp;
            {show === false ? (
              newData?.crmWithDescription || (
                <i className="link-color">(Atm Id & Statement)</i>
              )
            ) : (
              <input
                id="subject-init"
                name="crmWithDescription"
                placeholder="e.g. ATM ID(ABCD123)"
                type="text"
                value={newData.crmWithDescription}
                onChange={(e) => handleChange(e)}
              />
            )}{" "}
            ; we fixed up an appointment with Insured’s representative, fixed-up
            appointment over phone and accordingly visited the affected site/
            premises as mention above on the next day. we visited the location
            of loss on is situated at . The Survey/ verification were carried
            out, pertinent details of loss were noted, discussions held with
            Insured’s representative and photographs were also taken. The
            Photographs and Intimation mail are enclosed as [Annexure-1 & 2].
            Thereafter, we have raised a Letter of Requirement to the Insured’s
            officials and regularly followed up with them in order to obtain the
            necessaryinformation/documents related to this claim vide our mail/
            reminders and phone calls and the Insured has provided us the same.
            Now, based on the Survey / verification carried out, and scrutinise
            the various documents / information provided by the Insured. We are
            submitting our “Final Survey Report” as under:
          </div>
        </div>
        <br />
        <div>
          <b>A. POLICY PARTICULARS :</b>
          <br />
          <br />
          <p>
            {show === false ? (
              newData?.policyDetails || (
                <i className="link-color">(Policy Details)</i>
              )
            ) : (
              <textarea
                id="subject"
                name="policyDetails"
                placeholder="Enter Policy Details"
                type="text"
                value={newData.policyDetails}
                onChange={(e) => handleChange(e)}
              />
            )}
          </p>
          <br />
          <p>
            The Insured has obtained a Package Policy providing umbrella cover
            under various Sections against varied risks/perils. The details
            thereof are as under:
          </p>
        </div>
        <br />
        <FirstTable show={show} newData={newData} handleChange={handleChange} />
        <br />
        <br />
        {/* <CommonFooter /> */}
        <div id="footer"></div>
        <p></p>
      </div>
      {/* */}
      <div className="inner-div">
        <br />
        <div className="display-flex justify-content-flex-start flex-col row-gap-10">
          {/* <CommonHead /> */}
          <br />
          <CommonPolicyTable
            show={show}
            newData={newData}
            handleChange={handleChange}
          />
          <br />
        </div>
        Copy of Insurance Policy and Annexure are enclosed as [Annexure-3].
        <br />
        <div>
          <br />
          <b>B. BRIEF LOSS AND SURVEY PARTICULARS: :</b>
          <br />
          <br />
          <CommonSurveyTable
            show={show}
            newData={newData}
            handleChange={handleChange}
          />
        </div>
        <br />
        Claim Form and Claim Bill is enclosed as [Annexure-4].
        <div>
          <br />
          <b> C. ABOUT THE INCIDENT :</b>
          <br />
          <br />
          {show === false ? (
            newData?.aboutIncident || (
              <i className="link-color">(About The Incident)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="aboutIncident"
              placeholder="Enter about the incident"
              type="text"
              value={newData.aboutIncident}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <div className="display-flex justify-content-flex-start flex-col row-gap-10"></div>
        <div>
          <b>D. OUR SURVEY/ VERIFICATION AND OBSERVATION</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.ourSurvey || (
              <i className="link-color">(Our Survery Details)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="ourSurvey"
              placeholder="Enter Our Survery Details"
              type="text"
              value={newData.ourSurvey}
              onChange={(e) => handleChange(e)}
            />
          )}{" "}
          = The details of the loss are mentioned as under:
          <br />
          <br />
          <div className="m-auto w-600">
            <CommonLossTable
              show={show}
              newData={newData}
              handleChange={handleChange}
            />
            <LossMentionedTable
              show={show}
              newData={newData}
              handleChange={handleChange}
            />
          </div>
          <br />
          <br />
          = Upon receipt of requisite documents we scrutinized the same, the
          details of the same are mentioned below :
          <br /> <br />
          <b>SERVICE ENGINEER INSPECTION REPORT:</b>
          <br />
          <p>
            {show === false ? (
              newData?.serviceEngReport || (
                <i className="link-color">
                  (Service Engineer Inspection Report)
                </i>
              )
            ) : (
              <textarea
                id="subject"
                name="serviceEngReport"
                placeholder="Enter Service Engineer Inspection Report"
                type="text"
                value={newData.serviceEngReport}
                onChange={(e) => handleChange(e)}
              />
            )}
          </p>
          <br />
          <b>REPAIR ESTIMATE:</b>
          <br />
          <p>
            {show === false ? (
              newData?.repairEstimate || (
                <i className="link-color">(Repair Estimate)</i>
              )
            ) : (
              <textarea
                id="subject"
                name="repairEstimate"
                placeholder="Enter Repair Estimate"
                type="text"
                value={newData.repairEstimate}
                onChange={(e) => handleChange(e)}
              />
            )}
          </p>
          <br />
          <b>POLICE REPORT/ POLICE INTIMATION LETTER</b>
          <br />
          <p>
            {show === false ? (
              newData?.policeReport || (
                <i className="link-color">
                  (Police Report and Intimation Letter)
                </i>
              )
            ) : (
              <textarea
                id="subject"
                name="policeReport"
                placeholder="Enter Police Report and intimation letter"
                type="text"
                value={newData.policeReport}
                onChange={(e) => handleChange(e)}
              />
            )}
          </p>
          <br />
        </div>
        <br />
        <br />
        <div>
          <b>E. CLAIM OF THE INSURED</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.claimOfInsured || (
              <i className="link-color">(Claim Of Insured)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="claimOfInsured"
              placeholder="Enter claim of insured"
              type="text"
              value={newData.claimOfInsured}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <br />
        <div>
          <b>F. COMMENT ON LIABILITY:</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.commentOnLiability || (
              <i className="link-color">(Comment On Liability)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="commentOnLiability"
              placeholder="Enter Comment On Liability"
              type="text"
              value={newData.commentOnLiability}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <div>
          <b>G.ADEQUACY OF SUM INSURED:</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.adequecyOfSumInsured || (
              <i className="link-color">(Adequecy of Sum Insured)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="adequecyOfSumInsured"
              placeholder="Enter Adequecy of Sum insured"
              type="text"
              value={newData.adequecyOfSumInsured}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <br />
        {/* <CommonFooter /> */}
        <div id="footer"></div>
        <p></p>
        <br />
      </div>
      {/* */}
      <div className="inner-div">
        <br />
        <div className="display-flex justify-content-flex-start flex-col row-gap-10">
          {/* <CommonHead /> */}
          <br />
        </div>
        <br />
        <div>
          <b>On the basis of above we have checked the UI factor as under:</b>
        </div>
        <br />
        {/* <CommonAssesmentTable /> */}
        <br />
        <br />
        <div>
          <b>H.DEPRECIATION:</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.depreciation || (
              <i className="link-color">(Depreciation)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="depreciation"
              placeholder="Enter Depreciation"
              type="text"
              value={newData.depreciation}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <div>
          <b>I. SALVAGE:</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.salvageDetails || <i className="link-color">(Salvage)</i>
          ) : (
            <textarea
              id="subject"
              name="salvageDetails"
              placeholder="Enter Salvage"
              type="text"
              value={newData.salvageDetails}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <div>
          <b>J. EXCESS:</b>
        </div>
        <br />
        <div>
          {show === false ? (
            newData?.excessDetails || <i className="link-color">(Excess)</i>
          ) : (
            <textarea
              id="subject"
              name="excessDetails"
              placeholder="Enter Excess"
              type="text"
              value={newData.excessDetails}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>
        <br />
        <div>
          <b>K. COMPUTATION OF LOSS:</b>
        </div>
        <br />
        <div>
          {"> "}
          {show === false ? (
            newData?.lossComputationDetails || (
              <i className="link-color">(Computation of Details)</i>
            )
          ) : (
            <textarea
              id="subject"
              name="lossComputationDetails"
              placeholder="Enter Computation of Details"
              type="text"
              value={newData.lossComputationDetails}
              onChange={(e) => handleChange(e)}
            />
          )}
        </div>

        <div id="footer"></div>
        <p></p>
      </div>
      {/* */}
      <div className="inner-div">
        <br />
        <div className="display-flex justify-content-flex-start flex-col row-gap-10">
          {/* <CommonHead /> */}
          <br />
          <br />
        </div>
        <br />
        <CommonAssesmentTable
          show={show}
          newData={newData}
          handleChange={handleChange}
        />
        <MergeAssesmentTable
          show={show}
          newData={newData}
          handleChange={handleChange}
        />
        <br /> <br />
        <div>
          Loss has been computed as{" "}
          <b>
            Rs.{" "}
            {show === false ? (
              newData?.lossComputedInWords || (
                <i className="link-color">(In Amount and Words.)</i>
              )
            ) : (
              <input
                id="subject"
                name="lossComputedInWords"
                placeholder="Enter In Amount and Words."
                type="text"
                value={newData.lossComputedInWords}
                onChange={(e) => handleChange(e)}
              />
            )}
          </b>{" "}
          <br /> <br />
          <b>This report is being submitted without prejudice</b> and is subject
          to the terms and conditions of the policy of insurance and reserving
          the right of the Surveyor to alter / amend the report for unintended
          error, if any. <br /> <br /> For{" "}
          <b>M/s. SAPIENT INSURANCE SURVEYORS &amp; LOSS ASSESSORS Pvt Ltd.</b>
        </div>
        <br />
        <br />
        <br />
        <b>
          [AUTHORISED SIGNATORY]
          <br /> ENCLOSURES
        </b>
        <br /> <br />
        <CommonSignatoryTable
          show={show}
          newData={newData}
          handleChange={handleChange}
        />
        <br /> <br />
        {show === false ? (
          <div className="display-flex flex-col justify-content-center row-gap-20">
            {newData?.files.map((item) => {
              return <img src={item?.image} />;
            })}
          </div>
        ) : (
          <>
            &nbsp;
            <ButtonComponent onClick={handleAdd}>Add Images</ButtonComponent>
            {newData?.files?.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  &nbsp;&nbsp;&nbsp;
                  <br />
                  <br />
                  <br />
                  <input
                    id="image"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={(e) => handleItemsChange(e, idx, "image")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <div className="display-flex flex-row col-gap-20">
                    <img src={item?.image} />
                    <DeleteIcon
                      className="text-red-700 cursor-pointer"
                      onClick={() => removeImage(idx)}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </>
        )}
        <br />
        <br />
        <div className="p-t-50-per">
          <CommonGstDetailsTable
            show={show}
            newData={newData}
            handleChange={handleChange}
          />
        </div>
        <br />
        <br />
        <div className=" p-l-30">
          <div className="w-300">
            {show === false ? (
              newData?.toAddress2 || <i className="link-color">(Address)</i>
            ) : (
              <textarea
                name="toAddress2"
                id="subject"
                placeholder="Enter Address"
                type="text"
                value={newData.toAddress2}
                onChange={(e) => handleChange(e)}
              />
            )}
          </div>
          <br />
          <b>
            GSTIN/Unique ID:{" "}
            {show === false ? (
              newData?.gstNumberSeprate || (
                <i className="link-color">(GSTIN/Unique ID)</i>
              )
            ) : (
              <input
                name="gstNumberSeprate"
                id="subject-init"
                placeholder="Enter GST Details ..."
                type="text"
                value={newData.gstNumberSeprate}
                onChange={(e) => handleChange(e)}
              />
            )}
          </b>
          <br />
          <b>
            State Code:{" "}
            {show === false ? (
              newData?.stateCode || <i className="link-color">(State Code)</i>
            ) : (
              <input
                name="stateCode"
                id="subject-init"
                placeholder="Enter State Code"
                type="text"
                value={newData.stateCode}
                onChange={(e) => handleChange(e)}
              />
            )}
          </b>
          <br />
        </div>
        <br />
        <br />
        <div className="m-auto w-600">
          <CommonAccountTable
            show={show}
            newData={newData}
            handleChange={handleChange}
          />
        </div>
        <br />
        <br />
        <br />
        <br />
        {/* <CommonFooter /> */}
        <div id="footer"></div>
        <br />
        <br />
        <br />
        <br /> <br />
        <br />
        <p></p>
      </div>
      {/* */}
      <div className="inner-div">
        <br />
        <div className="display-flex justify-content-flex-start flex-col row-gap-10">
          {/* <CommonHead /> */}
          <br />
        </div>
        <br />
        <CommonDesciptionTable
          show={show}
          newData={newData}
          handleChange={handleChange}
        />
        <br />
        <b>
          Rupees:
          {show === false ? (
            newData?.lastRupees || <i className="link-color">(In Words.)</i>
          ) : (
            <input
              id="subject"
              name="lastRupees"
              placeholder="Enter In Words."
              type="text"
              value={newData.lastRupees}
              onChange={(e) => handleChange(e)}
            />
          )}
        </b>
        <br />
        <br />
        <br />
        <div className="display-flex justify-content-space-between">
          <div>
            <b>
              For SAPIENT INSURANCE SURVEYORS <br />
              &amp; LOSS ASSESSORS PVT. LTD.
            </b>
          </div>
          <div>Pre-receipted</div>
        </div>
        <br />
        <br />
        <b>[AUTHORISED SIGNATORY]</b>
        <br /> <br />
        <div>
          <b>
            <u>Note:-</u>
          </b>
          &nbsp; Please RTGS/NEFT in the favour of M/s. Sapient Insurance
          Surveyors &amp; Loss Assessors Pvt. Ltd., A/c. No. 15577630000097,
          IFSC Code No. HDFC0001557, HDFC Bank, B-36, Lajpat Nagar-II, New
          Delhi-110024.
        </div>
        <br /> <br />
        {/* <CommonFooter /> */}
        <div id="footer"></div>
        <p></p>
      </div>
    </MainDiv>
  );
}

// Table Functions:

function FirstTable({ handleChange, show, newData }) {
  return (
    <>
      <table id="customers">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>Insurer</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.insurer || <i className="link-color">(Insurer Adress)</i>
            ) : (
              <input
                id="subject"
                name="insurer"
                placeholder="insurer"
                type="text"
                value={newData.insurer}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Insured</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.insured || (
                <i className="link-color">(Insured Address)</i>
              )
            ) : (
              <input
                id="subject"
                name="insured"
                placeholder="insured"
                type="text"
                value={newData.insured}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Policy No.</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.policyNumber || (
                <i className="link-color">(Policy Number)</i>
              )
            ) : (
              <input
                id="subject"
                name="policyNumber"
                placeholder="Policy Number"
                type="text"
                value={newData.policyNumber}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Period of insurance</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.periodofInsurance || (
                <i className="link-color">(Period of Insurance)</i>
              )
            ) : (
              <input
                id="subject"
                name="periodofInsurance"
                placeholder="Period of Insurance"
                type="text"
                value={newData.periodofInsurance}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
      </table>
    </>
  );
}

function CommonPolicyTable({ handleChange, show, newData }) {
  return (
    <>
      <table id="customers">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>Subject matter insured</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.subjectMatterInsured || (
                <i className="link-color">(Subject Matter Insured)</i>
              )
            ) : (
              <input
                id="subject"
                name="subjectMatterInsured"
                placeholder="Subject Matter Insured"
                type="text"
                value={newData?.subjectMatterInsured}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Sum insured</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.sumInsured || <i className="link-color">(Sum Insured)</i>
            ) : (
              <input
                id="subject"
                name="sumInsured"
                placeholder="Sum Insured"
                type="text"
                value={newData.sumInsured}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Risk Locations</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.riskLocations || (
                <i className="link-color">(Risk Location)</i>
              )
            ) : (
              <input
                id="subject"
                name="riskLocations"
                placeholder="Risk Location"
                type="text"
                value={newData?.riskLocations}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Loss location </td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.lossLocation || (
                <i className="link-color">(Loss Location)</i>
              )
            ) : (
              <input
                id="subject"
                name="lossLocation"
                placeholder="Loss Location"
                type="text"
                value={newData.lossLocation}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Coverage</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.coverage || <i className="link-color">(Coverage)</i>
            ) : (
              <input
                id="subject"
                name="coverage"
                placeholder="Coverage"
                type="text"
                value={newData.coverage}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Excess </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.excess || <i className="link-color">(Excess)</i>
            ) : (
              <input
                id="subject"
                name="excess"
                placeholder="Excess"
                type="text"
                value={newData.excess}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Depreciation</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.depreciation || (
                <i className="link-color">(Depreciation)</i>
              )
            ) : (
              <input
                id="subject"
                name="depreciation"
                placeholder="Depreciation"
                type="text"
                value={newData.depreciation}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
      </table>
    </>
  );
}

function CommonSurveyTable({ handleChange, show, newData }) {
  return (
    <>
      <table id="customers">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>Date of loss</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.lossDate || <i className="link-color">(Loss Date)</i>
            ) : (
              <input
                id="subject"
                name="lossDate"
                placeholder="Loss Date"
                type="text"
                value={newData.lossDate}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Intimation to insurers </td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.intimationToInsurers || (
                <i className="link-color">(Intimation To Insurers)</i>
              )
            ) : (
              <input
                id="subject"
                name="intimationToInsurers"
                placeholder="Intimation To Insurers"
                type="text"
                value={newData.intimationToInsurers}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Survey Allotment date </td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.surveyAllotmentDate || (
                <i className="link-color">(Survey Allotment Date)</i>
              )
            ) : (
              <input
                id="subject"
                name="surveyAllotmentDate"
                placeholder="Survey Allotment Date"
                type="text"
                value={newData.surveyAllotmentDate}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Date of Survey</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.surveyDate || <i className="link-color">(Survey Date)</i>
            ) : (
              <input
                id="subject"
                name="surveyDate"
                placeholder="Survey Date"
                type="text"
                value={newData.surveyDate}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Reason for delay</td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.reasonForDelay || (
                <i className="link-color">(Reason For Delay)</i>
              )
            ) : (
              <input
                id="subject"
                name="reasonForDelay"
                placeholder="Reason For Delay"
                type="text"
                value={newData.reasonForDelay}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Name of the CRM </td>
          <td>.</td>
          <td>
            {show === false ? (
              newData?.crmName || <i className="link-color">(CRM Name)</i>
            ) : (
              <input
                id="subject"
                name="crmName"
                placeholder="CRM Name"
                type="text"
                value={newData.crmName}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Location of loss and Survey </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.lossSurveyLocation || (
                <i className="link-color">(Location of loss and Survey)</i>
              )
            ) : (
              <input
                id="subject"
                name="lossSurveyLocation"
                placeholder="Location of loss and
                Survey"
                type="text"
                value={newData.lossSurveyLocation}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Site ID </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.siteID || <i className="link-color">(Site ID)</i>
            ) : (
              <input
                id="subject"
                name="siteID"
                placeholder="Site ID"
                type="text"
                value={newData.siteID}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Person contacted </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.personContacted || (
                <i className="link-color">(Person Contacted)</i>
              )
            ) : (
              <input
                id="subject"
                name="personContacted"
                placeholder="Person Contacted"
                type="text"
                value={newData.personContacted}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Item/ property affected</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.itemAffected || (
                <i className="link-color">(Item/ property affected)</i>
              )
            ) : (
              <input
                id="subject"
                name="itemAffected"
                placeholder="Item/ property affected"
                type="text"
                value={newData.itemAffected}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Cause of loss </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.lossCause || (
                <i className="link-color">(Cause of loss)</i>
              )
            ) : (
              <input
                id="subject"
                name="lossCause"
                placeholder="Cause of loss"
                type="text"
                value={newData.lossCause}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Insured’s estimate </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.insuredEstimate || (
                <i className="link-color">(Insured’s estimate)</i>
              )
            ) : (
              <input
                id="subject"
                name="insuredEstimate"
                placeholder="Insured’s estimate"
                type="text"
                value={newData.insuredEstimate}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>FIR/Media Report</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.reportFIR || (
                <i className="link-color">(FIR/Media Report)</i>
              )
            ) : (
              <input
                id="subject"
                name="reportFIR"
                placeholder="FIR/Media Report"
                type="text"
                value={newData.reportFIR}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Security Guard</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.securityGuard || (
                <i className="link-color">(Security Guard)</i>
              )
            ) : (
              <input
                id="subject"
                name="securityGuard"
                placeholder="Security Guard"
                type="text"
                value={newData.securityGuard}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
      </table>
    </>
  );
}

function CommonLossTable({ show, newData, handleChange }) {
  return (
    <table id="customers">
      <tr>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td>
          <b>CRM ID</b>{" "}
        </td>
        <td>
          {" "}
          {show === false ? (
            newData?.crmID2 || <i className="link-color">(CRM ID)</i>
          ) : (
            <input
              id="subject"
              name="crmID2"
              placeholder="CRM ID"
              type="text"
              value={newData.crmID2}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>
          <b>Invoice Date</b>
        </td>
        <td>
          {" "}
          {show === false ? (
            newData?.invoice2 || <i className="link-color">(Invoice)</i>
          ) : (
            <input
              id="subject"
              name="invoice2"
              placeholder="Invoice"
              type="text"
              value={newData.invoice2}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
    </table>
  );
}
function LossMentionedTable({ show, newData, handleChange }) {
  return (
    <table id="customers">
      <tr>
        <th>Sno</th>
        <th>ItemDescription</th>
        <th>Damaged Quantity</th>
      </tr>
      <tr>
        <td>1</td>
        <td>
          {show === false ? (
            newData?.itemDescription2 || (
              <i className="link-color">(Item Description)</i>
            )
          ) : (
            <input
              id="subject"
              name="itemDescription2"
              placeholder="Item Description"
              type="text"
              value={newData.itemDescription2}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
        <td>
          {show === false ? (
            newData?.damagedQuantity || (
              <i className="link-color">(Damaged Quantity)</i>
            )
          ) : (
            <input
              id="subject"
              name="damagedQuantity"
              placeholder="Damaged Qty"
              type="text"
              value={newData.damagedQuantity}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
    </table>
  );
}
function CommonAssesmentTable({ show, newData, handleChange }) {
  return (
    <table id="customers">
      <tr>
        <th>Sno</th>
        <th>ItemDescription</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Amount (Rs.)</th>
      </tr>
      <tr>
        <td>1</td>
        <td>
          {show === false ? (
            newData?.itemDescription || (
              <i className="link-color">(Item Description)</i>
            )
          ) : (
            <input
              id="subject"
              name="itemDescription"
              placeholder="Item Description"
              type="text"
              value={newData.itemDescription}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
        <td>
          {show === false ? (
            newData?.qty || <i className="link-color">(Quantity)</i>
          ) : (
            <input
              id="subject"
              name="qty"
              placeholder="Quantity"
              type="text"
              value={newData.qty}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
        <td>
          {show === false ? (
            newData?.rate || <i className="link-color">(Rate)</i>
          ) : (
            <input
              id="subject"
              name="rate"
              placeholder="Rate"
              type="text"
              value={newData.rate}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
        <td>
          {show === false ? (
            newData?.amount || <i className="link-color">(Amount)</i>
          ) : (
            <input
              id="subject"
              name="amount"
              placeholder="Amount"
              type="text"
              value={newData.amount}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
    </table>
  );
}

function MergeAssesmentTable({ show, newData, handleChange }) {
  return (
    <table id="customers">
      <tr>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td>Total Loss</td>
        <td>
          {show === false ? (
            newData?.totalLoss1 || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="totalLoss1"
              placeholder="Total Loss"
              type="text"
              value={newData.totalLoss1}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>
          Less Depreciation @10% per annum from the date of manufacturing i.e.
          December, 2020 (15%)
        </td>
        <td>
          {show === false ? (
            newData?.lessDepreciation || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="lessDepreciation"
              placeholder="Less Depreciation ..."
              type="text"
              value={newData.lessDepreciation}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>After deduction of depreciation</td>
        <td>
          {show === false ? (
            newData?.afterDeduction || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="afterDeduction"
              placeholder="After deduction"
              type="text"
              value={newData.afterDeduction}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>Less Salvage </td>
        <td>
          {show === false ? (
            newData?.lessSalvage || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="lessSalvage"
              placeholder="Less Salvage"
              type="text"
              value={newData.lessSalvage}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>
          <b>Sub Total</b>
        </td>
        <td>
          {show === false ? (
            newData?.subTotal || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="subTotal"
              placeholder="Sub Total"
              type="text"
              value={newData.subTotal}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>
          Less Excess (5% of the claimed amount subject to minimum of Rs.
          20,000/-)
        </td>
        <td>
          {show === false ? (
            newData?.lessExcess || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="lessExcess"
              placeholder="Less Excess ..."
              type="text"
              value={newData.lessExcess}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>Total Loss</td>
        <td>
          {show === false ? (
            newData?.totalLoss2 || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="totalLoss2"
              placeholder="Total Loss"
              type="text"
              value={newData.totalLoss2}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>
          {" "}
          <b>Net loss Assessed</b>
        </td>
        <td>
          {show === false ? (
            newData?.netLossAssessed || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="netLossAssessed"
              placeholder="Net loss Assessed"
              type="text"
              value={newData.netLossAssessed}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
    </table>
  );
}

function CommonSignatoryTable({ show, newData, handleChange }) {
  return (
    <>
      <table id="customers">
        <tr>
          <th>
            <u>Refer Annexure</u>
          </th>
          <th>
            <u>Description</u>
          </th>
        </tr>
        <tr>
          <td>
            <b>Annexure- 1</b>
          </td>
          <td>
            {" "}
            {show === false ? (
              newData?.annexure1 || <i className="link-color">(Annexure 1)</i>
            ) : (
              <input
                id="subject"
                name="annexure1"
                placeholder="Enter Annexure 1"
                type="text"
                value={newData.annexure1}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 2</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure2 || <i className="link-color">(Annexure 2)</i>
            ) : (
              <input
                id="subject"
                name="annexure2"
                placeholder="Enter Annexure 2"
                type="text"
                value={newData.annexure2}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 3</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure3 || <i className="link-color">(Annexure 3)</i>
            ) : (
              <input
                id="subject"
                name="annexure3"
                placeholder="Enter Annexure 3"
                type="text"
                value={newData.annexure3}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 4</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure4 || <i className="link-color">(Annexure 4)</i>
            ) : (
              <input
                id="subject"
                name="annexure4"
                placeholder="Enter Annexure 4"
                type="text"
                value={newData.annexure4}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 5</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure5 || <i className="link-color">(Annexure 5)</i>
            ) : (
              <input
                id="subject"
                name="annexure5"
                placeholder="Enter Annexure 5"
                type="text"
                value={newData.annexure5}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 6</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure6 || <i className="link-color">(Annexure 6)</i>
            ) : (
              <input
                id="subject"
                name="annexure6"
                placeholder="Enter Annexure 6"
                type="text"
                value={newData.annexure6}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 7</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure7 || <i className="link-color">(Annexure 7)</i>
            ) : (
              <input
                id="subject"
                name="annexure7"
                placeholder="Enter Annexure 7"
                type="text"
                value={newData.annexure7}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Annexure- 8</b>
          </td>
          <td>
            {show === false ? (
              newData?.annexure8 || <i className="link-color">(Annexure 8)</i>
            ) : (
              <input
                id="subject"
                name="annexure8"
                placeholder="Enter Annexure 8"
                type="text"
                value={newData.annexure8}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
      </table>
    </>
  );
}

function CommonGstDetailsTable({ handleChange, show, newData }) {
  return (
    <>
      <table id="customers">
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>
            <b>Bill No.</b>
          </td>
          <td>
            <b>
              {" "}
              {show === false ? (
                newData?.billNum || <i className="link-color">(Bill Number)</i>
              ) : (
                <input
                  id="subject"
                  name="billNum"
                  placeholder="Bill Number"
                  type="text"
                  value={newData.billNum}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </b>
          </td>
          <td>
            <b>GSTIN/Unique ID</b>
          </td>
          <td>
            <b>
              <u>
                {" "}
                {show === false ? (
                  newData?.gstID || (
                    <i className="link-color">(GSTIN/Unique ID)</i>
                  )
                ) : (
                  <input
                    id="subject"
                    name="gstID"
                    placeholder="GSTIN/Unique ID"
                    type="text"
                    value={newData.gstID}
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </u>
            </b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Ref. No.</b>
          </td>
          <td>
            <b>
              {" "}
              {show === false ? (
                newData?.refNum || <i className="link-color">(Ref. No.)</i>
              ) : (
                <input
                  id="subject"
                  name="refNum"
                  placeholder="Ref. No."
                  type="text"
                  value={newData.refNum}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </b>
          </td>
          <td>
            <b>Pan Number</b>
          </td>
          <td>
            <b>
              <u>
                {" "}
                {show === false ? (
                  newData?.pan || <i className="link-color">(PAN Number)</i>
                ) : (
                  <input
                    id="subject"
                    name="pan"
                    placeholder="Pan Number"
                    type="text"
                    value={newData.pan}
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </u>
            </b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Date</b>
          </td>
          <td>
            <b>
              {" "}
              {show === false ? (
                newData?.billDate || <i className="link-color">(Bill Date)</i>
              ) : (
                <input
                  id="subject"
                  name="billDate"
                  placeholder="Bill Date"
                  type="date"
                  value={newData.billDate}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </b>
          </td>
          <td>
            <b>Service Code</b>
          </td>
          <td>
            <b>
              <u>
                {" "}
                {show === false ? (
                  newData?.serviceCode || (
                    <i className="link-color">(Service Code)</i>
                  )
                ) : (
                  <input
                    id="subject"
                    name="serviceCode"
                    placeholder="Service Code"
                    type="text"
                    value={newData.serviceCode}
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </u>
            </b>
          </td>
        </tr>
      </table>
    </>
  );
}

function CommonAccountTable({ show, newData, handleChange }) {
  return (
    <>
      <table id="customers">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>Account</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.account || <i className="link-color">(Account)</i>
            ) : (
              <input
                id="subject"
                name="account"
                placeholder="Account"
                type="text"
                value={newData.account}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Policy No</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.policyNum || (
                <i className="link-color">(Policy Number)</i>
              )
            ) : (
              <input
                id="subject"
                name="policyNum"
                placeholder="Policy Number"
                type="text"
                value={newData.policyNum}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>Subject</td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.subject || <i className="link-color">(Subject)</i>
            ) : (
              <input
                id="subject"
                name="subject"
                placeholder="Subject"
                type="text"
                value={newData.subject}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>CRM ID. </td>
          <td>.</td>
          <td>
            {" "}
            {show === false ? (
              newData?.crmId || <i className="link-color">(CRM Id)</i>
            ) : (
              <input
                id="subject"
                name="crmId"
                placeholder="CRM Id"
                type="text"
                value={newData.crmId}
                onChange={(e) => handleChange(e)}
              />
            )}
          </td>
        </tr>
      </table>
    </>
  );
}

function CommonDesciptionTable({ show, newData, handleChange }) {
  return (
    <table id="customers">
      <tr>
        <th>S#</th>
        <th>Description</th>
        <th>Amount (Rs.)</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Professional Fee (as per Fire &amp; Engineering Schedule)</td>
        <td>
          {" "}
          {show === false ? (
            newData?.professionalFee || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="professionalFee"
              placeholder="Professional Fee ..."
              type="text"
              value={newData.professionalFee}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Conveyance Charges (to &amp; fro)</td>
        <td>
          {" "}
          {show === false ? (
            newData?.conveyanceCharges || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="conveyanceCharges"
              placeholder="Conveyance Charges ..."
              type="text"
              value={newData.conveyanceCharges}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>Photographs Charges (12 nos. @Rs.10/- each)</td>
        <td>
          {" "}
          {show === false ? (
            newData?.photographsCharges || (
              <i className="link-color">(in Rs.)</i>
            )
          ) : (
            <input
              id="subject"
              name="photographsCharges"
              placeholder="Photographs Charges ..."
              type="text"
              value={newData.photographsCharges}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <b>Total</b>
        </td>
        <td>
          <b>
            {" "}
            {show === false ? (
              newData?.total3 || <i className="link-color">(in Rs.)</i>
            ) : (
              <input
                id="subject"
                name="total3"
                placeholder="Total"
                type="text"
                value={newData.total3}
                onChange={(e) => handleChange(e)}
              />
            )}
          </b>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>Add: IGST @18% Rs.</td>
        <td>
          {" "}
          {show === false ? (
            newData?.addIGST || <i className="link-color">(in Rs.)</i>
          ) : (
            <input
              id="subject"
              name="addIGST"
              placeholder="Add: IGST ..."
              type="text"
              value={newData.addIGST}
              onChange={(e) => handleChange(e)}
            />
          )}
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <b>Net Amount</b>
        </td>
        <td>
          <b>
            {" "}
            {show === false ? (
              newData?.netAmount || <i className="link-color">(in Rs.)</i>
            ) : (
              <input
                id="subject"
                name="netAmount"
                placeholder="Net Amount"
                type="text"
                value={newData.netAmount}
                onChange={(e) => handleChange(e)}
              />
            )}
          </b>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <b>Rounded Off</b>
        </td>
        <td>
          <b>
            {" "}
            {show === false ? (
              newData?.roundedOff || <i className="link-color">(in Rs.)</i>
            ) : (
              <input
                id="subject"
                name="roundedOff"
                placeholder="Rounded Off"
                type="text"
                value={newData.roundedOff}
                onChange={(e) => handleChange(e)}
              />
            )}
          </b>
        </td>
      </tr>
    </table>
  );
}

// function CommonHead() {
//   return (
//     <img
//       className="w-300 h-100 m-l-25-negative"
//       src="https://res.cloudinary.com/dgdwdl5wm/image/upload/v1655575087/sapient/WhatsApp_Image_2022-06-18_at_11.27.49_PM_zskssa.jpg"
//     />
//   );
// }

// function CommonFooter() {
//   return (
//     <div className="display-flex justify-content-center">
//       {" "}
//       <img src="https://res.cloudinary.com/dgdwdl5wm/image/upload/v1655575011/sapient/WhatsApp_Image_2022-06-18_at_11.26.31_PM_auuvdb.jpg" />{" "}
//     </div>
//   );
// }
