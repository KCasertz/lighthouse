import "./AvailabilityTable.scss";
import tick from "../../assets/icons/tick.png";

import React from "react";

const AvailabilityTable = (props) => {
  const serviceAvailArr = props.service.availability;
  const userAvailArr = props.userSearch.availability;

  const getMatchingSlots = (userAvailArr, serviceAvailArr) => {
    let matchingSlots = [];
    userAvailArr.forEach((timeslot, i) => {
      timeslot && serviceAvailArr[i]
        ? matchingSlots.push(true)
        : matchingSlots.push(false);
    });
    console.log("matching slots output:", matchingSlots);
    return matchingSlots;
  };
  const matchArr = getMatchingSlots(userAvailArr, serviceAvailArr);

  return (
    <>
      <h2 className="availability__header">You availability matches</h2>
      <p className="availability__text">
        Below is a table showing the slots where you and the service match
        availability
      </p>
      <div className="availability__container">
        <div className="availability__row availability__row--heading ">
          <div className="availability__col availability__heading availability__col--blank-space"></div>
          <div className="availability__col availability__heading">Mon</div>
          <div className="availability__col availability__heading">Tue</div>
          <div className="availability__col availability__heading">Wed</div>
          <div className="availability__col availability__heading">Thu</div>
          <div className="availability__col availability__heading">Fri</div>
          <div className="availability__col availability__heading">Sat</div>
          <div className="availability__col availability__heading">Sun</div>
        </div>
        <div className="availability__row availability__row--am">
          <div className="availability__col availability__heading availability__heading--time">
            AM
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="mon AM"
              className={
                matchArr[0]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="tue AM"
              className={
                matchArr[3]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col ">
            <img
              src={tick}
              alt="wed AM"
              className={
                matchArr[6]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="thu AM"
              className={
                matchArr[9]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="fri AM"
              className={
                matchArr[12]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="sat AM"
              className={
                matchArr[15]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="sun AM"
              className={
                matchArr[18]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
        </div>
        <div className="availability__row availability__row--pm">
          <div className="availability__col availability__heading availability__heading--time">
            PM
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="mon PM"
              className={
                matchArr[1]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="tue PM"
              className={
                matchArr[4]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col ">
            <img
              src={tick}
              alt="wed PM"
              className={
                matchArr[7]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="thu PM"
              className={
                matchArr[10]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="fri PM"
              className={
                matchArr[13]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="sat PM"
              className={
                matchArr[16]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="sun PM"
              className={
                matchArr[19]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
        </div>
        <div className="availability__row availability__row--eve">
          <div className="availability__col availability__heading availability__heading--time">
            Eve
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="mon eve"
              className={
                matchArr[2]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="tue eve"
              className={
                matchArr[5]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col ">
            <img
              src={tick}
              alt="wed eve"
              className={
                matchArr[8]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="thu eve"
              className={
                matchArr[11]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="fri eve"
              className={
                matchArr[14]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="sat eve"
              className={
                matchArr[17]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
          <div className="availability__col">
            <img
              src={tick}
              alt="sun eve"
              className={
                matchArr[20]
                  ? "availability__tick availability__match"
                  : "availability__tick availability__no-match"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityTable;
