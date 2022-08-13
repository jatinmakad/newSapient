import { Grid, Button, TextField, Autocomplete } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import FomikTextField from "../../Common/FormikComponent/FomikTextField";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEntryFunction,
  UpdateEntryFunction,
} from "../../../Slice/EntrySlice";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Loader from "../../Common/Loader";
import { Cities, State } from "../../Common/Constant/Constant";
import FormikDropdown from "../../Common/FormikComponent/FormikDropdown";
import Header from "../../Common/Header";
const UpdateEntry = () => {
  const formikRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, admin } = useSelector((state) => state.Login);
  const { entry } = useSelector((state) => state.Entry.get);
  const { updateSuccess, isLoading } = useSelector(
    (state) => state.Entry.update
  );
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    if (isAuth) {
      dispatch(GetEntryFunction());
    }
    if (updateSuccess) {
      navigate("/entry");
    }
    if (id) {
      let updated = entry.data.filter((r) => r.uniqueJobId === id)
      console.log(updated,"========")
      if (formikRef.current) {
        formikRef.current.setFieldValue(
          "reportRefrenceNo",
          updated[0].reportRefrenceNo
        );
        formikRef.current.setFieldValue(
          "finanicalYear",
          updated[0].finanicalYear
        );
        formikRef.current.setFieldValue("insurer", updated[0].insurer);
        formikRef.current.setFieldValue("policyNo", updated[0].policyNo);
        formikRef.current.setFieldValue("broker", updated[0].broker);
        formikRef.current.setFieldValue("consignee", updated[0].consignee);
        formikRef.current.setFieldValue("invoiceNo", updated[0].invoiceNo);
        formikRef.current.setFieldValue("intimationDate", updated[0].intimationDate);
        formikRef.current.setFieldValue("city", updated[0].city);
        formikRef.current.setFieldValue("insured", updated[0].insured);
        formikRef.current.setFieldValue(
          "brokerLocation",
          updated[0].brokerLocation
        );
        formikRef.current.setFieldValue("lossCity", updated[0].lossCity);
        formikRef.current.setFieldValue("date", updated[0].date);
        formikRef.current.setFieldValue("age", updated[0].age);
        formikRef.current.setFieldValue("claimType", updated[0].claimType);
        formikRef.current.setFieldValue("claimNo", updated[0].claimNo);
        formikRef.current.setFieldValue("insuredCity", updated[0].insuredCity);
        formikRef.current.setFieldValue("consignor", updated[0].consignor);
        formikRef.current.setFieldValue("state", updated[0].state);
        formikRef.current.setFieldValue(
          "invoiceValue",
          updated[0].invoiceValue
        );
        formikRef.current.setFieldValue(
          "estimatedLoss",
          updated[0].estimatedLoss
        );
        formikRef.current.setFieldValue(
          "natureOfLoss",
          updated[0].natureOfLoss
        );
        formikRef.current.setFieldValue(
          "lrGrOther",
          updated[0].lrGrOther
        );
        formikRef.current.setFieldValue(
          "vehicleNumber",
          updated[0].vehicleNumber
        );
        formikRef.current.setFieldValue(
          "itemDamage",
          updated[0].itemDamage
        );
        formikRef.current.setFieldValue(
          "executingBranchLocation",
          updated[0].executingBranchLocation
        );
        formikRef.current.setFieldValue("insurer", updated[0].insurer);
        formikRef.current.setFieldValue("remark", updated[0].remark);
        formikRef.current.setFieldValue("brokerReferenceNumber", updated[0].brokerReferenceNumber);
      }
    }
  }, [isAuth, id, updateSuccess]);
  const validationSchema = Yup.object({
    // reportRefrenceNo: Yup.number().required("Required"),
    // finanicalYear: Yup.string().required("Required"),
    // insuer: Yup.string().required("Required"),
    // policyNo: Yup.string().required("Required"),
    // broker: Yup.string().required("Required"),
    // consignee: Yup.string().required("Required"),
    // invoiceNo: Yup.string().required("Required"),
    // month: Yup.string().required("Required"),
    // intimation: Yup.string().required("Required"),
    // city: Yup.string().required("Required"),
    // insured: Yup.string().required("Required"),
    // brokerLocation: Yup.string().required("Required"),
    // lossCity: Yup.string().required("Required"),
    // date: Yup.string().required("Required"),
    // age: Yup.string().required("Required"),
    // claimType: Yup.string().required("Required"),
    // claimNo: Yup.string().required("Required"),
    // insuredCity: Yup.string().required("Required"),
    // consignor: Yup.string().required("Required"),
    // state: Yup.string().required("Required"),
    // invoiceValue: Yup.string().required("Required"),
    // executingBranchLocation: Yup.string().required("Required"),
    // insurer: Yup.string().required("Required"),
    claimType: Yup.string().required("Required"),
    insured: Yup.string().required("Required"),
    intimation: Yup.string().required("Required"),
    insurer: Yup.string().required("Required"),
    reportRefrenceNo: Yup.number().required("Required"),
    remark:Yup.string(),
  });
  const initialValues = {
    reportRefrenceNo: "",
    finanicalYear: new Date(),
    insurer: "",
    policyNo: "",
    broker: "",
    consignee: "",
    invoiceNo: "",
    month: new Date(),
    intimationDate: new Date(),
    city: "",
    insured: "",
    brokerLocation: "",
    lossCity: "",
    date: new Date(),
    age: "",
    claimType: "",
    claimNo: "",
    insuredCity: "",
    insurerCity: "",
    consignor: "",
    state: "",
    invoiceValue: "",
    executingBranchLocation: "",
    insurer: "",
    remark: "",
    estimatedLoss: "",
    natureOfLoss: "",
    itemDamage: "",
    vehicleNumber: "",
    lrGrOther: "",
    brokerReferenceNumber: "",
  };
  const onSubmit = (values) => {
    console.log(values,"vslues-----")
    dispatch(UpdateEntryFunction(id, values));
  };
  return (
    <div className="m-2 md:m-10 mt-4 p-2 md:p-5 rounded-3xl">
      <Header title="Update Entry" />
      {id ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ errors, handleChange, values, touched, setFieldValue }) =>
          
            isLoading ? (
              <Loader />
            ) : (
              <Form className="rounded-sm lg:p-4 pt-5 pb-5 sm:lg-3 lg-3">
              <Grid lg={12} md={12} sm={12} xs={12} container spacing={2}>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Report Refrence No."
                    handleChange={handleChange}
                    name="reportRefrenceNo"
                    type="number"
                    value={values.reportRefrenceNo}
                    error={
                      touched.reportRefrenceNo &&
                      Boolean(errors.reportRefrenceNo)
                    }
                    helperText={
                      touched.reportRefrenceNo ? errors.reportRefrenceNo : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Intimation Date</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("intimationDate", e)}
                        value={values.intimationDate}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            sx={{ background: "#fff" }}
                            error={
                              touched.intimationDate &&
                              Boolean(errors.intimationDate)
                            }
                            helperText={
                              touched.intimationDate
                                ? errors.intimationDate
                                : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Finanical Year</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["year"]}
                        onChange={(e) => setFieldValue("finanicalYear", e)}
                        value={values.finanicalYear}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            sx={{ background: "#fff" }}
                            error={
                              touched.finanicalYear &&
                              Boolean(errors.finanicalYear)
                            }
                            helperText={
                              touched.finanicalYear ? errors.finanicalYear : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FormikDropdown
                    heading="Claim Type"
                    handleChange={handleChange}
                    name="claimType"
                    value={values.claimType}
                    error={touched.claimType && Boolean(errors.claimType)}
                    helperText={touched.claimType ? errors.claimType : ""}
                    data={claimTypeData}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insured Claim No."
                    handleChange={handleChange}
                    name="claimNo"
                    value={values.claimNo}
                    type="text"
                    error={touched.claimNo && Boolean(errors.claimNo)}
                    helperText={touched.claimNo ? errors.claimNo : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insured Policy No."
                    handleChange={handleChange}
                    type="text"
                    name="policyNo"
                    value={values.policyNo}
                    error={touched.policyNo && Boolean(errors.policyNo)}
                    helperText={touched.policyNo ? errors.policyNo : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Executing Branch Location</p>
                    <Autocomplete
                      value={values.executingBranchLocation}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("executingBranchLocation", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          sx={{ background: "#fff" }}
                          fullWidth
                          {...params}
                          error={
                            touched.executingBranchLocation &&
                            Boolean(errors.executingBranchLocation)
                          }
                          placeholder="Executing Branch Location"
                          helperText={
                            touched.executingBranchLocation
                              ? errors.executingBranchLocation
                              : ""
                          }
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insurer Name"
                    type="text"
                    handleChange={handleChange}
                    name="insurer"
                    value={values.insurer}
                    error={touched.insurer && Boolean(errors.insurer)}
                    helperText={touched.insurer ? errors.insurer : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Insurer Location</p>
                    <Autocomplete
                      value={values.insurerCity}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("insurerCity", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ background: "#fff" }}
                          placeholder="Insurer City"
                          {...params}
                          error={
                            touched.insurerCity && Boolean(errors.insurerCity)
                          }
                          helperText={
                            touched.insurerCity ? errors.insurerCity : ""
                          }
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insured Name"
                    handleChange={handleChange}
                    name="insured"
                    type="text"
                    value={values.insured}
                    error={touched.insured && Boolean(errors.insured)}
                    helperText={touched.insured ? errors.insured : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Insured Location</p>
                    <Autocomplete
                      value={values.insuredCity}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("insuredCity", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ background: "#fff" }}
                          placeholder="Insured City"
                          {...params}
                          error={
                            touched.insuredCity && Boolean(errors.insuredCity)
                          }
                          helperText={
                            touched.insuredCity ? errors.insuredCity : ""
                          }
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Date of Loss</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("date", e)}
                        value={values.date}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{ background: "#fff" }}
                            size="small"
                            error={touched.date && Boolean(errors.date)}
                            helperText={touched.date ? errors.date : ""}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Estimated Loss"
                    handleChange={handleChange}
                    type="text"
                    value={values.estimatedLoss}
                    name="estimatedLoss"
                    error={
                      touched.estimatedLoss && Boolean(errors.estimatedLoss)
                    }
                    helperText={
                      touched.estimatedLoss ? errors.estimatedLoss : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Cause / Nature of loss"
                    handleChange={handleChange}
                    type="text"
                    value={values.natureOfLoss}
                    name="natureOfLoss"
                    error={touched.natureOfLoss && Boolean(errors.natureOfLoss)}
                    helperText={touched.natureOfLoss ? errors.natureOfLoss : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Damaged Item / Other"
                    handleChange={handleChange}
                    type="text"
                    value={values.itemDamage}
                    name="itemDamage"
                    error={touched.itemDamage && Boolean(errors.itemDamage)}
                    helperText={touched.itemDamage ? errors.itemDamage : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Loss Location</p>
                    <Autocomplete
                      value={values.lossCity}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("lossCity", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          placeholder="Loss City"
                          fullWidth
                          sx={{ background: "#fff" }}
                          {...params}
                          error={touched.lossCity && Boolean(errors.lossCity)}
                          helperText={touched.lossCity ? errors.lossCity : ""}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Broker Reference No"
                    handleChange={handleChange}
                    type="number"
                    name="brokerReferenceNumber"
                    value={values.brokerReferenceNumber}
                    error={
                      touched.brokerReferenceNumber &&
                      Boolean(errors.brokerReferenceNumber)
                    }
                    helperText={
                      touched.brokerReferenceNumber
                        ? errors.brokerReferenceNumber
                        : ""
                    }
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Broker Name"
                    handleChange={handleChange}
                    type="text"
                    value={values.broker}
                    name="broker"
                    error={touched.broker && Boolean(errors.broker)}
                    helperText={touched.broker ? errors.broker : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Broker Location"
                    handleChange={handleChange}
                    name="brokerLocation"
                    type="text"
                    value={values.brokerLocation}
                    error={
                      touched.brokerLocation && Boolean(errors.brokerLocation)
                    }
                    helperText={
                      touched.brokerLocation ? errors.brokerLocation : ""
                    }
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Consignor Name"
                    handleChange={handleChange}
                    name="consignor"
                    value={values.consignor}
                    error={touched.consignor && Boolean(errors.consignor)}
                    helperText={touched.consignor ? errors.consignor : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Consignee Name"
                    handleChange={handleChange}
                    type="text"
                    name="consignee"
                    value={values.consignee}
                    error={touched.consignee && Boolean(errors.consignee)}
                    helperText={touched.consignee ? errors.consignee : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Invoice No."
                    handleChange={handleChange}
                    type="text"
                    name="invoiceNo"
                    value={values.invoiceNo}
                    error={touched.invoiceNo && Boolean(errors.invoiceNo)}
                    helperText={touched.invoiceNo ? errors.invoiceNo : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Invoice Value"
                    handleChange={handleChange}
                    name="invoiceValue"
                    type="text"
                    value={values.invoiceValue}
                    error={touched.invoiceValue && Boolean(errors.invoiceValue)}
                    helperText={touched.invoiceValue ? errors.invoiceValue : ""}
                  />
                </Grid>

                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="LR/GR/ Other"
                    handleChange={handleChange}
                    name="lrGrOther"
                    value={values.lrGrOther}
                    type="text"
                    error={touched.lrGrOther && Boolean(errors.lrGrOther)}
                    helperText={touched.lrGrOther ? errors.lrGrOther : ""}
                  />
                </Grid>
                <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Vehicle No"
                    handleChange={handleChange}
                    name="vehicleNumber"
                    value={values.vehicleNumber}
                    type="text"
                    error={
                      touched.vehicleNumber && Boolean(errors.vehicleNumber)
                    }
                    helperText={
                      touched.vehicleNumber ? errors.vehicleNumber : ""
                    }
                  />
                </Grid>

                <Grid lg={12} md={12} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Other/Remarks"
                    handleChange={handleChange}
                    name="remark"
                    type="text"
                    value={values.remark}
                    error={touched.remark && Boolean(errors.remark)}
                    helperText={touched.remark ? errors.remark : ""}
                  />
                </Grid>

                {/* <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">Month</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={(e) => setFieldValue("month", e)}
                        value={values.month}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{ background: "#fff" }}
                            size="small"
                            error={touched.month && Boolean(errors.month)}
                            helperText={touched.month ? errors.month : ""}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid> */}

                {/* <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">City</p>
                    <Autocomplete
                      value={values.city}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("city", newValue);
                      }}
                      size="small"
                      options={Cities}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ background: "#fff" }}
                          {...params}
                          error={touched.city && Boolean(errors.city)}
                          placeholder="City"
                          helperText={touched.city ? errors.city : ""}
                        />
                      )}
                    />
                  </div>
                </Grid> */}
                {/* <Grid lg={4} md={6} sm={12} xs={12} item>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2">State</p>
                    <Autocomplete
                      value={values.state}
                      fullWidth
                      onChange={(event, newValue) => {
                        setFieldValue("state", newValue);
                      }}
                      size="small"
                      options={State}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          placeholder="State"
                          fullWidth
                          sx={{ background: "#fff" }}
                          {...params}
                          error={touched.state && Boolean(errors.state)}
                          helperText={touched.state ? errors.state : ""}
                        />
                      )}
                    />
                  </div>
                </Grid> */}
                {/* <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Age"
                    handleChange={handleChange}
                    name="age"
                    type="number"
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age ? errors.age : ""}
                  />
                </Grid> */}

                {/* <Grid lg={4} md={6} sm={12} xs={12} item>
                  <FomikTextField
                    heading="Insurer"
                    handleChange={handleChange}
                    name="insurer"
                    type="text"
                    error={touched.insurer && Boolean(errors.insurer)}
                    helperText={touched.insurer ? errors.insurer : ""}
                  />
                </Grid> */}

                <Grid
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  marginTop="20px"
                  justifyContent="flex-end"
                  display="flex"
                  item
                >
                  <div className="flex items-center">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ marginRight: "10px" }}
                      color="primary"
                    >
                      Update
                    </Button>
                    <Link to="/entry">
                      <Button variant="contained" color="error">
                        Close
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Form>
            )
          }
        </Formik>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UpdateEntry;

const claimTypeData = [
  {
    value: "Engineering",
  },
  { value: "Fire" },
  { value: "Marine" },
];
