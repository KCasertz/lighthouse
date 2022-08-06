import { useState } from "react";
import API_URL from "../../api/api";
import axios from "axios";
import BACKEND_PORT from "../../api/api";
import { useHistory } from "react-router-dom";
import React from "react";
import "./Home.scss";
import lighthouseAnimation from "../../assets/lighthouseIconOne.gif";
import heroImage from "../../assets/images/lighthouseHero.jpg";
const helpers = require("../../helpers/helpers.js");
// import { RadioGroup, Radio } from "react-radio-group";

// import { Link, useNavigate } from "react-router-dom";

export default function Home(props) {
  const history = useHistory();

  // initialise state (default empty) for each input field
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [maxRad, setMaxRad] = useState(5);
  const [postCode, setPostcode] = useState("");
  const [availability, setAvailability] = useState(["test", "test"]);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isAvailAnytime, setIsAvailAnytime] = useState(true);

  const getResults = async (userSearchCriteria) => {
    console.log(
      "userSearchCrit inside getservicearray func: ",
      userSearchCriteria
    );
    try {
      const response = await axios.post(
        `http://localhost:8080/services/filtered`,
        userSearchCriteria
      );
      props.setResults(response.data);
      console.log("Data->", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function to toggle availability checkboxes
  const handleAvailabilityChange = (value) => {
    setIsAvailAnytime(value);
  };
  //create function that removes first space from postcode string
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

    console.log("userSearchCriteria->", userSearchCriteria);

    //make request to backend
    getResults(userSearchCriteria);

    //redirect to results page
    history.push("/results");
  };

  //create function which takes postcode and send postreq to API to convert to lat and long and sets state with result
  const getLongLat = (event) => {
    //first remove any spaces if there are any
    const postcodeNoSpace = removeFirstSpace(postCode);

    //create dynamic url and send to API
    const apiURL = `https://api.geoapify.com/v1/geocode/search?text=${postcodeNoSpace}&lang=en&limit=1&type=postcode&format=json&apiKey=${API_URL}`;

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
    //add validation here then send off to relevant function based on current location
    deliveryMethod !== "ftf" || useCurrentLocation
      ? compileSearchObject(event)
      : getLongLat(event);
  };

  const currentLocationClickHandler = (event) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setUseCurrentLocation(true);
    });
  };

  const postcodeClickHandler = (event) => {
    setUseCurrentLocation(false);
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
      {/* 
      <section className="home__main">
        <img
          src={lighthouseAnimation}
          alt="lighthouse"
          className="home__lighthouse-animation"
        />
      </section> */}

      <section className="home__main">
        <div className="home__main-container">
          <h1 className="home__main-header">
            Find a mental health service that's right for you
          </h1>
          <form className="home__form" onSubmit={handleSubmit}>
            <label className="home__form-input-label" htmlFor="deliveryMethod">
              How would you like to recieve support?
            </label>
            <label htmlFor="ftf">
              <input
                id="ftf"
                type="radio"
                name="deliveryMethod"
                value="ftf"
                onChange={(event) => setDeliveryMethod(event.target.value)}
              />
              In person
            </label>
            <label htmlFor="phoneCalls">
              <input
                id="phoneCalls"
                type="radio"
                name="deliveryMethod"
                value="calls"
                onChange={(event) => setDeliveryMethod(event.target.value)}
              />
              Phone call
            </label>
            <label htmlFor="videoCall">
              <input
                id="videoCall"
                type="radio"
                name="deliveryMethod"
                value="videoCalls"
                onChange={(event) => setDeliveryMethod(event.target.value)}
              />
              Video call
            </label>
            {deliveryMethod === "ftf" ? (
              <div className="home__search-input-container">
                <label
                  className="home__form-input-label"
                  htmlFor="deliveryMethod"
                >
                  Please enter your postcode, and select how far you could
                  travel to a service.
                </label>
                <div className="home__current-location-container">
                  {useCurrentLocation === false ? (
                    <>
                      <input
                        type="text"
                        name="postcode"
                        className="home__current-location-input"
                        onChange={(event) => setPostcode(event.target.value)}
                      />
                      <button
                        className="home__current-location-button"
                        type="button"
                        onClick={currentLocationClickHandler}
                      >
                        Use current location
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

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
                  <label className="component__input-label" htmlFor="category">
                    km from here
                  </label>
                </div>
              </div>
            ) : (
              <></>
            )}
            <label className="home__form-input-label" htmlFor="availabilityAll">
              When are you available to receive support?
            </label>
            <label
              className="home__form-input-label"
              htmlFor="availableAnytime"
            >
              <input
                id="availableAnytime"
                type="radio"
                name="availabilityAll"
                value={true}
                onChange={() => {
                  handleAvailabilityChange(true);
                }}
              />
              I can do any day, any time
            </label>
            <label htmlFor="notAvailableAnytime">
              <input
                id="notAvailableAnytime"
                type="radio"
                name="availabilityAll"
                value={false}
                onChange={() => {
                  handleAvailabilityChange(false);
                }}
              />
              I'd like to select when I am available
            </label>
            {isAvailAnytime === true ? (
              <></>
            ) : (
              <>
                <br /> <br />
                <label>Select your availability below.</label>
                <br /> <br />
                <div className="home__availability-container">
                  <div className="availability__row availability__row--heading ">
                    <div className="availability__col availability__col--blank-space"></div>
                    <div className="availability__col availability__heading">
                      Mon
                    </div>
                    <div className="availability__col availability__heading">
                      Tue
                    </div>
                    <div className="availability__col availability__heading">
                      Wed
                    </div>
                    <div className="availability__col availability__heading">
                      Thu
                    </div>
                    <div className="availability__col availability__heading">
                      Fri
                    </div>
                    <div className="availability__col availability__heading">
                      Sat
                    </div>
                    <div className="availability__col availability__heading">
                      Sun
                    </div>
                  </div>
                  <div className="availability__row availability__row--am">
                    <div className="availability__col availability__heading">
                      08:00 - 12:00
                    </div>
                    <div className="availability__col">
                      <input
                        id="monAm"
                        type="checkbox"
                        name="availability"
                        value="monAm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="tueAm"
                        type="checkbox"
                        name="availability"
                        value="tueAm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col ">
                      <input
                        id="wedAm"
                        type="checkbox"
                        name="availability"
                        value="wedAm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="thuAm"
                        type="checkbox"
                        name="availability"
                        value="thuAm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="friAm"
                        type="checkbox"
                        name="availability"
                        value="friAm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="satAm"
                        type="checkbox"
                        name="availability"
                        value="satAm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
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
                    <div className="availability__col availability__heading">
                      12:00 - 1700
                    </div>
                    <div className="availability__col">
                      <input
                        id="monPm"
                        type="checkbox"
                        name="availability"
                        value="monPm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="tuePm"
                        type="checkbox"
                        name="availability"
                        value="tuePm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col ">
                      <input
                        id="wedPm"
                        type="checkbox"
                        name="availability"
                        value="wedPm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="thuPm"
                        type="checkbox"
                        name="availability"
                        value="thuPm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="friPm"
                        type="checkbox"
                        name="availability"
                        value="friPm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="satPm"
                        type="checkbox"
                        name="availability"
                        value="satPm"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
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
                    <div className="availability__col availability__heading">
                      1700 - 2000
                    </div>
                    <div className="availability__col">
                      <input
                        id="monEve"
                        type="checkbox"
                        name="availability"
                        value="monEve"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="tueEve"
                        type="checkbox"
                        name="availability"
                        value="tueEve"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col ">
                      <input
                        id="wedEve"
                        type="checkbox"
                        name="availability"
                        value="wedEve"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="thuEve"
                        type="checkbox"
                        name="availability"
                        value="thuEve"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="friEve"
                        type="checkbox"
                        name="availability"
                        value="friEve"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
                      <input
                        id="satEve"
                        type="checkbox"
                        name="availability"
                        value="satEve"
                        defaultChecked
                      />
                    </div>
                    <div className="availability__col">
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
      </section>
    </>
  );
}
