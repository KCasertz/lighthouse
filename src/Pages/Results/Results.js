import "./Results.scss";

import React from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import back from "../../assets/icons/back.png";
import { useHistory } from "react-router-dom";
import wait from "../../assets/icons/wait.gif";

const Results = (props) => {
  console.log("results props: ", props);
  const services = props.results.results;
  const therapists = props.therapists.results;
  console.log("therapists props; ", therapists);
  let history = useHistory();

  return !services ? (
    <>
      <div className="results__header-container">
        <div className="results__header-top" onClick={() => history.goBack()}>
          <img src={back} alt="back button" className="results__back-button" />
          <p className="results__back-icon">Back</p>
        </div>
        <h1 className="results__heading">Your results</h1>
      </div>
      <div className="results__loading-container">
        <img src={wait} alt="loading icon" className="results__loading-icon" />
        <p className="results__loading-text">Loading...</p>
      </div>
    </>
  ) : (
    <section className="results">
      <div className="results__header-container">
        <div className="results__header-top" onClick={() => history.goBack()}>
          <img src={back} alt="back button" className="results__back-button" />
          <p className="results__back-icon">Back</p>
        </div>
        <h1 className="results__heading">Your results</h1>
      </div>

      {/* toggle tabs! */}

      <div className="results__toggle-tabs-container">
        <div
          className="results__toggle-tab results__toggle-tab--free"
          onClick={() => props.setIsFree(true)}
        >
          Free
        </div>
        <div
          className="results__toggle-tab results__toggle-tab--paid"
          onClick={() => props.setIsFree(false)}
        >
          Paid
        </div>
      </div>

      {/* toggle dependent on state */}

      {props.isFree ? (
        <div className="results__container">
          {services.length === 0 ? (
            <p className="results__text">
              Sorry, there are currently no services that match your criteria.
              Please click 'It's urgent' at the top of the page if you need
              support right now, otherwise go back and try amending your search.
            </p>
          ) : (
            <>
              {services.map((service, i) => {
                return <ServiceCard details={service} key={i} />;
              })}
            </>
          )}
        </div>
      ) : (
        // paid service below

        <div className="results__paid-container">
          {therapists.length === 0 ? (
            <p className="results__text">
              Sorry, there are currently no paid-for therapists that meet your
              criteria.
            </p>
          ) : (
            <>
              {therapists.map((therapist, i) => {
                return <ServiceCard details={therapist} key={i} />;
              })}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Results;
