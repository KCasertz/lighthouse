import React from "react";
import "./Home.scss";
import lighthouseAnimation from "../../assets/lighthouseIconOne.gif";

export default function Home() {
  return (
    <>
      <div className="home__hero-container">
        <div className="home__hero-image-container">
          <div className="home__hero-text-container">
            Welcome to Lighthouse - we're here to help you navigate the mental
            health system and find the right support for you or a loved one, at
            the time when you need it. Answer a few questions below to get
            started.
          </div>
        </div>
      </div>

      <section className="home__main">
        <img
          src={lighthouseAnimation}
          alt="lighthouse"
          className="home__lighthouse-animation"
        />
      </section>
    </>
  );
}
