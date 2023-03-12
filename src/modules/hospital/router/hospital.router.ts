import express = require("express");
import hospitalController from "../controller/hospital.controller";

const router = express.Router();

router.route("/").get(hospitalController.getAllHospitals);

module.exports = router;
