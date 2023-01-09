import * as React from "react";

import "./App.css";

import iciciBankLogo from "../src/assets/images/icici-bank-logo.webp";
import FormComponent from "./components/form-component";
import BenefitsComponent from "./components/benefits-component";
import ArtSecurity from "./components/art-security";
import FooterComponent from "./components/footer-component";
import TopContentComponent from "./components/top-content-component";


function App() {
  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="container">
          <img src={iciciBankLogo} alt="ICICI Logo"  height='auto' width='230px' loading="lazy"/>
        </div>
      </div>
      {/* Body */}
      <main>
        <section className="top-section">
          <div className="container">
            <h4 className="top-header">
              Apply for a ICICI Bank Platinum Credit Card
            </h4>
            <TopContentComponent />
            <FormComponent />

            
          </div>
        </section>
        <BenefitsComponent />
        <ArtSecurity />
      </main>
      {/* Footer */}
      <FooterComponent />
    </>
  );
}

export default App;
