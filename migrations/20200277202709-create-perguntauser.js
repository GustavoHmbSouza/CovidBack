module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Perguntauser", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nom_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ind_respondido: {
                type: Sequelize.BOOLEAN,
                defaltValue: false,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable("Perguntauser");
    },
};
