import { prisma } from "../../../database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Receber username, passoword


        // Verificar se username cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if(!client) {
            throw new Error("Username or password invalid!")
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        // Gerar o token
        const token = sign({username}, "6ee6213d830b4f6e13aaf4c5c8697a98", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token;
    }
}