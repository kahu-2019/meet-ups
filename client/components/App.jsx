import React, { Fragment } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import Register from "./Register";
import EventInfo from "./EventInfo"
import ModelDisplay from "./ModelDisplay"

export function App({ auth }) {
  return (
    <Router>
      <Fragment>
        {!auth.isAuthenticated && <Route exact path="/" component={Login} />}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/eventinfo" component={EventInfo}/>
      </Fragment>
    </Router>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(App);
