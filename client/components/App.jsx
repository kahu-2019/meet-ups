import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { getAllEvents } from "../actions/events";
import { getAllCategories } from "../actions/events";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import EventInfo from "./EventInfo";

import Categories from "./CatergoryPage";
import Dashboard from "./DashBoard";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.events();
    this.props.categories();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/category" component={Categories} />
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/eventinfo" component={EventInfo} />

          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/test" component={Dashboard} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    events: state.events,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    events: () => dispatch(getAllEvents()),
    categories: () => dispatch(getAllCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
