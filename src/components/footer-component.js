import React from "react";

const FooterComponent = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="box">
            <p>
              *Terms and Conditions of ICICI Bank apply. For details visit{" "}
              <a
                href="https://www.icicibank.com"
                rel="noreferrer"
                target="_blank"
              >
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
};

export default FooterComponent;
