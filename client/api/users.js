import request from "superagent";

export function getUsersByEvent(eventId) {
  return request.get(`/api/v1/users/event/${eventId}`).then(res => res.body);
}
