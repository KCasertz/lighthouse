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

function App() {
  const [results, setResults] = useState([]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Home setResults={setResults} />} />
        <Route
          path="/results"
          render={(routerProps) => (
            <Results {...routerProps} results={results} />
          )}
        />
        <Route
          path="/services/:serviceId"
          render={(routerProps) => (
            <ServiceDetails {...routerProps} results={results} />
          )}
        />
        <Redirect to="/404" component={FourOhFour} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
