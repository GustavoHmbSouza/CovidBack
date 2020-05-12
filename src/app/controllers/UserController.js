import * as Yup from "yup";
import User from "../models/User";

class UserController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
                nom_email: Yup.string()
                    .email()
                    .required(),
                nom_password: Yup.string()
                    .required()
                    .min(6),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            if (!(await user.verificaUsuarioEmail(req)))
                return res
                    .status(401)
                    .json({ error: "Usuário já existe para esse e-mail." });

            const {
                id,
                nom_name,
                nom_email,
                ind_admin,
                nom_passwordhash,
            } = await User.create(req.body);

            return res.json({
                id,
                nom_name,
                nom_email,
                ind_admin,
                nom_passwordhash,
            });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                id: Yup.number(),
                nom_name: Yup.string(),
                nom_email: Yup.string().email(),
                nom_oldpassword: Yup.string().min(6),
                nom_password: Yup.string()
                    .min(6)
                    .when("nom_oldpassword", (nom_oldpassword, field) =>
                        nom_oldpassword ? field.required() : field
                    ),
                nom_confirmpassword: Yup.string().when(
                    "nom_password",
                    (nom_password, field) =>
                        nom_password
                            ? field.required().oneOf([Yup.ref("nom_password")])
                            : field
                ),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const { nom_email, nom_oldpassword } = req.body;

            let user = new User();

            if (!(await user.verificaAlterandoEmail(req)))
                return res
                    .status(400)
                    .json({ error: "Usuário já existe para esse e-mail." });

            user = await User.findByPk(req.body.id);

            if (nom_oldpassword && !(await user.checkPassword(nom_oldpassword)))
                return res
                    .status(401)
                    .json({ error: "Senha não corresponde." });

            const { id, nom_name, ind_admin } = await user.update(req.body);

            return res.json({
                id,
                nom_name,
                nom_email,
                ind_admin,
            });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async delete(req, res) {
        try {
            let user = new User();

            if (!(await user.verificaUserExiste(req)))
                return res.status(401).json({ error: "Usuário não existe." });

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            if (!(await user.verificaExcluiAdmin(req)))
                return res
                    .status(401)
                    .json({ error: "Negado a operação de deletar um adm." });

            user = await User.findByPk(req.params.id);

            await user.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            let user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            user = await User.findAll({
                where: {
                    ind_admin: false,
                },
            });

            return res.json(user);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAdmin(req, res) {
        try {
            let user = await User.findByPk(req.num_userid);

            if (!user.ind_admin)
                return res.status(401).json({ error: "Acesso negado." });

            user = await User.findByPk(req.params.id);

            return res.json({
                user,
            });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findByPk(req.num_userid);

            return res.json({
                user,
            });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new UserController();
