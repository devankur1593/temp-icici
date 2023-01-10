import React, { useEffect, useRef, useState } from "react";

import Slider from "react-rangeslider";

import axios from "axios";
import { useForm } from "react-hook-form";

import successIcon from "../assets/images/success.svg";
import failedIcon from "../assets/images/failed.svg";
import tickIcon from "../assets/images/tick-icon.svg";
import rsIcon from "../assets/images/rs-icon.svg";

import { onSendOtp, onVerifyOtp } from "../service/apiService";

import "react-rangeslider/lib/index.css";
import "../App.css";

const FormComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageOne, setPageOne] = useState("active");
  const [pageTwo, setPageTwo] = useState("");
  const [pageThree, setPageThree] = useState("");
  const [pageFour, setPageFour] = useState("");
  const [pageStatus, setPageStatus] = useState("");

  const [name, setName] = useState("");
  const [otherCityName, setOtherCityName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [pan, setPan] = useState("");
  const [employmentState, setEmploymentState] = useState("salaried");
  const [accountStatus, setAccountStatus] = useState("noAccount");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("");
  const [mobile, setMobile] = useState("");
  const [selfEmployedStatus, setSelfEmployedStatus] = useState("Yes");
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState();
  const [otherCity, setOtherCity] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);

  const inputDayReference = useRef(null);
  const inputMonthReference = useRef(null);
  const inputYearReference = useRef(null);
  const inputOtpReference = useRef(null);

  let cancelToken;

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  useEffect(() => {
    if (pageNumber === 1) {
      setPageOne("active");
      setPageTwo("ongoing");
      setPageThree("ongoing");
      setPageFour("ongoing");
    }
    if (pageNumber === 2) {
      setPageOne("complete");
      setPageTwo("active");
      setPageThree("ongoing");
      setPageFour("ongoing");
    }
    if (pageNumber === 3) {
      setPageOne("complete");
      setPageTwo("complete");
      setPageThree("active");
      setPageFour("ongoing");
    }
    if (pageNumber === 4) {
      setPageOne("complete");
      setPageTwo("complete");
      setPageThree("complete");
      setPageFour("active");
    }
    if (pageNumber === 5) {
      setPageOne("complete");
      setPageTwo("complete");
      setPageThree("complete");
      setPageFour("complete");
    }
  }, [pageNumber]);

  const handleChangeHorizontal = (value) => {
    value > 0 && setSalaryRange(value);
  };

  const horizontalLabels = {
    0: "Low",
    300000: "High",
  };

  const getSalary = (value) => value;

  const onNameChange = (e) => {
    const re = /^[a-zA-Z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setName(e.target.value);
    }
  };
  const onOtherCityChange = (e) => {
    const re = /^[a-zA-Z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOtherCityName(e.target.value);
    }
  };

  const onCityChange = (e) => {
    const selectedCity = e.target.value;
    setOtherCity(selectedCity === "Other City");
    if (otherCity) {
      clearErrors("otherCity");
    }
  };

  const onEmploymentStatus = (val) => {
    setEmploymentState(val);
  };

  const onAccountCheck = (val) => {
    setAccountStatus(val);
  };

  const onCompanyChange = async (e) => {
    const searchText = e.target.value;
    setCompany(searchText);
    const baseURL =
      "https://lapps-in21.leadsquared.com/executebylapptoken?name=da_46725_b19b105f&stage=Live&xapikey=10bd548a582140acbbebeb711cd8ea32&type=company";
    if (searchText.length >= 3) {
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Cancelled due to new request");
      }
      cancelToken = axios.CancelToken.source();
      try {
        const serachResults = await axios.post(
          baseURL,
          {
            company: searchText,
          },
          { cancelToken: cancelToken.token }
        );
        const { Data, Count } = serachResults.data.message;
        if (Count > 0) {
          setCompanies(Data);
        } else {
          setCompanies([]);
        }
      } catch (error) {}
    } else if (searchText.length < 3) {
      setCompanies([]);
    }
  };

  const onDayChange = (e) => {
    setIsError(false);
    setError("");
    setDay(e.target.value);
    if (e.target.value === 0 || e.target.value > 31) {
      setIsError(true);
      setError("The day must be between 1 and 31.");
      return;
    }
    if (e.target.value >= 4) {
      inputMonthReference.current.focus();
    }
  };

  const onMonthChange = (e) => {
    setIsError(false);
    setError("");
    setMonth(e.target.value);
    if (e.target.value === 0 || e.target.value > 12) {
      setIsError(true);
      setError("The month must be between 1 and 12.");
      return;
    }
    if (e.target.value >= 2) {
      inputYearReference.current.focus();
    }
  };

  const onYearChange = (e) => {
    const currentYear = new Date().getFullYear();
    setIsError(false);
    setError("");

    if (e.target.value > currentYear) {
      setIsError(true);
      setError("The year must be less than current year.");
      return;
    }
    
    if ((e.target.value.length == 4 && e.target.value < 1900) ) {
      setIsError(true);
      setError("The year must be greater than 1900.");
      return;
    }

    setYear(e.target.value);
  };

  const yearKeyHandler = (e) => {
    if (!`${e.target.value}${e.key}`.match(/^[0-9]{0,4}$/)) {
      // block the input if result does not match
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const monthKeyHandler = (e) => {
    if (!`${e.target.value}${e.key}`.match(/^[0-9]{0,4}$/)) {
      // block the input if result does not match
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const sendOtp = async (mobile) => {
    if (!mobile) {
      return;
    }
    if (mobile.length === 10) {
      try {
        const res = await onSendOtp(mobile);
        if (res.data.message.response.sent) {
          alert("An OTP has been sent to your Mobile number.");
          setOtpStatus(true);
        }
      } catch (error) {
        alert("Error occured while generating OTP.");
      }
    }
  };

  const verifyOtp = async (e) => {
    if (!mobile) {
      alert("please enter mobile number");
      return;
    }
    if (!e.target.value) {
      e.preventDefault();
      return;
    }
    if (e.target.value.length > 5) {
      try {
        const res = await onVerifyOtp(mobile, e.target.value);
        if (res.data.message === "Failure Occured, please check logs") {
          alert("Please enter valid OTP");
          inputOtpReference.current.focus();
          return false;
        }
      } catch (error) {}
    }
  };

  const onMobileChange = (e) => {
    if (e.target.value.length === 10) {
      setMobile(e.target.value.slice(0, 10));
    } else if (e.target.value.length < 10) {
      setMobile(e.target.value);
    }
  };

  const onMobileKeyHandler = (event) => {
    if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,10}$/)) {
      // block the input if result does not match
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  const onOtpKeyHandler = (event) => {
    if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,6}$/)) {
      // block the input if result does not match
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  const onApplyNow = (obj) => {
    setPageNumber(2);
  };

  const onStepTwo = (obj) => {
    setPageNumber(3);
  };

  const onStepThree = (obj) => {
    setPageNumber(4);
  };

  const onSubmitForm = (obj) => {
    let userCity, dob;
    obj.otherCity ? userCity = obj?.otherCity : userCity = obj?.city;
    dob = `${day}-${month}-${year}`;

    if(day == ""  || month == "" || year == ""){
      setIsError(true);
      setError("Date of Birth is required");
      return;
    }
    
    const dataObj = {
      accountState: obj?.accountState,
      city: userCity,
      company: obj?.company,
      email: obj?.email,
      employmentState: obj?.employmentState,
      mobile: obj?.mobile,
      name: obj?.name,
      pan: obj?.pan,
      salaryRange: obj?.salaryRange,
      selfEmployedStatus: obj?.employmentState === 'salaried' ? "No": obj?.selfEmployedStatus,
      otpInput: obj?.otpInput,
      dob:dob
    };
       
    setPageNumber(5);
    setPageStatus('success');
  };

  const goBackPage = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  return (
    <>
      <div className="form-side">
        <div className="stepper">
          <ul>
            <li
              className={`${pageOne === "active" && "active"} ${
                pageOne === "complete" && "completed"
              }`}
            >
              <img src={tickIcon} alt="" />
            </li>
            <li
              className={`${pageTwo === "active" && "active"} ${
                pageTwo === "complete" && "completed"
              }`}
            >
              <img src={tickIcon} alt="" />
            </li>
            <li
              className={`${pageThree === "active" && "active"} ${
                pageThree === "complete" && "completed"
              }`}
            >
              <img src={tickIcon} alt="" />
            </li>
            <li
              className={`${pageFour === "active" && "active"} ${
                pageFour === "complete" && "completed"
              }`}
            >
              <img src={tickIcon} alt="" />
            </li>
          </ul>
        </div>
        {pageOne === "active" && (
          <div className="steps-div" id="step-one">
            <form noValidate className="form">
              <div className="form-box">
                <h3>How do we get in touch?</h3>

                <div className="form-input">
                  <label className="label">
                    Full Name<sup>*</sup>
                  </label>
                  <input
                    className="input-box"
                    type="text"
                    value={name}
                    name="name"
                    placeholder="Enter name here"
                    autoComplete="off"
                    {...register("name", {
                      required: "This is required field.",
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters.",
                      },
                      onChange: (e) => onNameChange(e),
                    })}
                  />
                  {errors.name ? (
                    <>
                      {errors.name.type === "required" && (
                        <span className="error-msg">{errors.name.message}</span>
                      )}
                      {errors.name.type === "minLength" && (
                        <span className="error-msg">{errors.name.message}</span>
                      )}
                    </>
                  ) : null}
                </div>
                {/* Email */}
                <div className="form-input">
                  <label className="label">
                    Email Address<sup>*</sup>
                  </label>
                  <input
                    className="input-box"
                    type="email"
                    name="email"
                    value={email}
                    list="email-options"
                    autoComplete="off"
                    placeholder="yourname@example.com"
                    {...register("email", {
                      required: "This field is required.",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email address.",
                      },
                      onChange: (e) => {
                        setEmail(() => e.target.value);
                        setIsEmailEmpty(false);
                        const data = e.target.value;
                        if (data.includes(".com") || data.includes("co.in")) {
                          setIsEmailEmpty(true);
                        } else {
                          setIsEmailEmpty(false);
                        }
                      },
                    })}
                  />
                  {email.length > 2 ? (
                    !isEmailEmpty ? (
                      <datalist id="email-options">
                        <option value={`${email}@gmail.com`}></option>
                        <option value={`${email}@yahoo.com`}></option>
                        <option value={`${email}@rediffmail.com`}></option>
                        <option value={`${email}@yahoo.co.in`}></option>
                        <option value={`${email}@icloud.com`}></option>
                        <option value={`${email}@outlook.com`}></option>
                      </datalist>
                    ) : null
                  ) : null}

                  {errors.email ? (
                    <>
                      {errors.email.type === "required" && (
                        <span className="error-msg">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email.type === "pattern" && (
                        <span className="error-msg">
                          {errors.email.message}
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
                <div className="form-input">
                  <label className="label">
                    City<sup>*</sup>
                  </label>
                  <select
                    className="input-select"
                    name="city"
                    {...register("city", {
                      required: "This field is required.",
                      onChange: (e) => onCityChange(e),
                    })}
                  >
                    <option value="">Select city</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Other City">Other City</option>
                  </select>
                  {errors.city ? (
                    <>
                      {errors.city.type === "required" && (
                        <span className="error-msg">{errors.city.message}</span>
                      )}
                    </>
                  ) : null}
                  {otherCity ? (
                    <input
                      className="input-box"
                      type="text"
                      name="otherCity"
                      placeholder="Enter City Name"
                      autoComplete="off"
                      value={otherCityName}
                      style={{ marginTop: 20 }}
                      {...register("otherCity", {
                        required: "This is required field.",
                        onChange: (e) => {
                          onOtherCityChange(e);
                          setValue("otherCity", otherCityName);
                        },
                      })}
                    />
                  ) : null}
                  {errors.otherCity ? (
                    <>
                      {errors.otherCity.type === "required" && (
                        <span className="error-msg">
                          {errors.otherCity.message}
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
                {/* Pan */}
                <div className="form-input">
                  <label className="label">
                    Pan Card Number<sup>*</sup>
                  </label>
                  <input
                    className="input-box pan-card"
                    type="text"
                    name="pan"
                    value={pan}
                    maxLength={10}
                    placeholder="ENTER PAN"
                    autoComplete="off"
                    {...register("pan", {
                      required: "This field is required.",
                      pattern: {
                        value: /^[A-Z]{5}\d{4}[A-Z]{1}$/i,
                        message: "Invalid pan number.",
                      },
                      onChange: (e) => setPan(e.target.value.toUpperCase()),
                    })}
                  />
                  {errors.pan ? (
                    <>
                      {errors.pan.type === "required" && (
                        <span className="error-msg">{errors.pan.message}</span>
                      )}
                      {errors.pan.type === "pattern" && (
                        <span className="error-msg">{errors.pan.message}</span>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="btn-box">
                <button
                  className="btn-primary"
                  type="button"
                  onClick={handleSubmit(onApplyNow)}
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        )}
        {pageTwo === "active" && (
          <div className="steps-div" id="step-two">
            <div className="form-box">
              <div className="form-input">
                <label className="label">
                  What is your type of employment?
                </label>
                <div className="checkbox-container">
                  <label
                    className={`custom-checkbox radiobtn ${
                      employmentState === "salaried" ? "active" : ""
                    }`}
                    htmlFor="salaried"
                  >
                    <div>
                      <input
                        type="radio"
                        id="salaried"
                        name="employmentState"
                        defaultValue={"salaried"}
                        defaultChecked={employmentState === "salaried"}
                        {...register("employmentState", {
                          onChange: (e) => {
                            onEmploymentStatus(e.target.value);
                            setSalaryRange("");
                          },
                        })}
                      />
                      <label htmlFor="salaried"></label>
                    </div>
                    <span>Salaried</span>
                  </label>
                  <label
                    className={`custom-checkbox radiobtn ${
                      employmentState === "selfEmployed" ? "active" : ""
                    }`}
                    htmlFor="selfEmployed"
                  >
                    <div>
                      <input
                        type="radio"
                        id="selfEmployed"
                        name="employmentState"
                        defaultValue={"selfEmployed"}
                        {...register("employmentState", {
                          onChange: (e) => {
                            onEmploymentStatus(e.target.value);
                            setSalaryRange("");
                          },
                        })}
                      />
                      <label htmlFor="selfEmployed"></label>
                    </div>
                    <span>Self Employed</span>
                  </label>
                </div>
              </div>
              <div className="form-input">
                <label className="label">
                  {employmentState === "salaried"
                    ? "Salary (Per Month)"
                    : "Gross Turnover Last Year"}
                </label>
                <input
                  className="input-box"
                  type="text"
                  name="salaryRange"
                  value={salaryRange}
                  autoComplete="off"
                  placeholder="0"
                  {...register("salaryRange", {
                    required: "This field is required.",
                    onChange: (e) => {
                      setSalaryRange(Number(e.target.value));
                      setValue("salaryRange", Number(salaryRange));
                    },
                  })}
                  onKeyPress={(e) => onMobileKeyHandler(e)}
                />
                  {errors.salaryRange ? (
                    <>
                      {errors.salaryRange.type === "required" && (
                        <span className="error-msg">
                          {errors.salaryRange.message}
                        </span>
                      )}
                    </>
                  ) : null}
                <div className="salary-carousal">
                  <Slider
                    min={0}
                    max={employmentState === "salaried" ? 300000 : 10000000}
                    value={Number(salaryRange)}
                    labels={horizontalLabels}
                    tooltip={false}
                    format={getSalary}
                    onChange={handleChangeHorizontal}
                    name="salaryRange"
                  />
                  <div className="label-container">
                    <span className="amount">
                      <img src={rsIcon} alt="rs icon" />0
                    </span>
                    <span className="amount">
                      <img src={rsIcon} alt="rs icon" />
                      {employmentState === "salaried" ? "3,00,000+" : "1Cr+"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Company */}
              {employmentState === "salaried" ? (
                <div className="form-input" style={{ postion: "relative" }}>
                  <label className="label">
                    Company<sup>*</sup>
                  </label>
                  <input
                    className="input-box"
                    type="text"
                    name="company"
                    value={companyName}
                    placeholder="Enter Compnay"
                    autoComplete="off"
                    {...register("company", {
                      required: "This field is required.",
                      onChange: (e) => {
                        onCompanyChange(e);
                        setCompanyName(e.target.value);
                        setCompany(companyName);
                        companies.length > 0 ? setValue("company", e.target.value) : setValue("company", companyName);
                      },
                    })}
                  />
                  {errors.company ? (
                    <>
                      {errors.company.type === "required" && (
                        <span className="error-msg">
                          {errors.company.message}
                        </span>
                      )}
                    </>
                  ) : null}
                  {companies.length ? (
                    <div className="company-selection-container">
                      <ul className="company-selection">
                        {companies.map((item) => {
                          return (
                            <li
                              {...register("companyName")}
                              key={item.Company_Name}
                              onClick={() => {
                                setCompanyName(item.Company_Name);
                                setCompanies([]);
                                companies.length > 0 ? setValue("company", item.Company_Name) : setValue("company", companyName);
                              }}
                            >
                              {item.Company_Name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="form-input">
                  <label className="label">
                    Has your ITR been acknowledged by income tax department?
                  </label>
                  <select
                    className="input-select"
                    defaultValue={selfEmployedStatus}
                    name="selfEmployedStatus"
                    {...register("selfEmployedStatus", {
                      required: "This field is required.",
                      onChange: (e) => setSelfEmployedStatus(e.target.value),
                    })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.selfEmployedStatus ? (
                    <>
                      {errors.selfEmployedStatus.type === "required" && (
                        <span className="error-msg">
                          {errors.selfEmployedStatus.message}
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
              )}
            </div>
            <div className="btn-grp space-between">
              <button
                className="btn-outline"
                type="button"
                onClick={() => goBackPage(1)}
              >
                Back
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={handleSubmit(onStepTwo)}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {pageThree === "active" && (
          <div className="steps-div" id="step-three">
            <div className="form-box">
              <h3>Almost there!</h3>
              <div className="form-input">
                <label className="label">
                  Do you have any account with ICICI Bank?
                </label>
                <div className="checkbox-container">
                  <label
                    className={`custom-checkbox radiobtn ${
                      accountStatus === "noAccount" && "active"
                    }`}
                    htmlFor="noAccount"
                  >
                    <div>
                      <input
                        type="radio"
                        id="noAccount"
                        name="accountState"
                        defaultValue={"noAccount"}
                        defaultChecked={accountStatus === "noAccount"}
                        {...register("accountState", {
                          onChange: (e) => onAccountCheck(e.target.value),
                        })}
                      />
                      <label htmlFor="noAccount"></label>
                    </div>
                    <span>No Account</span>
                  </label>
                  <label
                    className={`custom-checkbox radiobtn ${
                      accountStatus === "salaryAccount" && "active"
                    }`}
                    htmlFor="salaryAccount"
                  >
                    <div>
                      <input
                        type="radio"
                        id="salaryAccount"
                        name="accountState"
                        defaultValue={"salaryAccount"}
                        autoComplete="off"
                        {...register("accountState", {
                          onChange: (e) => onAccountCheck(e.target.value),
                        })}
                      />
                      <label htmlFor="salaryAccount"></label>
                    </div>
                    <span>Salary Account</span>
                  </label>
                  <label
                    className={`custom-checkbox radiobtn ${
                      accountStatus === "scAccount" && "active"
                    }`}
                    htmlFor="scAccount"
                  >
                    <div>
                      <input
                        type="radio"
                        id="scAccount"
                        name="accountState"
                        defaultValue={"scAccount"}
                        {...register("accountState", {
                          onChange: (e) => onAccountCheck(e.target.value),
                        })}
                      />
                      <label htmlFor="scAccount"></label>
                    </div>
                    <span>Savings / Current Account</span>
                  </label>
                  <label
                    className={`custom-checkbox radiobtn ${
                      accountStatus === "loanAccount" && "active"
                    }`}
                    htmlFor="loanAccount"
                  >
                    <div>
                      <input
                        type="radio"
                        id="loanAccount"
                        name="accountState"
                        defaultValue={"loanAccount"}
                        {...register("accountState", {
                          onChange: (e) => onAccountCheck(e.target.value),
                        })}
                      />
                      <label htmlFor="loanAccount"></label>
                    </div>
                    <span>Home / Car / Personal Loan or Credit Card</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="btn-grp space-between">
              <button
                className="btn-outline"
                type="button"
                onClick={() => goBackPage(2)}
              >
                Back
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={handleSubmit(onStepThree)}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {pageFour === "active" && (
          <div className="steps-div" id="step-four">
            <div className="form-box">
              <h3>Almost done!</h3>
              <div className="form-input">
                <label className="label">
                  Mobile No.<sup>*</sup>
                </label>
                <div className="input-with-btn">
                  <input
                    type="text"
                    value={"+91"}
                    className="prefix-text"
                    disabled
                  />
                  <input
                    type="number"
                    className="input-text"
                    name="mobile"
                    value={mobile}
                    autoComplete="off"
                    placeholder="10 digit phone number"
                    {...register("mobile", {
                      required: "This is required field.",
                      minLength: {
                        value: 10,
                        message: "Please enter at least 10 characters.",
                      },
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message:
                          "Please enter mobile number starting with 6/7/8/9.",
                      },
                      onChange: (e) => onMobileChange(e),
                    })}
                    onKeyPress={(e) => onMobileKeyHandler(e)}
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => sendOtp(mobile)}
                  >
                    Get OTP
                  </button>
                </div>
                {errors.mobile ? (
                  <>
                    {errors.mobile.type === "required" && (
                      <span className="error-msg">{errors.mobile.message}</span>
                    )}
                    {errors.mobile.type === "minLength" && (
                      <span className="error-msg">{errors.mobile.message}</span>
                    )}
                    {errors.mobile.type === "pattern" && (
                      <span className="error-msg">{errors.mobile.message}</span>
                    )}
                  </>
                ) : null}
                {otpStatus ? (
                  <div className="form-input" style={{ marginTop: 20 }}>
                    <input
                      type="number"
                      className="input-box"
                      name="otpInput"
                      ref={inputOtpReference}
                      maxLength={6}
                      autoComplete="off"
                      placeholder="Enter OTP received"
                      onKeyPress={(e) => onOtpKeyHandler(e)}
                      {...register("otpInput", {
                        required: "This is required field.",
                        minLength: {
                          value: 6,
                          message: "Please enter at least 6 characters.",
                        },
                        onChange: (e) => verifyOtp(e),
                      })}
                    />
                    {errors.otpInput ? (
                      <>
                        {errors.otpInput.type === "required" && (
                          <span className="error-msg">
                            {errors.otpInput.message}
                          </span>
                        )}
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="form-input">
                <label className="label">
                  Date of Birth<sup>*</sup>
                </label>
                <div className="input-with-select">
                  <input
                    type="text"
                    ref={inputDayReference}
                    className="input-day"
                    maxength="2"
                    value={day}
                    name="day"
                    placeholder="DD"
                    autoComplete="off"                    
                    onKeyPress={(e) => monthKeyHandler(e)}
                    {...register("day", {
                      required: "This is required field.",
                      onChange: (e) => {
                        onDayChange(e);
                      },
                    })}
                  />
                  <input
                    type="number"
                    ref={inputMonthReference}
                    className="input-month"
                    maxLength="2"
                    value={month}
                    name="month"
                    placeholder="MM"
                    autoComplete="off"                  
                    onKeyPress={(e) => monthKeyHandler(e)}
                    {...register("month", {
                      required: "This is required field.",
                      onChange: (e) => {
                        onMonthChange(e);
                      },
                    })}
                  />
                  <input
                    type="number"
                    ref={inputYearReference}
                    className="input-year"
                    maxLength="4"
                    value={year}
                    name="years"
                    placeholder="YYYY"
                    autoComplete="off"                   
                    onKeyPress={(e) => yearKeyHandler(e)}
                    {...register("years", {
                      required: "This is required field.",
                      onChange: (e) => {
                        onYearChange(e);
                      },
                    })}
                  />
                </div>
               {(errors.day || errors.month || errors.years) ? (
                      <>
                        {(errors.day?.type === "required" || errors.month?.type === "required" || errors.years?.type === "required") && (
                          <span className="error-msg">
                            {"Date of Birth is required field."}
                          </span>
                        )}
                      </>
                    ) : null}
                    
                {isError && <span className="error-msg">{error}</span>}
              </div>
              <div className="terms-condition">
                <input
                  type="checkbox"
                  name="terms"
                  {...register("terms", {
                    required: "This field is required",
                  })}
                />
                <p>
                  I agree to ICICI Bank’s{" "}
                  <a href="https://www.icicibank.com/terms-condition/credit-card-terms-and-conditions.page?_ga=2.219407065.1527723375.1673242573-603367429.1672897298&_gac=1.181594643.1673242573.EAIaIQobChMI67DziqWo_AIVhwVyCh2KwAF8EAAYASAAEgLjTvD_BwE" target="_blank">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="https://www.icicibank.com/managed-assets/docs/personal/cards/MITC_cc.pdf?_ga=2.241273666.1527723375.1673242573-603367429.1672897298&_gac=1.216154658.1673242573.EAIaIQobChMI67DziqWo_AIVhwVyCh2KwAF8EAAYASAAEgLjTvD_BwE" target="_blank">
                    Most Important Terms & Conditions
                  </a>
                </p>
              </div>
              {errors.terms ? (
                <>
                  {errors.terms.type === "required" && (
                    <span className="error-msg">{errors.terms.message}</span>
                  )}
                </>
              ) : null}
            </div>
            <div className="btn-grp space-between">
              <button
                className="btn-outline"
                type="button"
                onClick={() => goBackPage(3)}
              >
                Back
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={handleSubmit(onSubmitForm)}
              >
                Finish
              </button>
            </div>
          </div>
        )}
        {pageStatus === "success" && (
          <div className="steps-div" id="step-success">
            <div className="result-box">
              <img src={successIcon} alt="success" />
              <h4>
                You are Eligible for <br />
                ICICI Bank Credit Card!
              </h4>
              <p>
                Thank you for your interest, our executives will connect with
                you shortly
              </p>
            </div>
          </div>
        )}
        {pageStatus === "failed" && (
          <div className="steps-div" id="step-failed">
            <div className="result-box">
              <img src={failedIcon} alt="success" />
              <h4>
                Sorry! You are currently NOT eligible for an <br />
                ICICI Bank Credit Card
              </h4>
              <p>
                We thank you for your time. You may consider re-applying in the
                future.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormComponent;
