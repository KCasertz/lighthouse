import "./Results.scss";

import React from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";

const Results = (props) => {
  console.log("props: ", props.results.results);
  const services = props.results.results;

  return !services ? (
    <p>Loading...</p>
  ) : (
    <section className="results">
      <div className="results__container">
        {/* <div>{services[0].name}</div> */}
        {services.map((service, i) => {
          return <ServiceCard serviceDetails={service} key={i} />;
        })}
      </div>
    </section>
  );
};

export default Results;
