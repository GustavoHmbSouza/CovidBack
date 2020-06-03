module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Noticia",
            [
                {
                    nom_titulo: "Covid-43",
                    nom_subtitulo: "Covid-43 ataca novamente",
                    dat_data: "2023-04-09",
                    nom_conteudo: "3 anos e o covid só piora =/",
                    nom_imagem: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_titulo: "Covid-102",
                    nom_subtitulo: "Covid-102 ataca novamente",
                    dat_data: "2078-04-09",
                    nom_conteudo: "A vida meu parceiro. A vida.",
                    nom_imagem: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Noticia", null, {});
    },
};
