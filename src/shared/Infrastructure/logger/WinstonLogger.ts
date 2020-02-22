import { createLogger, transports, Logger } from 'winston'
import IWinstonLogger from '../../contracts/IWinstonLogger'

export class WinstonLogger implements IWinstonLogger{
    private readonly logFile:string

    constructor(logFile:string) {
        this.logFile = logFile
    }
    
    getLogger(): Logger  {
      return createLogger({
        transports: [
          new transports.Console(),
          new transports.File({ filename: this.logFile })
        ]
      });          
    }
}