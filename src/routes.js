import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import CidadeController from "./app/controllers/CidadeController";
import TopicoController from "./app/controllers/TopicoController";
import PerguntaController from "./app/controllers/PerguntaController";

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

routes.post("/cidade", CidadeController.post);
routes.put("/cidade", CidadeController.update);
routes.delete("/cidade/:id", CidadeController.delete);
routes.get("/cidade/getall", CidadeController.getAll);
routes.get("/cidade/:id", CidadeController.get);

routes.post("/topico", TopicoController.post);
routes.put("/topico", TopicoController.update);
routes.delete("/topico/:id", TopicoController.delete);
routes.get("/topico/getall", TopicoController.getAll);
routes.get("/topico/:id", TopicoController.get);

routes.post("/pergunta", PerguntaController.post);
routes.put("/pergunta", PerguntaController.update);
routes.delete("/pergunta/:id", PerguntaController.delete);
routes.get("/pergunta/getall", PerguntaController.getAll);
routes.get("/pergunta/:id", PerguntaController.get);
routes.get("/pergunta/getalltopico/:id", PerguntaController.getAllTopico);

export default routes;
