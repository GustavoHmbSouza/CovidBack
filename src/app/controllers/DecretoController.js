import * as Yup from "yup";
import path from "path";
import fs from "fs";
import Decreto from "../models/Decreto";
import User from "../models/User";
import Cidade from "../models/Cidade";
import uploadConfig from "../../config/upload";

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

            let user = new User();
            if (!(await user.verificaUserAdmin(req))) {
                user = await User.findOne({
                    where: {
                        id: req.num_userid,
                        num_cidadeid: req.body.num_cidadeid,
                    },
                });

                if (!user)
                    return res.status(400).json({
                        error:
                            "Usuário não tem permissão para está cidade ou não é admin.",
                    });
            }

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

            let user = new User();
            if (!(await user.verificaUserAdmin(req))) {
                user = await User.findOne({
                    where: {
                        id: req.num_userid,
                        num_cidadeid: req.body.num_cidadeid,
                    },
                });

                if (!user || user.num_cidadeid !== req.body.num_cidadeid)
                    return res.status(400).json({
                        error:
                            "Usuário não tem permissão para está cidade ou não é admin.",
                    });
            }

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

            if (!(await user.verificaUserAdmin(req))) {
                const decreto = await Decreto.findOne({
                    where: { id: req.params.id },
                    include: {
                        model: Cidade,
                        required: true,
                        include: {
                            model: User,
                            required: true,
                            where: {
                                id: req.num_userid,
                            },
                        },
                    },
                });

                if (!decreto)
                    return res.status(400).json({
                        error:
                            "Usuário não tem permissão para está cidade ou não é admin.",
                    });
            }

            const decreto = await Decreto.findByPk(req.params.id);

            await decreto.destroy();

            return res.status(200).json({ ok: "Ok" });
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAll(req, res) {
        try {
            const decreto = await Decreto.findAll({
                include: { model: Cidade, required: true },
            });

            return res.json(decreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async get(req, res) {
        try {
            const decreto = await Decreto.findOne({
                include: { model: Cidade, required: true },
                where: { id: req.params.id },
            });

            return res.json(decreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async getAllCidade(req, res) {
        try {
            const decreto = await Decreto.findAll({
                include: { model: Cidade, required: true },
                where: { num_cidadeid: req.params.id },
            });

            return res.json(decreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }

    async updateFile(req, res) {
        try {
            const decreto = await Decreto.findByPk(req.params.id);

            if (!decreto)
                return res
                    .status(400)
                    .json({ error: `Decreto não encontrada` });

            if (decreto.nom_file) {
                const imagemFilePath = path.join(
                    uploadConfig.direct,
                    decreto.nom_file
                );
                const imagemFileExist = await fs.promises.stat(imagemFilePath);

                if (imagemFileExist) await fs.promises.unlink(imagemFilePath);
            }

            const resdecreto = await decreto.update({
                nom_file: req.file.filename,
            });

            return res.json(resdecreto);
        } catch (e) {
            return res.status(400).json({ error: `Erro: ${e}` });
        }
    }
}

export default new TopicoController();
