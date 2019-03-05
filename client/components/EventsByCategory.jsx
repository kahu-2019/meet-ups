import React, { Component } from "react";
import { connect } from "react-redux";
import { getEventsByCategory } from "../actions/getEventsByCategory";

export class EventsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getEventsByCategory(this.props.match.params.category);
  }

  render() {
    return (
      <div>
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content">
            {this.props.events.map(event => (
              <div key={event.id}>
                <p>{event.name}</p>
                <p>{event.description}</p>
                <p>{event.location}</p>
              </div>
            ))}
          </div>
          <button className="modal-close is-large" aria-label="close" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.home.selectedEventsByCategory
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getEventsByCategory: category => {
      dispatch(getEventsByCategory(category));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsByCategory);