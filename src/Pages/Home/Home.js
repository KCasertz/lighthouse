import React from "react";
import "./Home.scss";
import lighthouseAnimation from "../../assets/lighthouseIconOne.gif";
import heroImage from "../../assets/images/lighthouseHero.jpg";
// import { RadioGroup, Radio } from "react-radio-group";
import { useState, useEffect } from "react";
import API_URL from "../../api/api";
import axios from "axios";
import BACKEND_PORT from "../../api/api";

export default function Home() {
  // initialise state (default empty) for each input field
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [maxRad, setMaxRad] = useState(5);
  const [postCode, setPostcode] = useState("");
  const [availability, setAvailability] = useState(["test", "test"]);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [results, setResults] = useState([]);

  //create function that removes first space from postcode string
  const removeFirstSpace = (string) => {
    return string.replace(" ", "");
  };

  //create function which takes postcode and send postreq to API to convert to lat and long and sets state with result

  const convertPostcode = (event) => {
    //first remove any spaces if there are any
    const postcodeNoSpace = removeFirstSpace(postCode);

    //create dynamic url and send to API
    const apiURL = `https://api.geoapify.com/v1/geocode/search?text=${postcodeNoSpace}&lang=en&limit=1&type=postcode&format=json&apiKey=${API_URL}`;

    axios
      .get(apiURL)
      .then((response) => {
        // setLong(response.data.results[0].lon);
        // setLat(response.data.results[0].lat);
        const form = event.target;
        const availabilityArray = [
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
        ];
        setAvailability(availabilityArray);
        const userSearchCriteria = {
          deliveryMethod: deliveryMethod,
          location: {
            long: response.data.results[0].lon,
            lat: response.data.results[0].lat,
          },
          maxRad: Number(maxRad),
          availability: availabilityArray,
        };
        console.log("userSearchCriteria->", userSearchCriteria);
        getServicesArray(userSearchCriteria);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getServicesArray = async (userSearchCriteria) => {
    console.log(
      "userSearchCrit inside getservicearray func: ",
      userSearchCriteria
    );
    try {
      const response = await axios.post(
        `http://localhost:8080/services/filtered`,
        userSearchCriteria
      );
      setResults(response.data);
      console.log("Data->", response.data);
    } catch (error) {
      console.log("getServicesArray->", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    convertPostcode(event);

    // const form = event.target;
    // const availabilityArray = [
    //   form.monAm.checked,
    //   form.monPm.checked,
    //   form.monEve.checked,
    //   form.tueAm.checked,
    //   form.tuePm.checked,
    //   form.tueEve.checked,
    //   form.wedAm.checked,
    //   form.wedPm.checked,
    //   form.wedEve.checked,
    //   form.thuAm.checked,
    //   form.thuPm.checked,
    //   form.thuEve.checked,
    //   form.friAm.checked,
    //   form.friPm.checked,
    //   form.friEve.checked,
    //   form.satAm.checked,
    //   form.satPm.checked,
    //   form.satEve.checked,
    //   form.sunAm.checked,
    //   form.sunPm.checked,
    //   form.sunEve.checked,
    // ];

    // setAvailability(availabilityArray);

    // const userSearchCriteria = {
    //   deliveryMethod: deliveryMethod,
    //   location: {
    //     long: long,
    //     lat: lat,
    //   },
    //   maxRad: Number(event.target.maxRad.value),
    //   availability: [availabilityArray],
    // };
    // console.log("userSearchCriteria->", userSearchCriteria);
    // getServicesArray(userSearchCriteria);
  };

  const clickHandler = (event) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
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
        <img
          src={lighthouseAnimation}
          alt="lighthouse"
          className="home__lighthouse-animation"
        />
      </section>

      <section className="home__main">
        <div className="home__main-container">
          <h1 className="home__main-header">
            Find a mental health service that's right for you
          </h1>
          <form className="home__form" onSubmit={handleSubmit}>
            {/* radio buttons below */}

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
            <div className="home__search-input-container">
              <label
                className="home__form-input-label"
                htmlFor="deliveryMethod"
              >
                Please enter your postcode, and select how far you could travel
                to a service.
              </label>
              <input
                type="text"
                name="postcode"
                onChange={(event) => setPostcode(event.target.value)}
              />
              <button type="button" onClick={clickHandler}>
                Use current Location
              </button>
              <div className="home__dropdown-container">
                <select
                  name="maxRad"
                  className="home__dropdown-input"
                  id="maxRad"
                  // value="5"
                  selected="selected"
                  onChange={(event) => setMaxRad(event.target.value)}
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
                <label className="component__input-label" htmlFor="category">
                  km
                </label>
              </div>
            </div>
            <label className="home__form-input-label" htmlFor="deliveryMethod">
              When would you like to receive support? AM is 8am to 12 midday. PM
              is 12 midday to 5pm. Eve is 5pm to 8pm.
            </label>
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
                  AM
                </div>
                <div className="availability__col">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="monAm"
                    // onChange={(event) => setTest(event.target.checked)}
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="tueAm"
                    type="checkbox"
                    name="availability"
                    value="tueAm"
                  />
                </div>
                <div className="availability__col ">
                  <input
                    id="wedAm"
                    type="checkbox"
                    name="availability"
                    value="wedAm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="thuAm"
                    type="checkbox"
                    name="availability"
                    value="thuAm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="friAm"
                    type="checkbox"
                    name="availability"
                    value="friAm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="satAm"
                    type="checkbox"
                    name="availability"
                    value="satAm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="sunAm"
                    type="checkbox"
                    name="availability"
                    value="sunAm"
                  />
                </div>
              </div>
              <div className="availability__row availability__row--pm">
                <div className="availability__col availability__heading">
                  PM
                </div>
                <div className="availability__col">
                  <input
                    id="monPm"
                    type="checkbox"
                    name="availability"
                    value="monPm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="tuePm"
                    type="checkbox"
                    name="availability"
                    value="tuePm"
                  />
                </div>
                <div className="availability__col ">
                  <input
                    id="wedPm"
                    type="checkbox"
                    name="availability"
                    value="wedPm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="thuPm"
                    type="checkbox"
                    name="availability"
                    value="thuPm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="friPm"
                    type="checkbox"
                    name="availability"
                    value="friPm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="satPm"
                    type="checkbox"
                    name="availability"
                    value="satPm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="sunPm"
                    type="checkbox"
                    name="availability"
                    value="sunPm"
                  />
                </div>
              </div>
              <div className="availability__row availability__row--eve">
                <div className="availability__col availability__heading">
                  Eve
                </div>
                <div className="availability__col">
                  <input
                    id="monEve"
                    type="checkbox"
                    name="availability"
                    value="monEve"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="tueEve"
                    type="checkbox"
                    name="availability"
                    value="tueEve"
                  />
                </div>
                <div className="availability__col ">
                  <input
                    id="wedEve"
                    type="checkbox"
                    name="availability"
                    value="wedEve"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="thuEve"
                    type="checkbox"
                    name="availability"
                    value="thuEve"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="friEve"
                    type="checkbox"
                    name="availability"
                    value="friEve"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="satEve"
                    type="checkbox"
                    name="availability"
                    value="satEve"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="sunEve"
                    type="checkbox"
                    name="availability"
                    value="sunEve"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="home__availability-submit-button">
              Find
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
