import Sequelize, { Model } from "sequelize";
import Topico from "./Topico";

class Pergunta extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_name: Sequelize.STRING,
                nom_resposta: Sequelize.STRING,
                nom_responsável: Sequelize.STRING,
                num_topicoid: Sequelize.INTEGER,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        Topico.hasMany(Pergunta, {
            foreignKey: "num_topicoid",
            onDelete: "cascade",
            hooks: true,
        });
        Pergunta.belongsTo(Topico, {
            foreignKey: "num_topicoid",
        });

        return this;
    }
}

export default Pergunta;
