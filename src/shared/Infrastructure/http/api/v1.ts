
import * as express from 'express'
import { userRouter } from '../../../../modules/users/Infrastructure/Http/routes/index';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

export { v1Router }