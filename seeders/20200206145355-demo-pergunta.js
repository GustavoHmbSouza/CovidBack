module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Pergunta",
            [
                {
                    nom_name: "Como evitar a contaminação?",
                    nom_resposta: "Sim",
                    nom_responsável: "Caio",
                    num_topicoid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Como previnir?",
                    nom_resposta: "Não",
                    nom_responsável: "Jorge",
                    num_topicoid: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Pergunta", null, {});
    },
};
