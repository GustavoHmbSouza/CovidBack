import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_name: Sequelize.STRING,
                nom_email: Sequelize.STRING,
                nom_password: Sequelize.VIRTUAL,
                nom_passwordhash: Sequelize.STRING,
                ind_admin: Sequelize.BOOLEAN,
                nom_telefone: Sequelize.STRING,
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

    checkPassword(nom_password) {
        return bcrypt.compare(nom_password, this.nom_passwordhash);
    }

    async verificaUserExiste(req) {
        const user = await User.findByPk(req.num_userid);

        if (!user) return false;

        return true;
    }

    async verificaUserAdmin(req) {
        const user = await User.findByPk(req.num_userid);

        if (!user.ind_admin) return false;

        return true;
    }

    async verificaExcluiAdmin(req) {
        const user = await User.findByPk(req.params.id);

        if (!user.ind_admin) return true;

        return false;
    }

    async verificaUsuarioEmail(req) {
        const user = await User.findOne({
            where: { nom_email: req.body.nom_email },
        });

        if (!user) return true;

        return false;
    }

    async verificaAlterandoEmail(req) {
        const user = await User.findByPk(req.body.id);

        if (user != null)
            if (req.body.nom_email !== user.nom_email)
                return this.verificaUsuarioEmail(req);

        return true;
    }
}

export default User;
