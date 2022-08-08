import "./Results.scss";

import React from "react";
import { useEffect } from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import back from "../../assets/icons/back.png";
import { useHistory } from "react-router-dom";
import wait from "../../assets/icons/wait.gif";
import ScrollToTop from "react-scroll-to-top";

const Results = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  console.log("results props: ", props);
  const services = props.results.results;
  const therapists = props.therapists.results;
  console.log("therapists props; ", therapists);
  let history = useHistory();

  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  //map through each array, get the avg for it's ratings and wait times, and return in a new array which includes the new avg wait and avg rating
  const newArr = services.map((service) => {
    service["avgWait"] = getAvg(service.waitingTime);
    service["avgRating"] = getAvg(service.ratings);
  });

  // console.log("avg: ", getAvg(services[0].waitingTime));
  // console.log("service pre new key", services[0]);

  // services[0].avgWait = getAvg(services[0].waitingTime);

  // console.log("service post new key", services[0]);

  // console.log("avg arr: ", newArr);

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
      <ScrollToTop smooth={true} top={20} />
    </section>
  );
};

export default Results;
