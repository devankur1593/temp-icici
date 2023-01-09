import React from "react";

import creditCard from "../assets/images/credit-card.webp";

const ArtSecurity = () => {
  return (
    <>
      <section className="art-security-section">
        <div className="title">
          <h2>State-of-the-art Security</h2>
        </div>
        <div className="art-security">
          <img src={creditCard} alt="credit card" height="auto" width="auto" />
          <p>
            The Platinum Chip Credit Card is baked in security, such that
            there’s an additional layer to protect your card from being
            counterfeited and duplicated. With this level of security every
            transaction becomes safer and life becomes easier.
          </p>
        </div>
      </section>
    </>
  );
};

export default ArtSecurity;
