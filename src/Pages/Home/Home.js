import React from "react";
import "./Home.scss";
import lighthouse from "../../assets/lighthouse.gif";
import lighthouseTransparent from "../../assets/lighthouseTransparent.gif";

export default function Home() {
  return (
    <>
      <div className="home__nav">
        <label className="home__burger">&#9776;</label>
        <p className="home__heading">Lighthouse</p>
      </div>
      <div className="home__hero-container">
        <img
          src={lighthouseTransparent}
          alt="lighthouse"
          className="home__hero"
        />
        <div className="home__right-container">
          Welcome to Lighthouse - answer 6 questionsa and we will share up to
          five services suitable for your needs
        </div>
      </div>
    </>
  );
}
