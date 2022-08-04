import React from "react";
import "./Home.scss";
import lighthouseAnimation from "../../assets/lighthouseIconOne.gif";
import heroImage from "../../assets/images/lighthouseHero.jpg";
// import { RadioGroup, Radio } from "react-radio-group";
import { useState, useEffect } from "react";

export default function Home() {
  // initialise state (default empty) for each input field
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [maxRad, setMaxRad] = useState(5);
  const [postCode, setPostcode] = useState("");
  const [availability, setAvailability] = useState([]);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

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
          <form className="home__form">
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
              <input type="text" name="postcode" />
              <button>Use current Location</button>
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
                    id="ThuAm"
                    type="checkbox"
                    name="availability"
                    value="ThuAm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="FriAm"
                    type="checkbox"
                    name="availability"
                    value="FriAm"
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
                    id="ThuPm"
                    type="checkbox"
                    name="availability"
                    value="ThuPm"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="FriPm"
                    type="checkbox"
                    name="availability"
                    value="FriPm"
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
                    id="ThuEve"
                    type="checkbox"
                    name="availability"
                    value="ThuEve"
                  />
                </div>
                <div className="availability__col">
                  <input
                    id="FriEve"
                    type="checkbox"
                    name="availability"
                    value="FriEve"
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
          </form>
        </div>
      </section>
    </>
  );
}
