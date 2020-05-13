import Sequelize, { Model } from "sequelize";

class Topico extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_name: Sequelize.STRING,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        return this;
    }
}

export default Topico;
