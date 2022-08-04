import React from "react";
import "./Home.scss";
import lighthouseAnimation from "../../assets/lighthouseIconOne.gif";
import heroImage from "../../assets/images/lighthouseHero.jpg";
import { RadioGroup, Radio } from "react-radio-group";

export default function Home() {
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
                // onChange={handleChange}
                // checked="true"
              />
              In person
            </label>
            <label htmlFor="phoneCalls">
              <input
                id="phoneCalls"
                type="radio"
                name="deliveryMethod"
                value="calls"
                // onChange={handleChange}
                // checked="true"
              />
              Phone call
            </label>
            <label htmlFor="videoCall">
              <input
                id="videoCall"
                type="radio"
                name="deliveryMethod"
                value="videoCalls"
                // onChange={handleChange}
                // checked="true"
              />
              Video call
            </label>
            <div className="home__search-input-container">
              <label
                className="home__form-input-label"
                htmlFor="deliveryMethod"
              >
                How would you like to recieve support?
              </label>
              <input type="text" name="postcode" />
              <button>Use current Location</button>
            </div>
            <label className="home__form-input-label" htmlFor="deliveryMethod">
              When would you like to receive support? AM = 8am - 12 midday PM =
              12 midday - 5pm Eve = 5pm - 8pm
            </label>
            <div className="home__availability-container">
              <div className="availability__row availability__row--headings ">
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
              <div className="availability__col availability__heading">AM</div>
              <div className="availability__col availability__heading">
                <input
                  id="monAm"
                  type="checkbox"
                  name="availability"
                  value="monAm"
                />
              </div>
              <div className="availability__col">Tue</div>
              <div className="availability__col ">Wed</div>
              <div className="availability__col">Thu</div>
              <div className="availability__col">Fri</div>
              <div className="availability__col">Sat</div>
              <div className="availability__col">Sun</div>
              {/* <div className="availability__row availability__row--pm">
              <div className="availability__col">AM</div>

                
                <div className="availability__col availability__col--mon">
                  <input
                    id="monPm"
                    type="checkbox"
                    name="availability"
                    value="monPm"
                  />
                </div>
                <div className="availability__col availability__col--tue">
                  <input
                    id="tuePm"
                    type="checkbox"
                    name="availability"
                    value="tuePm"
                  />
                </div>
                <div className="availability__col availability__col--wed">
                  <input
                    id="wedPm"
                    type="checkbox"
                    name="availability"
                    value="wedPm"
                  />
                </div>
                <div className="availability__col availability__col--thu">
                  <input
                    id="thuPm"
                    type="checkbox"
                    name="availability"
                    value="thuPm"
                  />
                </div>
                <div className="availability__col availability__col--fri">
                  <input
                    id="friPm"
                    type="checkbox"
                    name="availability"
                    value="friPm"
                  />
                </div>
                <div className="availability__col availability__col--sat">
                  <input
                    id="satPm"
                    type="checkbox"
                    name="availability"
                    value="satPm"
                  />
                </div>
                <div className="availability__col availability__col--sun">
                  <input
                    id="sunPm"
                    type="checkbox"
                    name="availability"
                    value="sunPm"
                  />
                </div>
              </div>
              <div className="availability__col availability__"></div>
                <div className="availability__col availability__col--mon">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="monPm"
                  />
                </div>
                <div className="availability__col availability__col--tue">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="tueAm"
                  />
                </div>
                <div className="availability__col availability__col--wed">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="wedAm"
                  />
                </div>
                <div className="availability__col availability__col--thu">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="thuAm"
                  />
                </div>
                <div className="availability__col availability__col--fri">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="friAm"
                  />
                </div>
                <div className="availability__col availability__col--sat">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="satAm"
                  />
                </div>
                <div className="availability__col availability__col--sun">
                  <input
                    id="monAm"
                    type="checkbox"
                    name="availability"
                    value="sunAm"
                  />
                </div>
              </div>
              <div className="availability__row availability__row--eve "></div>
            </div> */}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
