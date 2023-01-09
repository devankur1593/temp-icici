import React from "react";

import refuel from "../assets/images/refuel.svg";
import cardPayment from "../assets/images/card-payment.svg";
import nfcCard from "../assets/images/nfc-card.svg";
import reward from "../assets/images/reward.svg";

const BenefitsComponent = () => {
  return (
    <>
      <section className="benefits-section">
        <div className="title">
          <h2>Benefits that Work for You</h2>
          <p>
            The Platinum Chip Credit Card is designed to give more to you. More
            points, more security, and more convenience.
          </p>
        </div>
        <div className="benefits-container">
          <div className="benefits-box">
            <div>
              <img src={refuel} alt="refuel" height="auto" width="auto" />
            </div>
            <h4>Fuel Surcharge Waiver</h4>
            <p>
              Save money when refueling by getting a discount on fuel surcharge.
            </p>
          </div>
          <div className="benefits-box">
            <div>
              <img src={reward} alt="refuel" height="auto" width="auto" />
            </div>
            <h4>ICICI Bank Reward Points for Gifts and Vouchers</h4>
            <p>
              Earn ICICI Bank reward points and get rewarded further for
              shopping with Partner Brands.
            </p>
          </div>
          <div className="benefits-box">
            <div>
              <img src={nfcCard} alt="refuel" height="auto" width="auto" />
            </div>
            <h4>Built-in Contactless Technology</h4>
            <p>Payments made faster and safer than ever before.</p>
          </div>
          <div className="benefits-box">
            <div>
              <img src={cardPayment} alt="refuel" height="auto" width="auto" />
            </div>
            <h4>Lifetime Free Platinum Chip Card</h4>
            <p>
              You don’t get a Platinum Chip Card, you own it, for a lifetime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsComponent;
