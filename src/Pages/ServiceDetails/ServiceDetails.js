import "./ServiceDetails.scss";

import AvailabilityTable from "../../Components/AvailabilityTable/AvailabilityTable";
import React from "react";
import ReactStars from "react-rating-stars-component";
import waitList from "../../assets/icons/wait-icon.svg";
import lgbtqFlag from "../../assets/icons/lgbtq.avif";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import email from "../../assets/icons/email.png";
import email2 from "../../assets/icons/email2.png";
import phone from "../../assets/icons/phone.png";
import phone2 from "../../assets/icons/phone2.png";
import website from "../../assets/icons/website.png";
import website2 from "../../assets/icons/website2.png";
import refer from "../../assets/icons/refer.png";
import back from "../../assets/icons/back.png";

const ServiceDetails = (props) => {
  console.log("service details props", props);
  const services = props.results.results;
  const serviceId = props.match.params.serviceId;
  const service = services.find((service) => service._id === serviceId);
  const lon = service.location.coordinates[0];
  const lat = service.location.coordinates[1];
  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  let history = useHistory();

  const sendToSuccess = (event) => {
    console.log("testing if I could do something on referral too");
    history.push("/success");
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
          <div className="service__header-container">
            <div
              className="service__header-top"
              onClick={() => history.goBack()}
            >
              <img
                src={back}
                alt="back button"
                className="service__back-button"
              />
              <p className="service__back-icon">Back</p>
            </div>
            <div className="service__header-bottom">
              <h1 className="service__header">{service.name}</h1>
              <div className="service__rating-container">
                <ReactStars
                  count={5}
                  value={getAvg(service.ratings)}
                  // onChange={ratingChanged}
                  size={20}
                  activeColor="#EEA807"
                />
                <p className="service__rating-text">
                  {getAvg(service.ratings)}
                </p>
              </div>
            </div>

            {/* key info Below */}
          </div>
          <div className="service__key-info-container">
            <div className="service__key-info-left-container">
              <p className="service__small-header">KEY INFO</p>
            </div>
            <div className="service__key-info-right-container">
              <div
                className={
                  service.lgbtq ? "service__queer" : "service__not-queer"
                }
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
            </div>
          </div>

          <div className="service__contact-info-container">
            <div className="service__contact-container">
              <img
                src={phone}
                alt="phone icon"
                className="service__contact-icon"
              />
              <p className="service__contact-text">{service.phone}</p>
            </div>
            <div className="service__contact-container">
              <img
                src={email}
                alt="email icon"
                className="service__contact-icon"
              />
              <p className="service__contact-text">{service.email}</p>
            </div>
            <div className="service__contact-container">
              <img
                src={website}
                alt="website icon"
                className="service__contact-icon"
              />
              <p className="service__contact-text">{service.website}</p>
            </div>
            <div>
              <ExternalLink
                href={service.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="service__contact">Get support now</button>
              </ExternalLink>
            </div>
          </div>

          <p className="service__description">{service.description}</p>
          <p className="service__small-header">WHERE TO FIND US</p>
          <div className="service__map-container">
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/url-https%3A%2F%2Fi.postimg.cc%2FqMQKYMz7%2Fmarker.png(${lon},${lat})/${lon},${lat},15/500x300?access_token=pk.eyJ1Ijoia2F0aWVjYXNlcnRhIiwiYSI6ImNsNmhwdWltbDI3NGMzanFsYno3cHcycHUifQ.PrVJdnawuI2chSsYKoZ7qQ`}
              alt="map image"
              className="service__map"
            />
          </div>
          <div className="service__availability-mapping">
            <AvailabilityTable
              service={service}
              userSearch={props.userSearch}
            />
          </div>
          <div className="service__bottom-cta-nav">
            <div className="service__ctas-container">
              <ExternalLink
                className="service__refer-container"
                href={service.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={refer}
                  alt="refer icon"
                  className="service__cta-icon"
                />
                <p className="service__cta-text service__cta-text--refer">
                  Refer
                </p>
              </ExternalLink>

              <ExternalLink
                className="service__call-container"
                href={`tel:${service.phone}`}
                target="_blank"
                onClick={sendToSuccess}
              >
                {" "}
                <img
                  src={phone}
                  alt="phone icon"
                  className="service__cta-icon"
                />
                <p className="service__cta-text">Call</p>
              </ExternalLink>
            </div>
          </div>
          <div className="service__helper-div"></div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
