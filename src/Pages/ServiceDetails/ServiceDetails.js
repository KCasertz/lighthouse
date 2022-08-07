import "./ServiceDetails.scss";

import AvailabilityTable from "../../Components/AvailabilityTable/AvailabilityTable";
import React from "react";
import ReactStars from "react-rating-stars-component";
import waitList from "../../assets/icons/wait-icon.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import email from "../../assets/icons/email.png";
import phone from "../../assets/icons/phone.png";
import website from "../../assets/icons/website.png";
import refer from "../../assets/icons/refer.png";
import back from "../../assets/icons/back.png";
import onetoone from "../../assets/icons/onetoone.png";
import accessible from "../../assets/icons/accessible.png";
import group from "../../assets/icons/group.png";
import lgbt from "../../assets/icons/lgbt.png";

const ServiceDetails = (props) => {
  console.log("service details props", props);
  const services = props.results.results;
  const serviceId = props.match.params.serviceId;
  const service = services.find((service) => service._id === serviceId);
  console.log("service found is -->", service);
  const lon = service.location.coordinates[0];
  const lat = service.location.coordinates[1];

  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  let history = useHistory();

  const sendToSuccess = (event) => {
    console.log("testing if I could do something on referral too");
    let string = "/" + serviceId + "/success";
    history.push(string);
  };

  const getAvgWait = (arr) => {
    const result = Math.ceil(getAvg(arr));
    if (result === 0) {
      return `Under a month's wait`;
    } else if (result === 1) {
      return `${result} month`;
    } else {
      return `${result} months`;
    }
  };

  const copyTemplateToClipboard = () => {
    navigator.clipboard.writeText("Did this work?");
  };

  return (
    <section className="service">
      <div className="service__container">
        {/* <button type="button" onClick={copyTemplateToClipboard}>
          Copy to clipboard
        </button> */}
        <div className="service__header-top" onClick={() => history.goBack()}>
          <img src={back} alt="back button" className="service__back-button" />
          <p className="service__back-icon">Back</p>
        </div>
        <div className="service__image-container">
          <img
            className="service__image"
            src={`${service.imageUrl}`}
            alt="service logo"
          />
        </div>

        <div className="service__main-container">
          <div className="service__header-container">
            <div className="service__header-bottom">
              <h1 className="service__heading">{service.name}</h1>
              <div className="service__rating-container">
                <div className="service__rating-container-top">
                  <Link to={`/${serviceId}/reviews`}>
                    {" "}
                    <ReactStars
                      count={5}
                      value={getAvg(service.ratings)}
                      // onChange={ratingChanged}
                      size={20}
                      activeColor="#EEA807"
                    />
                  </Link>
                  <Link to={`/${serviceId}/reviews`}>
                    {" "}
                    <p className="service__rating-text">
                      {getAvg(service.ratings)}
                    </p>
                  </Link>
                </div>

                <div className="service__rating-container-bottom">
                  <Link to={`/${serviceId}/reviews`}>
                    {" "}
                    <p className="service__reviews-link">Read reviews</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* key info Below */}
          </div>
          <div className="service__key-info-container">
            <div className="service__key-info-top-container">
              <div className="service__key-info-left-container">
                <p className="service__small-header">KEY INFO</p>
              </div>
              <div className="service__key-info-right-container">
                <div className="service__wait-container">
                  <img src={waitList} alt="" className="service__key-icon" />
                  <p className="service__key-text">
                    {getAvgWait(service.waitingTime)}
                  </p>
                </div>
                <div
                  className={
                    service.individual ? "service__solo" : "service__not-solo"
                  }
                >
                  <img
                    src={onetoone}
                    alt="individual therapy icon"
                    className="service__key-icon"
                  />
                  <p className="service__key-text">Individual therapy</p>
                </div>
                <div
                  className={
                    service.group ? "service__group" : "service__not-group"
                  }
                >
                  <img
                    src={group}
                    alt="group support icon"
                    className="service__key-icon"
                  />
                  <p className="service__key-text">Group support</p>
                </div>
                <div
                  className={
                    service.lgbtq ? "service__lgbt" : "service__not-lgbt"
                  }
                >
                  <img
                    src={lgbt}
                    alt="lgbtq+ flag"
                    className="service__key-icon"
                  />
                  <p className="service__key-text">LGBTQ+</p>
                </div>
                <div
                  className={
                    service.accessible
                      ? "service__access"
                      : "service__no-access"
                  }
                >
                  <img
                    src={accessible}
                    alt="accessible icon"
                    className="service__key-icon"
                  />
                  <p className="service__key-text">Wheelchair accessible</p>
                </div>
              </div>
            </div>
            <div className="service__key-info-bottom-container">
              <div className="service__key-info-left-container">
                <p className="service__small-header">CONTACT</p>
              </div>
              <div className="service__key-info-right-container">
                <div className="service__contact-info-container">
                  <ExternalLink
                    className="service__contact-link"
                    href={`tel:${service.phone}`}
                    target="_blank"
                  >
                    <div className="service__contact-container">
                      <img
                        src={phone}
                        alt="phone icon"
                        className="service__key-icon"
                      />
                      <p className="service__key-text service__key-text--underline">
                        {service.phone}
                      </p>
                    </div>
                  </ExternalLink>
                  <ExternalLink
                    className="service__contact-link"
                    href={`mailto:${service.email}?subject="Enquiring about support"`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="service__contact-container">
                      <img
                        src={email}
                        alt="email icon"
                        className="service__key-icon"
                      />
                      <p className="service__key-text service__key-text--underline">
                        {service.email}
                      </p>
                    </div>
                  </ExternalLink>
                  <ExternalLink
                    className="service__contact-link"
                    href={service.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <div className="service__contact-container">
                      <img
                        src={website}
                        alt="website icon"
                        className="service__key-icon"
                      />
                      <p className="service__key-text service__key-text--underline">
                        {service.website}
                      </p>
                    </div>
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
          <p className="service__heading">Description</p>
          <p className="service__description">{service.description}</p>
          <p className="service__heading">Where to find us</p>
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
                onClick={sendToSuccess}
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
