import express = require("express");
import htmrController from "../controller/htmrController";
const router = express.Router();

/**
 * get all the examples
 */
router.route("/").get(htmrController.getAllHtmr);

router.route("/securityLevelAmounts").get(htmrController.getHtmrSecurityLevelAmounts);

router.route("/eventsAmount").get(htmrController.getEventsAmountInHtmrs);

router.route("/solidersAmount").get(htmrController.getSoliders)


module.exports = router;