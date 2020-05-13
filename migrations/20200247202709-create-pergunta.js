module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Pergunta", {
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
            nom_resposta: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nom_responsável: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            num_topicoid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Topico",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
        return queryInterface.dropTable("Pergunta");
    },
};
