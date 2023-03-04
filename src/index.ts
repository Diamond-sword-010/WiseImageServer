import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')

const exampleRoute = require("./modules/example/router/example.router");

const app = express()
const port = 3000

const main = async () => {
  try {
  await AppDataSource.initialize();

  // console.log("Inserting a new user into the database...")
  // const user = new User()
  // user.firstName = "Timber"
  // user.lastName = "Saw"
  // user.age = 25
  // await AppDataSource.manager.save(user)
  // console.log("Saved a new user with id: " + user.id)

  // console.log("Loading users from the database...")
  // const users = await AppDataSource.manager.find(User)
  // console.log("Loaded users: ", users)

  // settings
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: '*' }));

  //routes
  app.use('/', exampleRoute)

  // listen
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
  })

  }
  catch(error) {
    console.log(error);
  }
}
main();
