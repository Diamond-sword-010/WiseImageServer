import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Example } from "./modules/example/models/example.model"

/**
 * configuration for the DB
 */
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.synchronize === 'true',
    logging: false,
    entities: [User, Example],
    migrations: [],
    subscribers: [],
})
