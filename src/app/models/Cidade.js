import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Cidade extends Model {
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

        this.addHook("beforeSave", async user => {
            if (user.nom_password)
                user.nom_passwordhash = await bcrypt.hash(user.nom_password, 8);
        });

        return this;
    }
}

export default Cidade;
