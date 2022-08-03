import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";

// import each component here
import Home from "./Pages/Home/Home";
import Results from "./Pages/Results/Results";
import ServiceDetails from "./Pages/ServiceDetails/ServiceDetails";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact component={Results} />
        <Route
          path="/services/:service"
          exact
          render={() => <ServiceDetails />}
        />
        {/* <Route
          path="/"
          exact
          render={(routerProps) => <ComponentName {...routerProps} />}
        /> */}
        {/* <Route path="/404" component={FourOhFour} /> */}
        {/* <Redirect to="/404" /> */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
