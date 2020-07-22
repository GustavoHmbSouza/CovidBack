import * as Yup from "yup";
import Pergunta from "../models/Pergunta";
import User from "../models/User";

class PerguntaController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
                nom_resposta: Yup.string().required(),
                num_userid: Yup.number().required(),
                num_topicoid: Yup.number().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const pergunta = await Pergunta.create(req.body);

            return res.json(pergunta);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const pergunta = await Pergunta.findByPk(req.body.id);

            const { id, nom_name } = await pergunta.update(req.body);

            return res.json({
                id,
                nom_name,
            });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async delete(req, res) {
        try {
            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const pergunta = await Pergunta.findByPk(req.params.id);

            await pergunta.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const pergunta = await Pergunta.findAll();

            return res.json(pergunta);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const pergunta = await Pergunta.findByPk(req.params.id);

            return res.json(pergunta);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAllTopico(req, res) {
        try {
            const pergunta = await Pergunta.findAll({
                where: { num_topicoid: req.params.id },
            });

            return res.json(pergunta);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new PerguntaController();
