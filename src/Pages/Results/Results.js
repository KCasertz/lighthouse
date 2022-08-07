import "./Results.scss";

import React from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import back from "../../assets/icons/back.png";
import { useHistory } from "react-router-dom";

const Results = (props) => {
  console.log("results props: ", props);

  const services = props.results.results;
  const therapists = props.therapists.results;
  console.log("therapists props; ", therapists);
  let history = useHistory();

  return !services ? (
    <p>Loading...</p>
  ) : (
    <section className="results">
      <div className="results__container">
        <div className="results__header-container">
          <div className="results__header-top" onClick={() => history.goBack()}>
            <img
              src={back}
              alt="back button"
              className="results__back-button"
            />
            <p className="results__back-icon">Back</p>
          </div>
          <h1 className="results__heading">Your results</h1>
        </div>

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

        {/* <div className="results__paid-container">
          <h1 className="results__paid-heading">Matching paid therapists</h1>
          <p className="results__text">
            Please note - the results below are not free, but many offer a
            reduced rate for those who are in financial difficulty.
          </p>
        </div>

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
        )} */}
      </div>
    </section>
  );
};

export default Results;
