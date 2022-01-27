import { Request, Response } from "express";
import { CreateDeliverymanUserCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController {
    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const createDeliverymanUseCase = new CreateDeliverymanUserCase();
        const result = await createDeliverymanUseCase.execute({
            username,
            password,
        });

        return response.json(result);
    }
}