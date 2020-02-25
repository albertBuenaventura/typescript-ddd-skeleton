import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import ApiV1 from './api/v1';
import { MongoConnector } from '../database/MongoConnector'
import { WinstonLogger } from '../logger/WinstonLogger'
import EnvironmentLoader from '../enviroment/EnvironmentLoader'

(async() => {
    const logger = new WinstonLogger().getLogger();
    const environmentLoader = new EnvironmentLoader(logger).loadEnvironmentVariables()

    const app = express()
    const port = process.env.PORT || 3000
    const { MONGO_IP, MONGO_PORT, MONGO_DB_NAME } = process.env

    const mongoConnector = new MongoConnector(MONGO_IP as string, (MONGO_PORT as unknown) as number,
    MONGO_DB_NAME as string, logger)
    await mongoConnector.initializeDatabase()
    const db = mongoConnector.getDatabaseConnection()
    
    const apiV1 = new ApiV1(db)
    const v1Router = apiV1.getRouter()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    
    app.use('/api/v1', v1Router)
    
    app.listen(port, () => {
        console.log(`App is running on port ${port}`)
    })
})()
