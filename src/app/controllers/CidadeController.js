import * as Yup from "yup";
import Cidade from "../models/Cidade";
import User from "../models/User";

class CidadeController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
                nom_uf: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const cidade = await Cidade.create(req.body);

            return res.json(cidade);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_name: Yup.string().required(),
                nom_uf: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const cidade = await Cidade.findByPk(req.body.id);

            const { id, nom_name } = await cidade.update(req.body);

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

            const cidade = await Cidade.findByPk(req.params.id);

            await cidade.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const cidade = await Cidade.findAll();

            return res.json(cidade);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const cidade = await Cidade.findByPk(req.params.id);

            return res.json(cidade);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new CidadeController();
