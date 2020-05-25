import Sequelize, { Model } from "sequelize";
import User from "./User";

class Cidade extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_name: Sequelize.STRING,
                nom_uf: Sequelize.STRING,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        Cidade.hasMany(User, {
            foreignKey: "num_cidadeid",
            onDelete: "cascade",
            hooks: true,
        });
        User.belongsTo(Cidade, {
            foreignKey: "num_cidadeid",
        });

        return this;
    }
}

export default Cidade;
