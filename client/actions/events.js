import { getAllEvents as apiGetAllEvents, getOneEvent } from "../api/events";
import { getAllCategories as apiGetAllCategories } from "../api/events";

export function getAllEvents() {
  return dispatch => {
    return apiGetAllEvents().then(events => {
      dispatch(saveEvents(events));
    });
  };
}

export function getEvent(id) {
  return dispatch => {
    return getOneEvent(id).then(events => {
      dispatch(saveEvents(events));
    });
  };
}

export function getAllCategories() {
  return dispatch => {
    return apiGetAllCategories().then(Categories => {
      dispatch(saveCategories(Categories));
    });
  };
}

export function saveEvents(events) {
  return {
    type: "SAVE_EVENTS",
    events: events
  };
}

export function saveCategories(categories) {
  return {
    type: "SAVE_CATEGORIES",
    categories: categories
  };
}
