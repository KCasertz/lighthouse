import React from "react";
import "./Success.scss";
import successLighthouse from "../../assets/images/lighthouseYellow.avif";
import success from "../../assets/icons/success.png";
import { useHistory } from "react-router-dom";
import back from "../../assets/icons/back.png";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import ScrollToTop from "react-scroll-to-top";
const helpers = require("../../helpers/helpers.js");

const Success = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  const [email, setEmail] = useState("");
  const [noEmailError, setNoEmailError] = useState("");
  console.log("props", props);
  const services = props.results.results;
  const serviceId = props.match.params.serviceId;
  const service = services.find((service) => service._id === serviceId);
  const lon = service.location.coordinates[0];
  const lat = service.location.coordinates[1];

  let history = useHistory();

  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  const getAvgWait = (arr) => {
    const result = Math.ceil(getAvg(arr));
    if (result === 0) {
      return `under a month`;
    } else if (result === 1) {
      return `${result} month`;
    } else {
      return `${result} months`;
    }
  };

  const checkEmail = (event) => {
    setNoEmailError(helpers.isValidEmail(event.target.value));
  };

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
          <h1 className="success__heading">Success</h1>
          <p className="success__text">
            You were successfully referred. Our data suggests the waiting list
            for this service is currently{" "}
            <span className="success__bold">
              {getAvgWait(service.waitingTime)}
            </span>{" "}
            from referral.
            <br />
            <br />
            Please leave your email below and we will send you a link to share a
            review about the service you referred yourself to.
          </p>
          <form
            className="success__email-form"
            onSubmit={() =>
              alert("Thank you - you will receive an email shortly")
            }
          >
            <input
              type="text"
              name="email"
              onChange={(event) => checkEmail(event)}
              className="success__email"
              placeholder="Please enter your email"
            />
            <p
              className={
                noEmailError
                  ? `success__no-error`
                  : `success__show-error-message`
              }
            >
              Please use a valid email address
            </p>
            <button
              className="success__submit-button"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                alert("Thank you - you will receive an email shortly");
              }}
            >
              I want to review
            </button>
          </form>

          <div className="success__links">
            <h2>Extra resources, while you wait:</h2>
            <p className="success__text"></p>
            <ul className="success__resources">
              <li className="success__list-item">
                {" "}
                <ExternalLink
                  className="success__resource-link"
                  href="https://togetherall.com/en-gb"
                  target="_blank"
                >
                  <span className="success__emphasise">TogetherAll</span> - an
                  online community to support people with mental health
                  problems.
                </ExternalLink>
              </li>
              <li className="success__list-item">
                <ExternalLink
                  className="success__resource-link"
                  href=" https://swlondonccg.nhs.uk/your-health/wandsworth-wellbeing-hub/self-management-courses/"
                  target="_blank"
                >
                  <span className="success__emphasise">
                    Wandsworth Wellbeing Hub
                  </span>{" "}
                  - a free course to help people improve their health and
                  wellbeing.
                </ExternalLink>
              </li>
              <li className="success__list-item">
                <ExternalLink
                  className="success__resource-link"
                  href=" https://giveusashout.org/about-us/about-shout/"
                  target="_blank"
                >
                  <span className="success__emphasise">SHOUT</span> - a free
                  24/7 text messaging support service for anyone who is
                  struggling to cope.
                </ExternalLink>
              </li>
            </ul>

            <br />
            <br />
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;
