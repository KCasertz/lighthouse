import "./Header.scss";
import lighthouseLogo from "../../assets/images/lighthouseLogo.png";
import { Link } from "react-router-dom";

import React from "react";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
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
      </Link>
      <ul className="header__nav-list">
        <li className="header__nav-list-item">
          <Link to="/">Find a service</Link>
        </li>
        {/* 
        <li className="header__nav-list-item">Progress</li> */}

        <li className="header__nav-list-item header__nav-list-button">
          <Link to="/chat"> It's urgent </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
