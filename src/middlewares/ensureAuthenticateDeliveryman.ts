import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}


export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({
            message: "Token missing",
        });
    }

    // Bearer 5454544646A4A4S4-AS4A4S6D6AS5D
    // [0] - Bearer
    // [1] - 5454544646A4A4S4-AS4A4S6D6AS5D

    const [, token ] = authHeader.split(" ")

    try {
        const { sub } = verify(token, "6ee6213d830b4f6e13aaf4c5c8697a98") as IPayload;

        request.id_deliveryman = sub;

        return next();
    } catch(err) {
        return response.status(401).json({
            message: "Invalid token!",
        });
    }
}