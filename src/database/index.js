import Sequelize from "sequelize";

import databaseConfig from "../config/database";

import User from "../app/models/User";
import Cidade from "../app/models/Cidade";
import Topico from "../app/models/Topico";
import Pergunta from "../app/models/Pergunta";
import Decreto from "../app/models/Decreto";

const models = [User, Cidade, Topico, Pergunta, Decreto];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection));
    }
}

export default new Database();
