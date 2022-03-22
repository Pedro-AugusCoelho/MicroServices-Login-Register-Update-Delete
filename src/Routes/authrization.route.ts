import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/error/forbidden.error.models";
import userRepositories from "../repositories/user.repositories";
import Jwt, { SignOptions } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import BasicAuthMiddleware from "../middlewares/basicAuth.middlewares";
import jwtMiddlewaresAuth from "../middlewares/jwtAuth.moddlewares";


const authRoute = Router();

authRoute.post('/token/validate' , jwtMiddlewaresAuth , (req:Request,res:Response,next:NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

authRoute.post('/token', BasicAuthMiddleware , async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = req.user;
        if(!user){
            throw new ForbiddenError('Usuário não informado!!');
        }
        const JwtPayload = {username:user.username};
        const JwtOptions:SignOptions = {subject: user?.uuid, expiresIn:'15m'};
        const SecretKey = 'my_secret_key';
        const jwt = Jwt.sign(JwtPayload, SecretKey, JwtOptions);
        res.status(StatusCodes.OK).json({token:jwt});

    }catch(error){
        next(error);
    }
});

export default authRoute;