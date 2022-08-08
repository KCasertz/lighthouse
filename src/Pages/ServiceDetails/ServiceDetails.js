import "./ServiceDetails.scss";

import AvailabilityTable from "../../Components/AvailabilityTable/AvailabilityTable";
import React from "react";
import { useEffect } from "react";
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
import tick from "../../assets/icons/tick.png";
import { useState } from "react";
import ScrollToTop from "react-scroll-to-top";

const ServiceDetails = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  // const [discountedPrice, setDiscountedPrice] = useState();
  console.log("service details props", props);
  const isFree = props.isFree;
  const services = props.results.results; //array
  const therapists = props.therapists.results; //array
  const currentId = props.match.params.currentId; //string
  const [wasCopied, setWasCopied] = useState(false);

  let service = {};
  isFree
    ? (service = services.find((service) => service._id === currentId))
    : (service = therapists.find((therapist) => therapist._id === currentId));
  console.log("service found is -->", service);

  // (services.find((service) => service._id === currentId));
  // console.log("service found is -->", service);
  // if (!service) {
  // }
  const lon = service.location.coordinates[0];
  const lat = service.location.coordinates[1];

  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  let history = useHistory();

  const sendToSuccess = (event) => {
    console.log("testing if I could do something on referral too");
    let string = "/" + currentId + "/success";
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

  const copyTemplateToClipboard = (event) => {
    console.log("event: ", event);
    let delivery = "";
    if (props.userSearch.deliveryMethod === "ftf") {
      delivery = "face-to-face";
    } else if (props.userSearch.deliveryMethod === "calls") {
      delivery = "over the phone";
    } else {
      delivery = "over video calls";
    }
    const text = `Hi ${service.name}, I am looking for mental health support and found that you are offering what I need on Lighthouse.com. I would like to refer myself to your service and find out more please. I am primarily looking for support delivered ${delivery}. Please could you let me know what the next steps are? [sign off here]`;
    navigator.clipboard.writeText(text);
    event.target.innerText === ("Copied to clipboard" || "Copied again")
      ? (event.target.innerText = "Copied again")
      : (event.target.innerText = "Copied to clipboard");
  };

  // const calculateCost = (event) => {
  //   if (event.target.value < 20000) {
  //     setDiscountedPrice(service.pricePerHour * 0.5);
  //   } else if (event.target.value < 30000) {
  //     setDiscountedPrice(service.pricePerHour * 0.75);
  //   }
  // };

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
          <div className="service__wait-container service__image-overlay">
            <img src={waitList} alt="" className="service__wait-icon" />
            <p className="service__wait-text">
              {getAvgWait(service.waitingTime)}
            </p>
          </div>

          <div className="service__header-bottom">
            <h1 className="service__heading">{service.name}</h1>
            <div className="service__rating-container">
              <div className="service__rating-container-top">
                <Link to={`/${currentId}/reviews`}>
                  {" "}
                  <ReactStars
                    count={5}
                    value={getAvg(service.ratings)}
                    // onChange={ratingChanged}
                    size={20}
                    activeColor="#EEA807"
                  />
                </Link>
                <Link to={`/${currentId}/reviews`}>
                  {" "}
                  <p className="service__rating-text">
                    {getAvg(service.ratings)}
                  </p>
                </Link>
              </div>

              <div className="service__rating-container-bottom">
                <Link to={`/${currentId}/reviews`}>
                  {" "}
                  <p className="service__reviews-link">Read reviews</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="service__main-container">
          <div className="service__header-container">
            {/* key info Below */}

            {service.pricePerHour ? (
              <>
                <div className="service__price-container">
                  <div className="service__price-left-container">
                    <p className="service__price">
                      From £{service.pricePerHour} per hour
                    </p>

                    <p className="service__scale">
                      <img
                        src={tick}
                        alt="sliding scale"
                        className="service__tick-icon"
                      />{" "}
                      Offers sliding scale
                    </p>
                    {/* <form
                      className="service__calculator"
                      onSubmit={(event) => calculateCost}
                    >
                      <input type="number" className="service__salary" />
                      <button type="submit">calculate</button>
                    </form>
                  </div>
                  <div className="service__right-container">
                    <p className="service__calc-cost">
                      You'd pay {discountedPrice} per hour
                    </p> */}
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
          </div>
          <div className="service__key-info-container">
            <div className="service__key-info-top-container">
              <div className="service__key-info-left-container">
                <p className="service__small-header">KEY INFO</p>
              </div>
              <div className="service__key-info-right-container">
                {/* <div className="service__wait-container">
                  <img src={waitList} alt="" className="service__key-icon" />
                  <p className="service__key-text">
                    {getAvgWait(service.waitingTime)}
                  </p>
                </div> */}
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
                <p className="service__small-header"></p>
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
                  <button
                    className="service__clipboard-button"
                    onClick={copyTemplateToClipboard}
                  >
                    {" "}
                    Copy email template to clipboard
                    {/* {wasCopied
                      ? "Copied to clipboard"
                      : "Copy email template to clipboard"} */}
                  </button>
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
