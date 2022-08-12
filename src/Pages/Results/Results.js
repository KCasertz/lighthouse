import "./Results.scss";
import React, { useEffect } from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import back from "../../assets/icons/back.png";
import { useHistory } from "react-router-dom";
import wait from "../../assets/icons/wait.gif";
import ScrollToTop from "react-scroll-to-top";

const Results = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const services = props.results.results;
  const therapists = props.therapists.results;
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
