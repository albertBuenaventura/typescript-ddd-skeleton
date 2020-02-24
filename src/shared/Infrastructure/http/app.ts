import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import ApiV1 from './api/v1';
import { MongoConnector } from '../database/MongoConnector'
import { WinstonLogger } from '../logger/WinstonLogger'

(async() => {
    const app = express()
    const port = process.env.PORT || 3000
    const { mongoIp, mongoPort, databaseName } = process.env
    const logger = new WinstonLogger().getLogger();
    
    const mongoConnector = new MongoConnector(mongoIp as string, (mongoPort as unknown) as number,
     databaseName as string, logger)
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
