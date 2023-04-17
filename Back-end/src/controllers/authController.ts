import { SignInParams, SignUpParams } from "../protocols/authenticationParams";
import authServices from "../services/authServices";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signUpPost(req: Request, res: Response) {
    const { name, image, email, password } = req.body as SignUpParams;

    try {
        const createdUser = await authServices.createUser(name, image, email, password);
        return res.status(httpStatus.CREATED).send(`Your id is ${createdUser.id}`);
    } catch (err) {
        console.log(err)
        return res.status(err.status).send("E-mail já cadastrado, tente novamente com outro!");
    }
}

export async function signInPost(req: Request, res: Response) {
    const { email, password } = req.body as SignInParams;

    try {
        const userData = await authServices.loginUser(email, password);
        return res.status(httpStatus.OK).send({
            userId: userData.createdSession.userId, 
            userToken: userData.createdSession.token, 
            userPassword: userData.userPassword
        });
    } catch (err) {
        console.log(err)
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send("Senha incorreta!");
        }
        
        return res.status(err.status).send("E-mail não cadastrado!");
    }
}
