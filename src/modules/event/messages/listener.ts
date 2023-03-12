const amqp = require("amqplib/callback_api");
import saveEvents from "../logic/saveEvents";
const io = require("../../../socket");
import { Event } from "../models/event.model";
import getHospitals from "../../../modules/hospital/logic/getHospitals";
import { EventDto } from "../Dto/event.dto";
import RecommendService from "../../recommendations/services/recommend.service";

const listener = () =>
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = "clientMessages";

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        async (message) => {
          console.log("event recieved");
          const eventToSave: Event = await saveEvents.saveEvent(
            message.content.toString()
          );
          const eventToSaveDto: EventDto = Event.toDto(eventToSave);

          const emergencyHospitals = await getHospitals.getClosestHospitals(
            eventToSave
          );
          console.log("check");
          await RecommendService.addTroopsRecommend(eventToSave);
          await RecommendService.addHospitalRecommend(emergencyHospitals);

          io.emit("new-event", eventToSaveDto);
          io.emit("new-event-emergency-hospitals", emergencyHospitals);
        },
        {
          noAck: true,
        }
      );
    });
  });

module.exports = listener;
