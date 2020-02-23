import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import { WinstonLogger } from '../logger/WinstonLogger'
import { Logger } from 'winston'

import IMongoConnector from '../../contracts/IMongoConnector'

export class SingletonMongoHelper implements IMongoConnector {
    private static instance: IMongoConnector;
    private readonly mongoIp:number|string
    private readonly port:number
    private readonly databaseName:string
    private readonly mongoUrl:string
    private readonly logger:Logger
    private dbClient:MongoClient
    private dbConnection:Db

    private constructor() {
        this.mongoIp = process.env.mongoIp as string
        this.port = (process.env.mongoPort as unknown) as number
        this.databaseName = process.env.databaseName as string
        this.logger = new WinstonLogger().getLogger();
        this.mongoUrl = `mongodb://${this.mongoIp}:port${this.port}/${this.databaseName}`
    }

    static getInstance() : IMongoConnector {
        if (!SingletonMongoHelper.instance) {
            SingletonMongoHelper.instance = new SingletonMongoHelper();
        }
        return SingletonMongoHelper.instance;
    }

    async initializeDatabase() : Promise<void> {
        this.logger.info('Initializing the MongoDb Connection')
        try {
            if (!this.dbClient) {
              this.dbClient =  await MongoClient.connect(this.mongoUrl, this.getMongoClientOptions())
              this.setDatabaseConnection()   
            }
          } catch(e) {
            this.logger.error(`Error on connecting to MongoDb Error:  ${e}`)
          }
    }

    public getDatabaseConnection(): Db {
        return this.dbConnection
    }

    private setDatabaseConnection() : void {
        if (!this.dbClient) {
            this.logger.error('Db connection is not yet established')
            return
        }

        if(this.dbConnection) {
            this.logger.error('Db has been already set')
            return
        }

        try {
            this.dbConnection = this.dbClient.db(this.databaseName)
            this.logger.info('Successfully connected to the MongoDb')
        } catch (e) {
            this.logger.error(`error on setting db error: ${e}`);
        }
    }

    private getMongoClientOptions() : MongoClientOptions {
        return { useUnifiedTopology: true }
    }
}
