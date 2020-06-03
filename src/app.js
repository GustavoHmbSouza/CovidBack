import express from "express";
import cors from "cors";
import routes from "./routes";
import uploadConfig from "./config/upload";
import "./database";

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use("/files", express.static(uploadConfig.direct));
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
