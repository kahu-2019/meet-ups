const connection = require("./connection");

function getSubscriptionsByUsername(username, testDb) {
  const db = testDb || connection;
  return db("users")
    .where("user_name", username)
    .first()
    .then(user => {
      return db("subscriptions")
        .join("events", "subscriptions.event_id", "events.id")
        .where("subscriptions.user_id", user.id)
        .select(
          "events.name as name",
          "events.description as description",
          "events.location as location",
          "events.date as date",
          "events.id as id"
        );
    });
}

function createSubscription(userId, eventId, testDb) {
  const db = testDb || connection;
  console.log('userId', userId, typeof userId)
  console.log('eventId', eventId, typeof eventId)
  return db("subscriptions").insert({
    user_id: userId,
    event_id: eventId
  });
}

function removeSubscription(userId, eventId, username, testDb) {
  const db = testDb || connection;
  return db("subscriptions")
    .where("subscriptions.user_id", userId)
    .where("subscriptions.event_id", eventId)
    .del()
    .then(date => {
      return getSubscriptionsByUsername(username);
    });
}
module.exports = {
  createSubscription,
  removeSubscription,
  getSubscriptionsByUsername
};
