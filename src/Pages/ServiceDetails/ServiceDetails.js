import "./ServiceDetails.scss";

import React from "react";
import ReactStars from "react-rating-stars-component";
import waitList from "../../assets/icons/wait-icon.svg";
import lgbtqFlag from "../../assets/icons/lgbtq.avif";
import { Link } from "react-router-dom";

const ServiceDetails = (props) => {
  const services = props.results.results;
  const serviceId = props.match.params.serviceId;
  const service = services.find((service) => service._id === serviceId);

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
    <section className="service">
      <div className="service__container">
        <div className="service__image-container">
          <img
            className="service__image"
            src={`${service.imageUrl}`}
            alt="service logo"
          />
        </div>
        <div className="service__main-container">
          <h1 className="service__header">{service.name}</h1>
          <p className="service__description">{service.description}</p>
          <div className="service__rating-container">
            <ReactStars
              count={5}
              value={getAvg(service.ratings)}
              // onChange={ratingChanged}
              size={20}
              activeColor="#EEA807"
            />
            <p className="service__rating-text">{getAvg(service.ratings)}</p>
          </div>
          <div
            className={service.lgbtq ? "service__queer" : "service__not-queer"}
          >
            <img
              src={lgbtqFlag}
              alt="lgbtq+ flag"
              className="service__lgbtq-flag"
            />
            <p className="service__icon-text">LGBTQ+</p>
          </div>

          <div className="service__wait-container">
            <img src={waitList} alt="" className="service__wait-icon" />
            <p className="service__wait-text">
              {getAvgWait(service.waitingTime)}
            </p>
          </div>
          <div className="service__map-container">
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/url-https%3A%2F%2Fi.postimg.cc%2FqMQKYMz7%2Fmarker.png(0.02392,51.53016)/0.02392,51.53016,15/500x300?access_token=pk.eyJ1Ijoia2F0aWVjYXNlcnRhIiwiYSI6ImNsNmhwdWltbDI3NGMzanFsYno3cHcycHUifQ.PrVJdnawuI2chSsYKoZ7qQ`}
              alt="map image"
              className="service__map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
