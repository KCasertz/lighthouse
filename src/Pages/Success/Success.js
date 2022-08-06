import "./Success.scss";
import successLighthouse from "../../assets/images/lighthouseYellow.avif";
import success from "../../assets/icons/success.png";
import { useHistory } from "react-router-dom";
import back from "../../assets/icons/back.png";

import React from "react";

const Success = () => {
  let history = useHistory();
  return (
    <>
      <section className="success">
        <div className="success__header-top" onClick={() => history.goBack()}>
          <img src={back} alt="back button" className="success__back-button" />
          <p className="success__back-icon">Back</p>
        </div>

        <div className="success__hero-container">
          <img
            src={successLighthouse}
            alt="lighthouse sunset"
            className="success__hero"
          />
        </div>
        <div className="success__main-container">
          <img src={success} alt="tick" className="success__image" />
          <h1>Success</h1>
          <p className="success__text">
            Acknowledging you need support is a brave move, and actually seeking
            that support is even more brave
          </p>
          <p className="success__text">
            {"Based on user reviews, you should hear back in ${INSERT HERE}."}
          </p>
          <p className="success__text">
            If you would like to help others in their search for the right
            support, please leave your email below and we will send you a link
            to share a review about the service you referred yourself to
          </p>
        </div>
      </section>
    </>
  );
};

export default Success;
