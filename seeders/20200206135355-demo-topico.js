module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Topico",
            [
                {
                    nom_name: "Contaminação",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Prevenção",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Topico", null, {});
    },
};
