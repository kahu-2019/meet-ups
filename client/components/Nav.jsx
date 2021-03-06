import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/logout";
import Login from "./Login";
import Register from "./Register";
import { Modal } from "react-bulma-components";
import { Section } from "react-bulma-components";
import SocialLogin from "./SocialLogin";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBurger: false,
      login: false,
      register: false
    };
  }
  toggleBurger = () => {
    this.setState({ showBurger: !this.state.showBurger });
  };
  render() {
    const { auth, logout } = this.props;
    const { showBurger } = this.state;

    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              className="icon-img"
              src="/images/comment.svg"
              width="64"
              height="64"
            />
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>

            <a className="navbar-item" href="#/categories">
              Categories
            </a>
          </div>

          <div className="navbar-end">
            {auth.isAuthenticated ? (
              <Fragment>
                <a className="navbar-item" href="#/dashboard">
                  My Dashboard &nbsp; <i className="far fa-user-circle" />
                </a>
                <a className="navbar-item is-large" onClick={() => logout()}>
                  Logout
                </a>
              </Fragment>
            ) : (
              [
                <div className="navbar-item">
                  <div className="buttons">
                    <a
                      onClick={() => this.setState({ register: true })}
                      className="button is-medium is-primary is-inverted is-outlined"
                    >
                      <p>Sign up</p>
                    </a>
                    <Modal
                      show={this.state.register}
                      onClose={() => this.setState({ register: false })}
                      style={{ backgroundColor: "black" }}
                    >
                      <Modal.Content>
                        <Section className="form-register">
                          <Register />
                        </Section>
                      </Modal.Content>
                    </Modal>
                    <a
                      onClick={() => this.setState({ login: true })}
                      className="button is-medium is-danger is-inverted is-outlined"
                    >
                      <p>Log in</p>
                    </a>
                    <Modal
                      show={this.state.login}
                      onClose={() => this.setState({ login: false })}
                      style={{ backgroundColor: "black" }}
                    >
                      <Modal.Content>
                        <Section className="form-login">
                          <Login />
                          <SocialLogin />
                        </Section>
                      </Modal.Content>
                    </Modal>
                  </div>
                </div>
              ]
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  };
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
