import "./Results.scss";

import React from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import back from "../../assets/icons/back.png";
import { useHistory } from "react-router-dom";

const Results = (props) => {
  console.log("props: ", props.results.results);
  const services = props.results.results;
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
            Sorry, there are no services that match your criteria right now.
            Please click 'It's urgent' at the top of the page if you need
            support right now, otherwise go back and try amending your search.
          </p>
        ) : (
          <>
            {services.map((service, i) => {
              return <ServiceCard serviceDetails={service} key={i} />;
            })}
          </>
        )}
        {/* <div>{services[0].name}</div> */}
      </div>
    </section>
  );
};

export default Results;
