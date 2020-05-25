module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Cidade",
            [
                {
                    nom_name: "Passos",
                    nom_uf: "Mg",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Itau",
                    nom_uf: "Sp",
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
