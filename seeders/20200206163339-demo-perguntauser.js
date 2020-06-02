module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Perguntauser",
            [
                {
                    nom_name: "Posso usar mascara de pano?",
                    ind_respondido: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Sabão de barra ou alcool em gel, qual o melhor?",
                    ind_respondido: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Perguntauser", null, {});
    },
};
