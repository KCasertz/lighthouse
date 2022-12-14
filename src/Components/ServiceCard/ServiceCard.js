import "./ServiceCard.scss";
import React from "react";
import ReactStars from "react-rating-stars-component";
import waitList from "../../assets/icons/wait-icon.png";
import lgbt from "../../assets/icons/lgbt.png";
import { Link } from "react-router-dom";
import accessible from "../../assets/icons/accessible.png";
import tick from "../../assets/icons/tick.png";

const ServiceCard = (props) => {
  const service = props.details;
  const serviceId = service._id;

  const getAvg = (arr) => {
    return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  };

  // FIXME: move above into helper function

  const getAvgWait = (arr) => {
    const result = Math.ceil(getAvg(arr));
    if (result === 0) {
      return `Under a month's wait`;
    } else if (result === 1) {
      return `${result} month's wait`;
    } else {
      return `${result} month's wait`;
    }
  };

  return (
    <article className="card">
      <div className="card__header">
        <Link to={`/services/${serviceId}`}>
          {" "}
          <p className="card__title">{service.name}</p>
        </Link>
        <div className="card__rating-container">
          <ReactStars
            count={5}
            value={getAvg(service.ratings)}
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

            <div className="card__wait-container card__image-overlay">
              <img src={waitList} alt="" className="card__wait-icon" />
              <p className="card__wait-text">
                {getAvgWait(service.waitingTime)}
              </p>
            </div>
          </div>
        </div>

        <div className="card__middle-container">
          {service.pricePerHour ? (
            <>
              <div className="card__price-container">
                <p className="card__price">
                  From ??{service.pricePerHour} per hour
                </p>

                <p className="card__scale">
                  <img
                    src={tick}
                    alt="sliding scale"
                    className="card__tick-icon"
                  />{" "}
                  Offers sliding scale
                </p>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className={service.lgbtq ? "card__lgbt" : "card__not-lgbt"}>
            <img src={lgbt} alt="lgbtq+ flag" className="card__lgbtq-flag" />
            <p className="card__icon-text">LGBTQ+</p>
          </div>
          <div
            className={service.accessible ? "card__access" : "card__no-access"}
          >
            <img
              src={accessible}
              alt="accessible icon"
              className="card__access-icon"
            />
            <p className="card__icon-text">Wheelchair accessible</p>
          </div>
        </div>
      </div>
      <div className="card__bottom-container">
        <p className="card__summary">{service.summary}</p>
        <div className="card__ctas">
          <Link to={`/services/${serviceId}`}>
            <div className="card__more-button">
              Learn more and get support &#x2192;
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
