import "./Header.scss";
import lighthouseLogo from "../../assets/images/lighthouseLogo.png";

import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo-container">
        <div className="header__logo-icon-wrapper">
          <img
            src={lighthouseLogo}
            alt="lighthouse icon"
            className="header__logo"
          />
        </div>
        <p className="header__logo-text">Lighthouse</p>
      </div>
      <ul className="header__nav-list">
        <li className="header__nav-list-item">Find a service</li>
        <li className="header__nav-list-item">Progress</li>
        <li className="header__nav-list-item">About</li>
      </ul>
    </div>
  );
};

export default Header;
