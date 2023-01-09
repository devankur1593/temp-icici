import React from "react";

import anilKapoor from "../assets/images/anil-kapoor.webp";

const TopContentComponent = () => {
  return (
    <>
      <div className="content-side">
        <div>
          <h2>
            <span>Unlock savings with</span>Platinum Chip <br />
            Credit Card
          </h2>
          <h3>Lifetime Free</h3>
        </div>
        <div className="anil-kapoor-image">
          <img src={anilKapoor} alt="Anil Kapoor" height="auto" width="auto" />
        </div>
      </div>
    </>
  );
};

export default TopContentComponent;
