import * as express from 'express'

import { createUserController } from '../../../UserInterface/createUser';
import { VerifyAuth as authenticate } from '../../../../../shared/Infrastructure/http/middleware/VerifyAuth';

const userRouter = express.Router();

userRouter.post('/', authenticate(), (req, res) => createUserController.execute(req, res) );
userRouter.get('/me', authenticate(), (req, res) => createUserController.execute(req, res) );

export { userRouter };