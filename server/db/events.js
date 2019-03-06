const connection = require("./connection");
const knex = require("knex");

function getAllEvents(testDb) {
  const db = testDb || connection;
  return db("events").select();
}

function getEventsByCategory(category, testDb) {
  const db = testDb || connection;
  return db("events")
    .where("category", category)
    .select();
}

function getEventsByCreator(userId, testDb) {
  const db = testDb || connection;
  return db("events")
    .where("events.user_id", userId)
    .select();
}

function getOneEvent(id, testDb) {
  const db = testDb || connection;
  return db("events")
    .where("id", id)
    .first();
}

function getAllCategories(testDb) {
  const db = testDb || connection;
  // return db("events")
  return db('events').select(db.raw("MIN(category) AS category"), db.raw("MIN(image) AS image"))
    .groupBy(db.raw("LOWER(category)"))
    .orderBy(db.raw("MIN(category)"));
}

function createEvent(newEvent, testDb) {
  const db = testDb || connection;
  return db("events").insert(newEvent, "id");
}

function editEvent(event, actualUserId, eventId, testDb) {
  const db = testDb || connection;
  return db("events")
    .where("id", eventId)

    .update(event);
}

function deleteEvent(eventId, userId, testDb) {
  const db = testDb || connection;
  return db("events")
    .where("id", eventId)
    .del()
    .then(data => {
      return getEventsByCreator(userId);
    });
}

function getUserId(username, testDb) {
  const db = testDb || connection;

  return db("users")
    .select()
    .where("user_name", username)
    .first();
  // .then(user => user.id);
}

module.exports = {
  getAllEvents,
  getEventsByCategory,
  getOneEvent,
  getEventsByCreator,
  getAllCategories,
  createEvent,
  deleteEvent,
  editEvent,
  getUserId
};
