import "./ServiceCard.scss";
import React from "react";
import ReactStars from "react-rating-stars-component";
import waitList from "../../assets/icons/wait-icon.svg";
var _ = require("lodash/core");

const ServiceCard = (props) => {
  const service = props.serviceDetails;

  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  const getAvgWait = (arr) => {
    const result = Math.ceil(getAvg(arr));
    if (result === 0) {
      return `Available now`;
    } else if (result === 1) {
      return `${result} month`;
    } else {
      return `${result} months`;
    }
  };

  return (
    <article className="card">
      <div className="card__header">
        <p className="card__title">{service.name}</p>
        <div className="card__rating-container">
          <ReactStars
            count={5}
            value={getAvg(service.ratings)}
            // onChange={ratingChanged}
            size={20}
            activeColor="#EEA807"
          />
          <p className="card__rating-text">{getAvg(service.ratings)}</p>
        </div>
      </div>
      <div className="card__top-container">
        <div className="card__top-left-container">
          <div className="card__image-container">
            <img
              className="card__image"
              src={`${service.imageUrl}`}
              alt="service logo"
            />
          </div>
        </div>
        <div className="card__top-right-container">
          <div className="card__wait-container">
            <img src={waitList} alt="" className="card__wait-icon" />
            <p className="card__wait-text">{getAvgWait(service.waitingTime)}</p>
          </div>
        </div>
      </div>
      <div className="card__bottom-container">
        <p className="card__summary">{service.summary}</p>
      </div>
    </article>
  );
};

export default ServiceCard;
