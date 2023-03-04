import express = require("express");
import exampleController from "../controller/example.controller";

const router = express.Router();

/**
 * get all the examples
 */
router.route('/')
    .get(exampleController.getAllExamples);

module.exports = router;