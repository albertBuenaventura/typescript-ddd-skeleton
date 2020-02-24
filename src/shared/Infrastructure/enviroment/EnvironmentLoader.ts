import { config } from 'dotenv'
import { Logger } from 'winston'
import * as path from 'path'

export default class EnvironmentLoader {
    private readonly logger:Logger

    constructor (logger:Logger) {
        this.logger = logger
    }

    getEnvironmentFileName(): string {
        if(process.env.PRODUCTION) {
            return '.env.production'
        }
        path.resolve()
        return '.env.development'
    }

    loadEnvironmentVariables(): void {
        this.logger.info('Starting to load environment variables')
        config({ 
            path: path.resolve(process.cwd(), this.getEnvironmentFileName())
        })
        this.logger.info('The environment variables has been loaded')
    }
}