import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepositories from "../repositories/user.repositories";
import DatabaseError from "../models/error/database.error.models";
import jwtMiddlewaresAuth from "../middlewares/jwtAuth.moddlewares";

const usersRoute = Router();

usersRoute.get('/users', async (req:Request , res:Response , next:NextFunction) => {
    try{
        const users = await userRepositories.findAllUsers();
        res.status(StatusCodes.OK).send(users);
    }catch(error){
        next(error);
    }
});

usersRoute.get('/users/:uuid',async (req:Request<{uuid:string}> , res:Response , next:NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const users = await userRepositories.findById(uuid);
        res.status(StatusCodes.OK).send({users});
    }catch(error){
        next(error);
    }
});

usersRoute.post('/users',async (req:Request , res:Response , next:NextFunction) => {
    try{
        const newUser = req.body;
        const uuid =  await userRepositories.create(newUser);
        res.status(StatusCodes.CREATED).send(uuid);
    }catch(error){
        next(error);
    }
});

usersRoute.put('/users/:uuid',async(req:Request<{uuid:string}> , res:Response , next:NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;
        await userRepositories.update(modifiedUser);
        res.status(StatusCodes.OK).send();
    }catch(error){
        next(error);
    }
});

usersRoute.delete('/users/:uuid',async(req:Request<{uuid:string}> , res:Response , next:NextFunction) => {
    try{
        const uuid =  req.params.uuid;
        await userRepositories.remove(uuid);
        res.status(StatusCodes.OK);
    }catch(error){
        next(error);
    }
});

export default usersRoute;
