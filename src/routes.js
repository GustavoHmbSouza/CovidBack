import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/sessions", SessionController.post);

// O Middleware só vai ser chamado para as rotas que estão a baixo
routes.use(authMiddleware);

routes.get("/", (req, res) => res.send("ok"));

routes.post("/users", UserController.post);
routes.put("/users", UserController.update);
routes.delete("/users/:id", UserController.delete);
routes.get("/users/getall", UserController.getAll);
routes.get("/users/:id", UserController.getAdmin);
routes.get("/users", UserController.getUser);

export default routes;
