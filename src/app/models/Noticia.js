import Sequelize, { Model } from "sequelize";
import Topico from "./Topico";
import User from "./User";

class Noticia extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_titulo: Sequelize.STRING,
                nom_subtitulo: Sequelize.STRING,
                dat_data: Sequelize.DATE,
                nom_conteudo: Sequelize.STRING,
                nom_imagem: Sequelize.STRING,
                num_topicoid: Sequelize.INTEGER,
                num_userid: Sequelize.INTEGER,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        Topico.hasMany(Noticia, {
            foreignKey: "num_topicoid",
            onDelete: "cascade",
            hooks: true,
        });
        Noticia.belongsTo(Topico, {
            foreignKey: "num_topicoid",
        });

        User.hasMany(Noticia, {
            foreignKey: "num_userid",
            onDelete: "cascade",
            hooks: true,
        });
        Noticia.belongsTo(User, {
            foreignKey: "num_userid",
        });

        return this;
    }
}

export default Noticia;
