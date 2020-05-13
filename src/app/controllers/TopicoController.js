import * as Yup from "yup";
import Topico from "../models/Topico";
import User from "../models/User";

class TopicoController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const topico = await Topico.create(req.body);

            return res.json(topico);
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

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const topico = await Topico.findByPk(req.body.id);

            const { id, nom_name } = await topico.update(req.body);

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

            const topico = await Topico.findByPk(req.params.id);

            await topico.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const topico = await Topico.findAll();

            return res.json(topico);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const topico = await Topico.findByPk(req.params.id);

            return res.json(topico);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new TopicoController();
