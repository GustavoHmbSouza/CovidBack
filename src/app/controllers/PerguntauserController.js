import * as Yup from "yup";
import Perguntauser from "../models/Perguntauser";
import User from "../models/User";

class TopicoController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
                ind_respondido: Yup.boolean().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const perguntaUser = await Perguntauser.create(req.body);

            return res.json(perguntaUser);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
                ind_respondido: Yup.boolean().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const perguntaUser = await Perguntauser.findByPk(req.body.id);

            const resPerguntaUser = await perguntaUser.update(req.body);

            return res.json(resPerguntaUser);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async updateRespondido(req, res) {
        try {
            const schema = Yup.object().shape({
                ind_respondido: Yup.boolean().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const perguntaUser = await Perguntauser.findByPk(req.body.id);

            const resPerguntaUser = await perguntaUser.update(req.body);

            return res.json(resPerguntaUser);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async delete(req, res) {
        try {
            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const perguntaUser = await Perguntauser.findByPk(req.params.id);

            await perguntaUser.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const perguntaUser = await Perguntauser.findAll();

            return res.json(perguntaUser);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const perguntaUser = await Perguntauser.findByPk(req.params.id);

            return res.json(perguntaUser);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new TopicoController();
