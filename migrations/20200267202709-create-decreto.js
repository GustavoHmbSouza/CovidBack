module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Decreto", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nom_titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dat_data: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nom_conteudo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nom_file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            num_cidadeid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Cidade",
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
        return queryInterface.dropTable("Decreto");
    },
};
