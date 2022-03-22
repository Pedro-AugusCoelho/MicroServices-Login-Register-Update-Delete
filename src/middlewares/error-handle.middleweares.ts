import { NextFunction , Request , Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/error/database.error.models";
import ForbiddenError from "../models/error/forbidden.error.models";

const ErrorHandle = (error:any,req:Request,res:Response,next:NextFunction) => {
    if(error instanceof DatabaseError){
        res.status(StatusCodes.BAD_REQUEST);
    }else if(error instanceof ForbiddenError){
        res.status(StatusCodes.FORBIDDEN);
    }
    else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default ErrorHandle;