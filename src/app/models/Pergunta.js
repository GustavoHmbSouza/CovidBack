import Sequelize, { Model } from "sequelize";
import Topico from "./Topico";
import User from "./User";

class Pergunta extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_name: Sequelize.STRING,
                nom_resposta: Sequelize.STRING,
                num_topicoid: Sequelize.INTEGER,
                num_userid: Sequelize.INTEGER,
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

        User.hasMany(Pergunta, {
            foreignKey: "num_userid",
            onDelete: "cascade",
            hooks: true,
        });
        Pergunta.belongsTo(User, {
            foreignKey: "num_userid",
        });

        return this;
    }
}

export default Pergunta;
