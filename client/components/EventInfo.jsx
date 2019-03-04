import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { getEvent } from "../actions/events";
import { getUsersByEvent } from "../actions/getAllSubscriptions";

export class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false
    };
  }

  toggleTick = () => {
    this.setState({ buttonClicked: true });
  };

  render() {
    const { events, auth } = this.props;
    const { buttonClicked } = this.state;
    if (!auth.isAuthenticated && buttonClicked) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div>
          <div>
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">{events.name}</h1>
                  <div>
                    <div>
                      <a
                        className="button is-danger joinbutton"
                        onClick={this.toggleTick}
                      >
                        Join Event
                      </a>
                      {buttonClicked ? (
                        <a className="button">
                          You've been added to this event!
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <figure className="image is-50x50 eventimage">
              <img src={events.image} />
            </figure>
          </div>
          <div className="tile is-parent basicdetails">
            <article className="tile is-classNamehild box">
              <div className="content">
                <p className="title">
                  When's it happening: {events.date}
                  <br />
                  Category: {events.category}
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className="tile is-parent description">
          <article className="tile is-child notification is-success">
            <div className="content">
              <p className="title">Description</p>

              <p className="subtitle">{events.description}</p>
              <div className="content" />
            </div>
          </article>
        </div>
        <div className="tile is-parent locationtile">
          <div className="tile is-child box">
            <p className="title">Location</p>
            {events.location}
          </div>
        </div>
        <div>
          <div>
            <nav className="panel attendeepanel">
              <p className="panel-heading">Members</p>
              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="search"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                </p>
              </div>
              <p className="panel-tabs">
                <a className="is-active">Going</a>
              </p>
              <a className="panel-block">
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true" />
                </span>
                Tim
              </a>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    events: state.home.events
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getEvent: id => {
      return dispatch(getEvent(id));
    },
    getUsersByEvent: id => {
      return dispatch(getUsersByEvent(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventInfo);
