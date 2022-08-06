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

function App() {
  const [results, setResults] = useState([]);
  const [userSearch, setUserSearch] = useState({});

  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Home setResults={setResults} setUserSearch={setUserSearch} />
          )}
        />
        <Route
          path="/results"
          render={(routerProps) => (
            <Results
              {...routerProps}
              results={results}
              userSearch={userSearch}
            />
          )}
        />
        <Route
          path="/services/:serviceId"
          render={(routerProps) => (
            <ServiceDetails
              {...routerProps}
              results={results}
              userSearch={userSearch}
            />
          )}
        />
        <Route
          path="/:serviceId/reviews"
          render={() => <Success results={results} userSearch={userSearch} />}
        />
        <Route
          path="/success"
          exact
          render={() => <Success results={results} userSearch={userSearch} />}
        />
        <Redirect to="/404" component={FourOhFour} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
