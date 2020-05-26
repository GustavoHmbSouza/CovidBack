import Sequelize, { Model } from "sequelize";
import Cidade from "./Cidade";

class Decreto extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_titulo: Sequelize.STRING,
                dat_data: Sequelize.DATE,
                nom_conteudo: Sequelize.STRING,
                num_cidadeid: Sequelize.INTEGER,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        Cidade.hasMany(Decreto, {
            foreignKey: "num_cidadeid",
            onDelete: "cascade",
            hooks: true,
        });
        Decreto.belongsTo(Cidade, {
            foreignKey: "num_cidadeid",
        });

        return this;
    }
}

export default Decreto;
