module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Pergunta",
            [
                {
                    nom_name: "Como evitar a contaminação?",
                    nom_resposta: "Sim",
                    num_userid: 1,
                    num_topicoid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Como previnir?",
                    nom_resposta: "Não",
                    num_userid: 3,
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
