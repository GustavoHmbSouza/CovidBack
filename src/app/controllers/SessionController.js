import jwt from "jsonwebtoken";
import * as Yup from "yup";
import User from "../models/User";

import authConfig from "../../config/auth";

class SessionController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_email: Yup.string()
                    .email()
                    .required(),
                nom_password: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "Erro de validação." });
            }
            const { nom_email, nom_password } = req.body;

            const user = await User.findOne({ where: { nom_email } });

            if (!user)
                return res
                    .status(401)
                    .json({ error: "Não existe usuário esse e-mail." });

            if (!(await user.checkPassword(nom_password)))
                return res
                    .status(401)
                    .json({ error: "Senha não corresponde." });

            const { id, nom_name, ind_admin } = user;

            return res.json({
                user: {
                    id,
                    nom_name,
                    nom_email,
                    ind_admin,
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new SessionController();
