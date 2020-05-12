module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Cidade",
            [
                {
                    nom_name: "Passos",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Itau",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Cidade", null, {});
    },
};
