
import * as express from 'express'
import { Db } from 'mongodb'
import Router from '../../../../modules/users/Infrastructure/Http/routes/index';


export default class ApiV1 {
    private readonly router:express.Router
    private readonly db:Db;
    
    constructor(db:Db) {
        this.db = db;
        this.router = express.Router();
        this.setRoutes()
    }

    private setRoutes(): void {
        const useCaseRouter = new Router(this.db).getRouter()
        this.router.use('/users', useCaseRouter)
    }

    getRouter(): express.Router {
        return this.router
    }
}