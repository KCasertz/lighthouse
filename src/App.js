import React from "react";
import { Route, Switch, Redirect, RouterProps } from "react-router-dom";
import "./App.scss";

// import each component here
import Home from "./Pages/Home/Home";
import Results from "./Pages/Results/Results";
import ServiceDetails from "./Pages/ServiceDetails/ServiceDetails";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import FourOhFour from "./Pages/FourOhFour/FourOhFour";
import { useState } from "react";
import Success from "./Pages/Success/Success";
import Webchat from "./Pages/Webchat/Webchat";

function App() {
  const [results, setResults] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [userSearch, setUserSearch] = useState({});
  const [isFree, setIsFree] = useState(true);

  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Home
              setResults={setResults}
              setUserSearch={setUserSearch}
              setTherapists={setTherapists}
            />
          )}
        />
        <Route
          path="/results"
          render={(routerProps) => (
            <Results
              {...routerProps}
              results={results}
              therapists={therapists}
              userSearch={userSearch}
              setIsFree={setIsFree}
              isFree={isFree}
            />
          )}
        />
        <Route
          path="/services/:currentId"
          render={(routerProps) => (
            <ServiceDetails
              {...routerProps}
              results={results}
              userSearch={userSearch}
              therapists={therapists}
              isFree={isFree}
            />
          )}
        />
        <Route
          path="/:serviceId/reviews"
          render={() => <Success results={results} userSearch={userSearch} />}
        />
        <Route path="/chat" component={Webchat} />
        <Route
          path="/:serviceId/success"
          render={(routerProps) => (
            <Success
              {...routerProps}
              results={results}
              userSearch={userSearch}
            />
          )}
        />
        {/* <Route
          path="/:serviceId/success"
          exact
          render={() => <Success results={results} userSearch={userSearch} />}
        /> */}
        <Redirect to="/404" component={FourOhFour} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
