import * as React from "react";

// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import axios from "axios";
import { useForm } from "react-hook-form";

import iciciBankLogo from "../src/assets/images/icici-bank-logo.svg";
import refuel from "../src/assets/images/refuel.png";
import cardPayment from "../src/assets/images/card_payment.png";
import nfcCard from "../src/assets/images/nfc_card.png";
import reward from "../src/assets/images/reward.png";

import creditCard from "../src/assets/images/credit-card.png";
import anilKapoor from "../src/assets/images/anil-kapoor.png";

import successIcon from "../src/assets/images/success.svg";
import failedIcon from "../src/assets/images/failed.svg";
import tickIcon from "../src/assets/images/tick-icon.svg";

import "./App.css";
import { onSendOtp, onVerifyOtp } from "./service/apiService";

function App() {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageOne, setPageOne] = React.useState("active");
  const [pageTwo, setPageTwo] = React.useState("");
  const [pageThree, setPageThree] = React.useState("");
  const [pageFour, setPageFour] = React.useState("");
  const [pageStatus, setPageStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [otherCity, setOtherCity] = React.useState(false);
  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState("");
  const [salaryRange, setSalaryRange] = React.useState(0);
  const [pan, setPan] = React.useState("");
  const [employmentState, setEmploymentState] = React.useState("salaried");
  const [accountStatus, setAccountStatus] = React.useState("noAccount");
  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState("");
  const [mobile, setMobile] = React.useState('');

  const inputDayReference = React.useRef(null);
  const inputMonthReference = React.useRef(null);
  const inputYearReference = React.useRef(null);
  const inputOtpReference = React.useRef(null);

  let cancelToken;

  React.useEffect(() => {
    if (pageNumber === 1) {
      setPageOne("active");
    }
    if (pageNumber === 2) {
      setPageOne("complete");
      setPageTwo("active");
    }
    if (pageNumber === 3) {
      setPageOne("complete");
      setPageTwo("complete");
      setPageThree("active");
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
      setPageStatus('success')
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (d) => {
    setPageNumber(2);
  };

  const onNameChange = (e) => {
    const re = /^[a-zA-Z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setName(e.target.value);
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
        if (Count) {
          setCompanies(Data);
        }
      } catch (error) {}
    } else if (searchText.length < 3) {
      setCompanies([]);
    }
  };

  const onListClick = (e) => {
    setCompanies([]);
    setCompany(()=>e);
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
    if (month === 2 || e.target.value > 28) {
      setIsError(true);
      setError("The month must be between 1 and 28.");
      return;
    }
    if (e.target.value > 4) {
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
    if (e.target.value > 2) {
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

    setYear(e.target.value);
  };
  
  const sendOtp = async (mobile) => {
    if (!mobile) {
      return;
    }
    if (mobile.length === 10) {
      try {
        const res = await onSendOtp(mobile);
        if(res.data.message.response.sent){
          alert('An OTP has been sent to your Mobile number.');
        }
      } catch (error) {
        alert("Error occured while generating OTP.");
      }
    }
  };

  const verifyOtp = async (e) => {

    if (!mobile) {
      alert('please enter mobile number')
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

      } catch (error) {
        alert(error.data.message);
      }
    }
  };

  const onStepTwo = (d) => {
    setPageNumber(3);
  };

  const onStepThree = (d) => {
    setPageNumber(4);
  };

  const onStepFour = (d) => {
    if(!day || !month || !year){
      setIsError(true);
      setError("This field cannot be left empty.");
    }
    console.log(d)
    setPageNumber(5);
  };

  const onMobileChange = e => {
    if (e.target.value.length === 10) {
      setMobile(e.target.value.slice(0, 10));
    } else if (e.target.value.length < 10) {
      setMobile(e.target.value);
    }
  };

  const onMobileKeyHandler = event => {
    if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,10}$/)) {
      // block the input if result does not match
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };
  const onOtpKeyHandler = event => {
    if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,6}$/)) {
      // block the input if result does not match
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };
  

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="container">
          <img src={iciciBankLogo} alt="ICICI Logo" />
        </div>
      </div>
      {/* Body */}
      <main>
        <section className="top-section">
          <div className="container">
            <h4 className="top-header">
              Apply for a ICICI Bank Platinum Credit Card
            </h4>
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
                              <span className="error-msg">
                                {errors.name.message}
                              </span>
                            )}
                            {errors.name.type === "minLength" && (
                              <span className="error-msg">
                                {errors.name.message}
                              </span>
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
                          {...register("email", {
                            required: "This field is required.",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Please enter a valid email address.",
                            },
                          })}
                        />
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
                          <option value="">Select city...</option>
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
                              <span className="error-msg">
                                {errors.city.message}
                              </span>
                            )}
                          </>
                        ) : null}
                        {otherCity ? (
                          <input
                            className="input-box"
                            type="text"
                            name="otherCity"
                            style={{ marginTop: 20 }}
                            {...register("otherCity", {
                              required: "This is required field.",
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
                          {...register("pan", {
                            required: "This field is required.",
                            pattern: {
                              value: /^[A-Z]{5}\d{4}[A-Z]{1}$/i,
                              message: "Invalid pan number.",
                            },
                            onChange:e => setPan(e.target.value.toUpperCase())
                          })}
                        />
                        {errors.pan ? (
                          <>
                            {errors.pan.type === "required" && (
                              <span className="error-msg">
                                {errors.pan.message}
                              </span>
                            )}
                            {errors.pan.type === "pattern" && (
                              <span className="error-msg">
                                {errors.pan.message}
                              </span>
                            )}
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="btn-box">
                      <button
                        className="btn-primary"
                        type="button"
                        onClick={handleSubmit(onSubmit)}
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
                            employmentState === "salaried" ? "active" : ''
                          }`}
                          htmlFor="salaried"
                        >
                          <div>
                            <input
                              type="radio"
                              id="salaried"
                              name="employmentState"
                              value="salaried"
                              defaultChecked
                              {...register('employmentState', {
                                onChange:(e) => onEmploymentStatus(e.target.value)
                              })}
                              
                            />
                            <label htmlFor="salaried"></label>
                          </div>
                          <span>Salaried</span>
                        </label>
                        <label
                          className={`custom-checkbox radiobtn ${
                            employmentState === "selfEmployed" ? "active" : ''
                          }`}
                          htmlFor="selfEmployed"
                        >
                          <div>
                            <input
                              type="radio"
                              id="selfEmployed"
                              name="employmentState"
                              value="selfEmployed"
                              {...register('employmentState',{
                                onChange:(e) =>onEmploymentStatus(e.target.value)
                              })}
                            />
                            <label htmlFor="selfEmployed"></label>
                          </div>
                          <span>Self Employed</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-input">
                      <label className="label">Salary (Per Month)</label>
                      <input
                        className="input-box"
                        type="type"
                        name="salaryRange"
                        value={salaryRange}
                        {...register("salaryRange", {
                          required: "This field is required.",
                        })}
                        readOnly
                      />
                      <div>
                        <Slider
                          min={0}
                          max={300000}
                          value={salaryRange}
                          labels={horizontalLabels}
                          tooltip={false}
                          format={getSalary}
                          onChange={handleChangeHorizontal}
                        />
                        <div className="label-container">
                          <span>0</span>
                          <span>3,00,000</span>
                        </div>
                      </div>
                    </div>
                    {/* Company */}
                    <div className="form-input" style={{ postion: "relative" }}>
                      <label className="label">
                        Company<sup>*</sup>
                      </label>
                      <input
                        className="input-box"
                        type="text"
                        name="company"
                        value={company}
                        {...register("company", {
                          required: "This field is required.",
                          onChange: (e) => onCompanyChange(e),
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
                                  key={item.Company_Name}
                                  onClick={(e) =>
                                    onListClick(item.Company_Name)
                                  }
                                >
                                  {item.Company_Name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="btn-grp space-between">
                    <button className="btn-outline" type="button">
                      Back
                    </button>
                    <button className="btn-primary" type="button" onClick={handleSubmit(onStepTwo)}>
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
                              value="noAccount"
                              {...register('accountState',{
                                onChange:(e) => onAccountCheck(e.target.value)
                              })}
                              defaultChecked
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
                              value="salaryAccount"
                              {...register('accountState',{
                                onChange:(e) => onAccountCheck(e.target.value)
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
                              value="scAccount"
                              {...register('accountState',{
                                  onChange: (e) => onAccountCheck(e.target.value)
                                })
                              }
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
                              value="loanAccount"
                              {...register('accountState',{
                                onChange: (e) => onAccountCheck(e.target.value)
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
                    <button className="btn-outline" type="button">
                      Back
                    </button>
                    <button className="btn-primary" type="button" onClick={handleSubmit(onStepThree)}>
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
                            {...register('mobile', {
                              required: 'This is required field.',
                              minLength: {
                                value: 10,
                                message: 'Please enter at least 10 characters.',
                              },
                              pattern: {
                                value: /^[6-9]\d{9}$/,
                                message:
                                  'Please enter mobile number starting with 6/7/8/9.',
                              },
                              onChange:(e)=>onMobileChange(e)
                            })}
                            onKeyPress={e => onMobileKeyHandler(e)}
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
                              {errors.mobile.type === 'required' && (
                                <span className="error-msg">
                                  {errors.mobile.message}
                                </span>
                              )}
                              {errors.mobile.type === 'minLength' && (
                                <span className="error-msg">
                                  {errors.mobile.message}
                                </span>
                              )}
                              {errors.mobile.type === 'pattern' && (
                                <span className="error-msg">
                                  {errors.mobile.message}
                                </span>
                              )}
                            </>
                          ) : null}
                      <div className="form-input" style={{ marginTop: 20 }}>
                        <input
                          type="number"
                          className="input-box"
                          name="otpInput"
                          ref={inputOtpReference}
                          maxLength={6}
                          onKeyPress={e => onOtpKeyHandler(e)}
                          {...register('otpInput', {
                            required: 'This is required field.',
                            minLength: {
                              value: 6,
                              message: 'Please enter at least 6 characters.',
                            },
                            onChange:(e)=>verifyOtp(e)
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
                          onChange={(e) => onDayChange(e)}
                        />
                        <input
                          type="text"
                          ref={inputMonthReference}
                          className="input-month"
                          maxLength="2"
                          value={month}
                          name="month" 
                          onChange={(e) => onMonthChange(e)}
                        />
                        <input
                          type="text"
                          ref={inputYearReference}
                          className="input-year"
                          maxLength="4"
                          value={year}
                          name="years"
                          onChange={(e) => onYearChange(e)}
                        />
                      </div>
                      {isError && <span className="error-msg">{error}</span>}
                    </div>
                    <div className="terms-condition">
                      <input 
                        type="checkbox" 
                        name="terms"
                        {...register('terms',{
                          required: 'This field is required',
                        })}
                      />
                      <p>
                        I agree to ICICI Bank’s{" "}
                        <a href="" target="_blank">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="" target="">
                          Most Important Terms & Conditions
                        </a>
                      </p>
                    </div>
                    {errors.terms ? (
                          <>
                            {errors.terms.type === "required" && (
                              <span className="error-msg">
                                {errors.terms.message}
                              </span>
                            )}
                          </>
                        ) : null}
                  </div>
                  <div className="btn-grp space-between">
                    <button className="btn-outline" type="button">
                      Back
                    </button>
                    <button className="btn-primary" type="button" onClick={handleSubmit(onStepFour)}>
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
                      Success! You have successfully applied for an ICICI Bank
                      Credit Card
                    </h4>
                    <p>It will receive your house through mail</p>
                  </div>
                </div>
              )}
              {pageStatus === "failed" && (
                <div className="steps-div" id="step-failed">
                  <div className="result-box">
                    <img src={failedIcon} alt="success" />
                    <h4>
                      Success! You have successfully applied for an ICICI Bank
                      Credit Card
                    </h4>
                    <p>It will receive your house through mail</p>
                  </div>
                </div>
              )}
            </div>
            <div className="content-side">
              <div>
                <h2>
                  <span>Unlock savings with</span>Platinum Chip <br />
                  Credit Card
                </h2>
                <h3>Lifetime Free</h3>
              </div>
              <div className="anil-kapoor-image">
                <img src={anilKapoor} alt="Anil Kapoor" />
              </div>
            </div>
          </div>
        </section>
        <section className="benefits-section">
          <div className="title">
            <h2>Benefits that Work for You</h2>
            <p>
              The Platinum Chip Credit Card is designed to give more to you.
              More points, more security, and more convenience.
            </p>
          </div>
          <div className="benefits-container">
            <div className="benefits-box">
              <div>
                <img src={refuel} alt="refuel" />
              </div>
              <h4>Fuel Surcharge Waiver</h4>
              <p>
                Save money when refueling by getting a discount on fuel
                surcharge.
              </p>
            </div>
            <div className="benefits-box">
              <div>
                <img src={reward} alt="refuel" />
              </div>
              <h4>ICICI Bank Reward Points for Gifts and Vouchers</h4>
              <p>
                Earn ICICI Bank reward points and get rewarded further for
                shopping with Partner Brands.
              </p>
            </div>
            <div className="benefits-box">
              <div>
                <img src={nfcCard} alt="refuel" />
              </div>
              <h4>Built-in Contactless Technology</h4>
              <p>Payments made faster and safer than ever before.</p>
            </div>
            <div className="benefits-box">
              <div>
                <img src={cardPayment} alt="refuel" />
              </div>
              <h4>Lifetime Free Platinum Chip Card</h4>
              <p>
                You don’t get a Platinum Chip Card, you own it, for a lifetime.
              </p>
            </div>
          </div>
        </section>
        <section className="art-security-section">
          <div className="title">
            <h2>State-of-the-art Security</h2>
          </div>
          <div className="art-security">
            <img src={creditCard} alt="credit card" />
            <p>
              The Platinum Chip Credit Card is baked in security, such that
              there’s an additional layer to protect your card from being
              counterfeited and duplicated. With this level of security every
              transaction becomes safer and life becomes easier.
            </p>
          </div>
        </section>
      </main>
      {/* Footer */}
      <div className="footer">
        <div className="container">
          <div className="box">
            <p>
              *Terms and Conditions of ICICI Bank apply. For details visit{" "}
              <a href="www.icicibank.com" target="_blank">
                www.icicibank.com
              </a>
            </p>
            <p>
              Corporate Office Address: ICICI Bank Towers, Bandra-Kurla Complex,
              Mumbai 400 051.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
