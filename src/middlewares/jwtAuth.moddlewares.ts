import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/error/forbidden.error.models";
import Jwt from "jsonwebtoken";
import userRepositories from "../repositories/user.repositories";


const jwtMiddlewaresAuth = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const authHeaders = req.headers['authorization'];
        
        if(!authHeaders){
            throw new ForbiddenError('Credenciais não informadas');
        };
        const [authType , token] = authHeaders.split(' ');
        if(authType !== 'Bearer' || token){
            throw new ForbiddenError('Tipo de Autenticação Inválida');
        };

        try {

            const tokenPayLoad = Jwt.verify(token , 'my_secret_key');
            
            if(typeof tokenPayLoad !== 'object' || !tokenPayLoad.sub){
                throw new ForbiddenError('Token inválido');
            }
    
            const uuid = tokenPayLoad.sub;
    
            if(!uuid){
                throw new ForbiddenError('Token inválido');
            }
    
            const user = await userRepositories.findById(uuid);
            req.user = user;
            next();
        }catch(error){
            throw new ForbiddenError('Token inválido');
        }
    }catch(error){
        next(error);
    }
}

export default jwtMiddlewaresAuth;