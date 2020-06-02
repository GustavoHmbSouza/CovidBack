import Sequelize, { Model } from "sequelize";
import Cidade from "./Cidade";

class Perguntauser extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_name: Sequelize.STRING,
                ind_respondido: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        return this;
    }
}

export default Perguntauser;
