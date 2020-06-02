import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import CidadeController from "./app/controllers/CidadeController";
import TopicoController from "./app/controllers/TopicoController";
import PerguntaController from "./app/controllers/PerguntaController";
import DecretoController from "./app/controllers/DecretoController";
import PerguntauserController from "./app/controllers/PerguntauserController";

const routes = new Router();

routes.post("/sessions", SessionController.post);

routes.get("/cidade/getall", CidadeController.getAll);
routes.get("/cidade/:id", CidadeController.get);

routes.get("/topico/getall", TopicoController.getAll);
routes.get("/topico/:id", TopicoController.get);

routes.get("/pergunta/getall", PerguntaController.getAll);
routes.get("/pergunta/:id", PerguntaController.get);
routes.get("/pergunta/getalltopico/:id", PerguntaController.getAllTopico);

routes.get("/decreto/getall", DecretoController.getAll);
routes.get("/decreto/:id", DecretoController.get);
routes.get("/decreto/getallcidade/:id", DecretoController.getAllCidade);

routes.post("/perguntauser", PerguntauserController.post);
routes.put("/perguntauser", PerguntauserController.update);
routes.put(
    "/perguntauser/updaterespondido",
    PerguntauserController.updateRespondido
);
routes.delete("/perguntauser/:id", PerguntauserController.delete);
routes.get("/perguntauser/getall", PerguntauserController.getAll);
routes.get("/perguntauser/:id", PerguntauserController.get);

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

routes.post("/topico", TopicoController.post);
routes.put("/topico", TopicoController.update);
routes.delete("/topico/:id", TopicoController.delete);

routes.post("/pergunta", PerguntaController.post);
routes.put("/pergunta", PerguntaController.update);
routes.delete("/pergunta/:id", PerguntaController.delete);

routes.post("/decreto", DecretoController.post);
routes.put("/decreto", DecretoController.update);
routes.delete("/decreto/:id", DecretoController.delete);

export default routes;
