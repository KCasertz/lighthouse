import React, { useState, useEffect } from "react";
import { GEOAPIFY_API_KEY } from "../../api/api";
import axios from "axios";
import { BACKEND_PORT } from "../../api/api";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import heroImage from "../../assets/images/lighthouseHero.jpg";
const helpers = require("../../helpers/helpers.js");

export default function Home(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const history = useHistory();

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [maxRad, setMaxRad] = useState(5);
  const [postCode, setPostcode] = useState("");
  const [availability, setAvailability] = useState(["test", "test"]);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isAvailAnytime, setIsAvailAnytime] = useState(true);
  const [noPostcodeError, setNoPostcodeError] = useState(false);

  const getServiceResults = async (userSearchCriteria) => {
    try {
      const response = await axios.post(
        `http://localhost:${BACKEND_PORT}/services/filtered`,
        userSearchCriteria
      );
      props.setResults(response.data);
      getTherapistResults(userSearchCriteria);
    } catch (error) {
      console.log(error);
    }
  };

  const getTherapistResults = async (userSearchCriteria) => {
    try {
      const response = await axios.post(
        `http://localhost:${BACKEND_PORT}/therapists/filtered`,
        userSearchCriteria
      );
      props.setTherapists(response.data);

      history.push("/results");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailabilityChange = (value) => {
    setIsAvailAnytime(value);
  };

  const removeFirstSpace = (string) => {
    return string.replace(" ", "");
  };

  const compileSearchObject = (event, response) => {
    const form = event.target;
    let availabilityArray = [];
    isAvailAnytime
      ? (availabilityArray = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ])
      : (availabilityArray = [
          form.monAm.checked,
          form.monPm.checked,
          form.monEve.checked,
          form.tueAm.checked,
          form.tuePm.checked,
          form.tueEve.checked,
          form.wedAm.checked,
          form.wedPm.checked,
          form.wedEve.checked,
          form.thuAm.checked,
          form.thuPm.checked,
          form.thuEve.checked,
          form.friAm.checked,
          form.friPm.checked,
          form.friEve.checked,
          form.satAm.checked,
          form.satPm.checked,
          form.satEve.checked,
          form.sunAm.checked,
          form.sunPm.checked,
          form.sunEve.checked,
        ]);
    setAvailability(availabilityArray);

    let userSearchCriteria = {};

    if (deliveryMethod !== "ftf") {
      userSearchCriteria = {
        deliveryMethod: deliveryMethod,
        availability: availabilityArray,
      };
    } else {
      userSearchCriteria = {
        deliveryMethod: deliveryMethod,
        location: {
          long: useCurrentLocation ? long : response.data.results[0].lon,
          lat: useCurrentLocation ? lat : response.data.results[0].lat,
        },
        maxRad: Number(maxRad),
        availability: availabilityArray,
      };
    }

    props.setUserSearch(userSearchCriteria);

    getServiceResults(userSearchCriteria);
  };

  const getLongLat = (event) => {
    const postcodeNoSpace = removeFirstSpace(postCode);

    //FIXME: move above to helpers

    const apiURL = `https://api.geoapify.com/v1/geocode/search?text=${postcodeNoSpace}&lang=en&limit=1&type=postcode&format=json&apiKey=${GEOAPIFY_API_KEY}`;

    axios
      .get(apiURL)
      .then((response) => {
        compileSearchObject(event, response);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    deliveryMethod !== "ftf" || useCurrentLocation
      ? compileSearchObject(event)
      : getLongLat(event);
  };

  const currentLocationClickHandler = (event) => {
    setUseCurrentLocation(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  const postcodeClickHandler = (event) => {
    setUseCurrentLocation(false);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
    setNoPostcodeError(helpers.isValidPostcode(event.target.value));
  };

  return (
    <>
      <div className="home__hero-container">
        <div className="home__hero-image-container">
          <img
            src={heroImage}
            alt="woman in front of lighthouse"
            className="home__hero-image"
          />
        </div>
      </div>

      <section className="home__main">
        <div className="home__wrapper">
          <div className="home__main-container">
            <h1 className="home__main-header">
              Find a mental health service that's right for you
            </h1>
            <form className="home__form" onSubmit={handleSubmit}>
              <div className="home__radio-button-container">
                <label
                  className="home__form-input-label"
                  htmlFor="deliveryMethod"
                >
                  How would you like to recieve support?
                </label>
                <div className="home__radio-buttons">
                  <label htmlFor="ftf">
                    <input
                      className="home__radio-button"
                      id="ftf"
                      type="radio"
                      name="deliveryMethod"
                      value="ftf"
                      onChange={(event) =>
                        setDeliveryMethod(event.target.value)
                      }
                    />
                    In person
                  </label>
                  <label className="home__radio-label" htmlFor="phoneCalls">
                    <input
                      className="home__radio-button"
                      id="phoneCalls"
                      type="radio"
                      name="deliveryMethod"
                      value="calls"
                      onChange={(event) =>
                        setDeliveryMethod(event.target.value)
                      }
                    />
                    Phone call
                  </label>
                  <label htmlFor="videoCall">
                    <input
                      className="home__radio-button"
                      id="videoCall"
                      type="radio"
                      name="deliveryMethod"
                      value="videoCalls"
                      onChange={(event) =>
                        setDeliveryMethod(event.target.value)
                      }
                    />
                    Video call
                  </label>
                </div>
              </div>
              {deliveryMethod === "ftf" ? (
                <div className="home__search-input-container">
                  <label
                    className="home__form-input-label"
                    htmlFor="deliveryMethod"
                  >
                    Please enter your postcode, and select how far you could
                    travel to a service.
                  </label>
                  {useCurrentLocation ? (
                    <div className="home__current-location-container">
                      <p className="home__form-text home__form-text--current-location">
                        (Using current location)
                      </p>
                      <button
                        type="button"
                        onClick={postcodeClickHandler}
                        className="home__current-location-button"
                      >
                        Type postcode instead
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="home__current-location-container">
                        <input
                          type="text"
                          name="postcode"
                          className="home__current-location-input"
                          onChange={(event) => handlePostcodeChange(event)}
                        />
                        <button
                          className="home__current-location-button"
                          type="button"
                          onClick={currentLocationClickHandler}
                        >
                          Use current location
                        </button>
                      </div>
                      <p
                        className={
                          noPostcodeError
                            ? `home__no-error`
                            : `home__show-error-message`
                        }
                      >
                        Please enter a valid postcode.
                      </p>
                    </>
                  )}

                  <div className="home__dropdown-container">
                    <label className="home__dropdown-text">
                      I can travel up to
                    </label>
                    <select
                      name="maxRad"
                      className="home__dropdown-input"
                      id="maxRad"
                      selected="selected"
                      onChange={(event) => setMaxRad(event.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                    <label
                      className="component__input-label"
                      htmlFor="category"
                    >
                      km from here
                    </label>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <label
                className="home__form-input-label"
                htmlFor="availabilityAll"
              >
                When are you available to receive support?
              </label>
              <div className="home__availability-radio-container">
                <label className="home__radio-label" htmlFor="availableAnytime">
                  <input
                    id="availableAnytime"
                    type="radio"
                    name="availabilityAll"
                    className="home__radio-button"
                    value={true}
                    onChange={() => {
                      handleAvailabilityChange(true);
                    }}
                  />
                  I can do any day, any time
                </label>
                <label
                  htmlFor="notAvailableAnytime"
                  className="home__radio-label"
                >
                  <input
                    id="notAvailableAnytime"
                    className="home__radio-button"
                    type="radio"
                    name="availabilityAll"
                    value={false}
                    onChange={() => {
                      handleAvailabilityChange(false);
                    }}
                  />
                  I'd like to select when I am available
                </label>
              </div>
              {isAvailAnytime === true ? (
                <></>
              ) : (
                <>
                  <label className="home__form-input-label">
                    Please use the table below to show your availability.
                    <ul className="home__availability-list">
                      <li className="home__availability-list-item">
                        Am = 08:00 - 12:00
                      </li>
                      <li className="home__availability-list-item">
                        Pm = 12:00 - 17:00
                      </li>
                      <li className="home__availability-list-item">
                        Eve = 17:00 - 20:00
                      </li>
                    </ul>
                  </label>

                  <div className="home__availability-container">
                    <div className="availability__row availability__row--heading ">
                      <div className="home__availability-col availability__col--blank-space"></div>
                      <div className="home__availability-col home__availability-heading">
                        Mon
                      </div>
                      <div className="home__availability-col home__availability-heading">
                        Tue
                      </div>
                      <div className="home__availability-col home__availability-heading">
                        Wed
                      </div>
                      <div className="home__availability-col home__availability-heading">
                        Thu
                      </div>
                      <div className="home__availability-col home__availability-heading">
                        Fri
                      </div>
                      <div className="home__availability-col home__availability-heading">
                        Sat
                      </div>
                      <div className="home__availability-col home__availability-heading">
                        Sun
                      </div>
                    </div>
                    <div className="availability__row availability__row--am">
                      <div className="home__availability-col home__availability-heading">
                        Am
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="monAm"
                          type="checkbox"
                          name="availability"
                          value="monAm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="tueAm"
                          type="checkbox"
                          name="availability"
                          value="tueAm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col ">
                        <input
                          id="wedAm"
                          type="checkbox"
                          name="availability"
                          value="wedAm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="thuAm"
                          type="checkbox"
                          name="availability"
                          value="thuAm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="friAm"
                          type="checkbox"
                          name="availability"
                          value="friAm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="satAm"
                          type="checkbox"
                          name="availability"
                          value="satAm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="sunAm"
                          type="checkbox"
                          name="availability"
                          value="sunAm"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="availability__row availability__row--pm">
                      <div className="home__availability-col home__availability-heading">
                        Pm
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="monPm"
                          type="checkbox"
                          name="availability"
                          value="monPm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="tuePm"
                          type="checkbox"
                          name="availability"
                          value="tuePm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col ">
                        <input
                          id="wedPm"
                          type="checkbox"
                          name="availability"
                          value="wedPm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="thuPm"
                          type="checkbox"
                          name="availability"
                          value="thuPm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="friPm"
                          type="checkbox"
                          name="availability"
                          value="friPm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="satPm"
                          type="checkbox"
                          name="availability"
                          value="satPm"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="sunPm"
                          type="checkbox"
                          name="availability"
                          value="sunPm"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="availability__row availability__row--eve">
                      <div className="home__availability-col home__availability-heading">
                        Eve
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="monEve"
                          type="checkbox"
                          name="availability"
                          value="monEve"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="tueEve"
                          type="checkbox"
                          name="availability"
                          value="tueEve"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col ">
                        <input
                          id="wedEve"
                          type="checkbox"
                          name="availability"
                          value="wedEve"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="thuEve"
                          type="checkbox"
                          name="availability"
                          value="thuEve"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="friEve"
                          type="checkbox"
                          name="availability"
                          value="friEve"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="satEve"
                          type="checkbox"
                          name="availability"
                          value="satEve"
                          defaultChecked
                        />
                      </div>
                      <div className="home__availability-col">
                        <input
                          id="sunEve"
                          type="checkbox"
                          name="availability"
                          value="sunEve"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="home__submit-button primary-button"
              >
                Find the service for you
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
