import * as Yup from "yup";
import Decreto from "../models/Decreto";
import User from "../models/User";

class TopicoController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_titulo: Yup.string().required(),
                dat_data: Yup.date().required(),
                nom_conteudo: Yup.string().required(),
                num_cidadeid: Yup.number().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const decreto = await Decreto.create(req.body);

            return res.json(decreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_titulo: Yup.string().required(),
                dat_data: Yup.date().required(),
                nom_conteudo: Yup.string().required(),
                num_cidadeid: Yup.number().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const decreto = await Decreto.findByPk(req.body.id);

            const resDecreto = await decreto.update(req.body);

            return res.json(resDecreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async delete(req, res) {
        try {
            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const decreto = await Decreto.findByPk(req.params.id);

            await decreto.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const decreto = await Decreto.findAll();

            return res.json(decreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const decreto = await Decreto.findByPk(req.params.id);

            return res.json(decreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new TopicoController();
