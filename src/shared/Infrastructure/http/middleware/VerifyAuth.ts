import * as jwt from 'jsonwebtoken'
import * as express from 'express'

export function VerifyAuth() {
    return async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        const token:string = req.headers['x-access-token'] as string
        
        if(!token) return res.status(500).send({ auth: false, message: 'No token provided' });         
        
        jwt.verify(token, process.env.APP_SECRET as jwt.Secret, (err, decoded) => {      
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });            
            
            //TODO: Set decoded user to express request
            console.info(decoded)
            next();
          });
    }
}