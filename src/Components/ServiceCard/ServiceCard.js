import React from "react";

const ServiceCard = (props) => {
  const service = props.serviceDetails;

  return <div>{service.name}</div>;
};

export default ServiceCard;
