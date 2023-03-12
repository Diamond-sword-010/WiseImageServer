import express = require("express");
import RecommendController from "../controller/recommend.controller";

const router = express.Router();

/**
 * get all the examples
 */
router.route('/')
    .get(RecommendController.getAllRecommends);

router.route('/MoveSolidersBetweenHtmrs')
.get(RecommendController.getRecommendationsToMoveSolidersBetweenHtmrs);

router.route("/hot").get(RecommendController.getHotAreasRecommends);    

module.exports = router;