import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/error/forbidden.error.models";
import userRepositories from "../repositories/user.repositories";

const BasicAuthMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const authHeaders = req.headers['authorization'];
        if(!authHeaders){
            throw new ForbiddenError('Credenciais não informadas');
        }
        const [authType , token] = authHeaders.split(' ');
        if(authType !== 'Basic' || token){
            throw new ForbiddenError('Tipo de Autenticação Inválida');
        }
        const tokenContent = Buffer.from(token,'base64').toString('utf-8');
        const [ username , password ] = tokenContent.split(':');
        
        if(!username || !password){
            throw new ForbiddenError('Credenciais não preenchidas');
        };

        const user = await userRepositories.findByUsernameAndPassword(username,password);
        if(!user){
            throw new ForbiddenError('Usuário ou senha inválida');
        }

        req.user = user;
        next();
    }catch(error){
        next(error);
    }
}

export default BasicAuthMiddleware;