import { prisma } from "../../../database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // Receber username, passoword


        // Verificar se username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if(!deliveryman) {
            throw new Error("Username or password invalid!")
        }

        // Verificar se senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        // Gerar o token
        const token = sign({username}, "6ee6213d830b4f6e13aaf4c5c8697a98", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token;
    }
}