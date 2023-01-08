import * as React from "react";

import iciciBankLogo from "../src/assets/images/icici-bank-logo.svg";
import refuel from "../src/assets/images/refuel.png";
import cardPayment from "../src/assets/images/card_payment.png";
import nfcCard from "../src/assets/images/nfc_card.png";
import reward from "../src/assets/images/reward.png";

import creditCard from "../src/assets/images/credit-card.png";
import anilKapoor from "../src/assets/images/anil-kapoor.png";

import "./App.css";

function App() {
  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="container">
          <img src={iciciBankLogo} alt="ICICI Logo" />
        </div>
      </div>
      {/* Body */}
      <main className="container">
        <section className="top-section">
          <div className="form-side">
            <div className="stepper">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div>
              <h3>How do we get in touch?</h3>
              <div>
              <div className="form-input">
                <label className="label">
                  Full Name<sup>*</sup>
                </label>
                <input className="input-box" />
              </div>
              <div className="form-input">
                <label className="label">
                  Email Address<sup>*</sup>
                </label>
                <input className="input-box" />
              </div>
              <div className="form-input">
                <label className="label">
                  City<sup>*</sup>
                </label>
                <select className="input-select">
                  <option value="one">One</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </div>
              <div className="form-input">
                <label className="label">
                  Pan Card Number<sup>*</sup>
                </label>
                <input className="input-box" />
              </div>
              <div>
                <button className="btn-primary" type="button">Apply Now</button>
              </div>
              </div>
            </div>
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
