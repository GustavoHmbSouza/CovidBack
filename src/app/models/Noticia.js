import Sequelize, { Model } from "sequelize";

class Noticia extends Model {
    static init(sequelize) {
        super.init(
            {
                nom_titulo: Sequelize.STRING,
                nom_subtitulo: Sequelize.STRING,
                dat_data: Sequelize.DATE,
                nom_conteudo: Sequelize.STRING,
                nom_imagem: Sequelize.STRING,
            },
            {
                sequelize,
                freezeTableName: true,
            }
        );

        return this;
    }
}

export default Noticia;
