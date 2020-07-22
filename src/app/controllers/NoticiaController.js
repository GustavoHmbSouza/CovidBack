import * as Yup from "yup";
import path from "path";
import Noticia from "../models/Noticia";
import User from "../models/User";
import Topico from "../models/Topico";
import uploadConfig from "../../config/upload";
import fs from "fs";

class NoticiaController {
    async post(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_titulo: Yup.string().required(),
                nom_subtitulo: Yup.string().required(),
                dat_data: Yup.date().required(),
                nom_conteudo: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const noticia = await Noticia.create(req.body);

            return res.json(noticia);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                nom_titulo: Yup.string().required(),
                nom_subtitulo: Yup.string().required(),
                dat_data: Yup.date().required(),
                nom_conteudo: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body)))
                return res.status(400).json({ error: "Erro de validação." });

            const noticia = await Noticia.findByPk(req.body.id);

            const resnoticia = await noticia.update(req.body);

            return res.json(resnoticia);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async delete(req, res) {
        try {
            const user = new User();

            if (!(await user.verificaUserAdmin(req)))
                return res.status(401).json({ error: "Acesso negado." });

            const noticia = await Noticia.findByPk(req.params.id);

            await noticia.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const noticia = await Noticia.findAll({
                include: [
                    {
                        model: User,
                        required: true,
                    },
                    {
                        model: Topico,
                        required: true,
                    },
                ],
            });

            return res.json(noticia);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const noticia = await Noticia.findOne({
                where: {
                    id: req.params.id,
                },
                include: [
                    {
                        model: User,
                        required: true,
                    },
                    {
                        model: Topico,
                        required: true,
                    },
                ],
            });

            return res.json(noticia);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async updateImagem(req, res) {
        try {
            const noticia = await Noticia.findByPk(req.params.id);

            if (!noticia)
                return res
                    .status(400)
                    .json({ error: `Noticia não encontrada` });

            if (noticia.nom_imagem) {
                const imagemFilePath = path.join(
                    uploadConfig.direct,
                    noticia.nom_imagem
                );
                const imagemFileExist = await fs.promises.stat(imagemFilePath);

                if (imagemFileExist) await fs.promises.unlink(imagemFilePath);
            }

            const resnoticia = await noticia.update({
                nom_imagem: req.file.filename,
            });

            return res.json(resnoticia);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new NoticiaController();
