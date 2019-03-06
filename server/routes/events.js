const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllEvents,
  getEventsByCategory,
  getOneEvent,
  getEventsByCreator,
  createEvent,
  deleteEvent,
  editEvent,
  getAllCategories,
  getUserId
} = require("../db/events");

const {
  createSubscription,
  removeSubscription
} = require("../db/subscriptions");

router.use(express.json());

const config = {
  storage: multer.diskStorage({
    destination: function (req, file, next) {
      next(null, "./public");
    },
    filename: function (req, file, next) {
      const ext = file.mimetype.split("/")[1];
      next(null, file.fieldname + "-" + Date.now() + "." + ext);
    }
  }),
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith("image/");
    if (image) {
      next(null, true);
    } else {
      next({ message: "Invalid file type." });
    }
  }
};
//EventForm CreateEvent api route
router.post("/event/photo", multer(config).single("photo"), function (
  req,
  res,
  next
) {
  let username = req.body.user;

  getUserId(username)
    .then(userId => {
      let actualUserId = userId.id;
      let dateTime = JSON.stringify(req.body.date);
      let input = new Date(dateTime);
      let eventDateTime = input.getTime();
      const newEvent = {
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        description: req.body.description,

        date: eventDateTime,
        is_open: "true",
        image: req.file.filename,
        user_id: userId.id
      };
      createEvent(newEvent).then(([id]) => {
        let eventId = id;
        createSubscription(actualUserId, eventId).then(actualUserId => {
          getEventsByCreator(actualUserId).then(response => {
            res.json(response);
          });
        })
          .catch(err => {
            console.log('err', err)
          });
      });
    })

    .catch(err => {
      console.log('err', err)
      res.status(500).json({ error: "Oh no an error" });
    });
});

//Post EditEvent api route
router.post(
  "/event/photo/edit/:eventId",
  multer(config).single("photo"),
  function (req, res, next) {
    console.log(req.params.eventId);
    console.log(req.body);
    console.log(req.file);
    let username = req.body.user;
    let eventId = req.params.eventId;
    getUserId(username).then(userId => {
      console.log("aaaa", userId);
      let actualUserId = userId.id;
      let dateTime = JSON.stringify(req.body.date);
      let input = new Date(dateTime);
      let eventDateTime = input.getTime();
      const updateEvent = {
        name: req.body.name,
        category: req.body.category,

        location: req.body.location,
        description: req.body.description,
        date: eventDateTime,
        is_open: "true",
        image: req.file.filename,
        user_id: userId.id
      };
      editEvent(updateEvent, actualUserId, eventId)
        .then(actualUserId => {
          console.log(actualUserId);
          getEventsByCreator(actualUserId).then(response => {
            res.json(response);
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Oh no an error" });
        });
    });
  }
);

//GET /api/v1/meetups
router.get("/", (req, res) => {
  getAllEvents()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no an error" });
    });
});

router.get("/category/:category", (req, res) => {
  const category = req.params.category;
  getEventsByCategory(category)
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no an error" });
    });
});

router.get("/creator/:id", (req, res) => {
  let id = req.params.id;
  getEventsByCreator(id)
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no an error" });
    });
});

router.get("/categories", (req, res) => {
  getAllCategories()
    .then(results => {
      console.log("res", results);
      res.json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Oh no an error" });
    });
});

router.get("/event/:id", (req, res) => {
  const eventId = req.params.id;
  getOneEvent(eventId)
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no an error" });
    });
});

router.delete("/delete/:eventId/:userId", (req, res) => {
  let eventId = req.params.eventId;
  let userId = req.params.userId;
  deleteEvent(eventId, userId)
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no an error" });
    });
});

router.delete("/removeUser/:userId/:eventId/:username", (req, res) => {
  let userId = req.params.userId;
  let eventId = req.params.eventId;
  let username = req.params.username;
  removeSubscription(userId, eventId, username)
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      res.status(500).json({ error: "Oh no an error" });
    });
});

module.exports = router;
