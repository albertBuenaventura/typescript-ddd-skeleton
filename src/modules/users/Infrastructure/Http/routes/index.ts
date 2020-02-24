import * as express from 'express'
import { Db } from 'mongodb'

import UserUseCase from '../../../UserInterface/createUser';
import { VerifyAuth as authenticate } from '../../../../../shared/Infrastructure/http/middleware/VerifyAuth';

export default class Router {
    private readonly router:express.Router
    private readonly db:Db

    constructor(db:Db) {
        this.db = db
        this.router = express.Router()
        this.initRoutes()    
    }

    private initRoutes(): void {
        const createUserController =  new UserUseCase(this.db).getController()
        this.router.post('/', authenticate(), (req, res) => createUserController.execute(req, res) );
        this.router.get('/me', authenticate(), (req, res) => createUserController.execute(req, res) );
    }

    getRouter(): express.Router {
        return this.router
    }
}