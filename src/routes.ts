import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/cilents/useCases/createClient/CreateClientController";
import { FindAllDeliveriesClientController } from "./modules/cilents/useCases/deliveries/FindAllDeliveriesClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/findAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();

const findAllAvailableController = new FindAllAvailableController();

const updateDeliverymanController = new UpdateDeliverymanController();

const findAllDeliveriesClientController = new FindAllDeliveriesClientController();

const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();

routes.post("/authenticate/", authenticateClientController.handle);

routes.post("/client/", createClientController.handle);

routes.post("/deliveryman/", createDeliverymanController.handle);

routes.post("/deliverymanauth", authenticateDeliverymanController.handle);

routes.post("/delivery",ensureAuthenticateClient, createDeliveryController.handle);

routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle);

routes.put("/delivery/updatedeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle);

routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesClientController.handle);

routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle);

export { routes };