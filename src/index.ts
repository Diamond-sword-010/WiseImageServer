import { AppDataSource } from "./data-source";
const io = require("./socket");

const scriptInit = require("./script-initialize");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const listener = require("./modules/event/messages/listener");

const sensorRoute = require("./modules/sensor/router/sensor.router");
const troopsRoute = require("./modules/troops/router/troops.router");
const htmrRoute = require("./modules/htmr/router/htmrRouter");
const eventRoute = require("./modules/event/router/event.router");
const hospitalRoute = require("./modules/hospital/router/hospital.router");
const recommendRoute = require("./modules/recommendations/router/troops.router");


const app = express();
const port = 3000;

const main = async () => {
  try {
    await AppDataSource.initialize();
    // listener();

    scriptInit.initialTroops();
    scriptInit.initialSensors();
    scriptInit.initialObservationArea();
    scriptInit.initialHtmr();
    scriptInit.initialLocationHtmr();
    scriptInit.initialHospitals();

    // settings
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({ origin: "*" }));

    //routes
    app.use("/sensor", sensorRoute);
    app.use("/troops", troopsRoute);
    app.use("/htmr", htmrRoute);
    app.use("/events", eventRoute);
    app.use("/hospitals", hospitalRoute);
    app.use("/recommends", recommendRoute);


    // listen
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();

module.exports = app;


