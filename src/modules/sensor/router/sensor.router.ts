import express = require("express");
import sensorController from "../controller/sensor.controller";

const router = express.Router();

router.route("/").get(sensorController.getAllSensors);

router.route("/amounts").get(sensorController.getWorkingAndNotWorkingSensorsAmount);

router.route("/:id").get(sensorController.getSensorById);

router.route("/observationArea/:id").get(sensorController.getSensorObservationAreaById);

module.exports = router;
