import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcryptjs";

interface ICreateDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliverymanUserCase {
    async execute({ password, username }: ICreateDeliveryman) {
        // Validar se o Deliveryman existe
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive",
                },
            },
        });

        if(deliverymanExist) {
            throw new Error("Deliveryman already exists");
        }

        const hashPassword = await hash(password, 10);

        // Criptografar a senha
        // Salvar o Deliveryman

        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword,
            },
        });

        return deliveryman;
    }
}