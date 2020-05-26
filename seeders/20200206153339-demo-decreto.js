module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Decreto",
            [
                {
                    nom_titulo: "Covid-43",
                    dat_data: "2023-04-09",
                    nom_conteudo: "3 anos e o covid só piora =/",
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_titulo: "Covid-78",
                    dat_data: "2029-04-09",
                    nom_conteudo: "9 anos depois, alguém ainda está vivo??",
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Decreto", null, {});
    },
};
