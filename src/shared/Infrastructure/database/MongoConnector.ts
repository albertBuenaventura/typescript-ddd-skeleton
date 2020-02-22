import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import IMongoConnector from '../../contracts/IMongoConnector'

export class MongoConnector implements IMongoConnector {
    private readonly mongoIp:number|string
    private readonly port:number
    private readonly databaseName:string
    private readonly mongoUrl:string
    private dbClient:MongoClient
    private dbConnection:Db

    constructor(mongoIp:number|string, port:number, databaseName:string) {
        this.mongoIp = mongoIp
        this.port = port
        this.databaseName = databaseName
        this.mongoUrl = `mongodb://${this.mongoIp}:port${this.port}/${databaseName}`
    }

    async initializeDatabase() : Promise<void> {
        console.log('setting client');
        try {
            if (!this.dbClient) {
              this.dbClient =  await MongoClient.connect(this.mongoUrl, this.getMongoClientOptions())
              this.setDatabaseConnection()   
            }
          } catch(e) {
            console.log('error during connecting to mongo: ');
            console.error(e);
          }
    }

    private setDatabaseConnection() : void {
        if (!this.dbClient) {
            console.error('Db connection is not yet established')
            return
        }

        if(this.dbConnection) {
            console.error('Db has been already set')
            return
        }

        try {
            this.dbConnection = this.dbClient.db(this.databaseName)
        } catch (e) {
            console.log('error on setting db');
            console.error(e);
        }
    }

    private getMongoClientOptions() : MongoClientOptions {
        return { useUnifiedTopology: true }
    }
}
