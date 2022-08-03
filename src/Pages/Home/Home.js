import React from "react";
import "./Home.scss";
import lighthouseAnimation from "../../assets/lighthouseIconOne.gif";
import lighthouseLogo from "../../assets/plymouth.png";

export default function Home() {
  return (
    <>
      <div className="home__nav">
        <div className="home__logo-container">
          <div className="home__logo-icon-wrapper">
            <img
              src={lighthouseLogo}
              alt="lighthouse icon"
              className="home__logo"
            />
          </div>
          {/* <label className="home__burger">&#9776;</label> */}
          <p className="home__heading">Lighthouse</p>
        </div>
        <ul className="home__nav-list">
          <li className="home__nav-list-item">Find a service</li>
          <li className="home__nav-list-item">Progress</li>
          <li className="home__nav-list-item">About</li>
        </ul>
      </div>
      {/* <div className="home__hero-container"> */}
      <div className="home__hero-image-container">
        {/* <img
            src={lighthouseGirl}
            alt="lighthouse"
            className="home__hero-image"
          /> */}
        <div className="home__right-container">
          Welcome to Lighthouse - we're here to help you navigate the mental
          health system and find the right support for you or a loved one, at
          the time when you need it. Answer a few questions below to get
          started.
          {/* </div> */}
        </div>
      </div>

      <section className="home__main">
        <img
          src={lighthouseAnimation}
          alt="lighthouse"
          className="home__lighthouse-icon"
        />
      </section>
    </>
  );
}
