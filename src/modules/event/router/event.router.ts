import express = require("express");
import eventController from "../controller/event.controller";

const router = express.Router();

router.route("/").get(eventController.getAllEvents);

router.route("/:id").get(eventController.getEventById);

module.exports = router;
