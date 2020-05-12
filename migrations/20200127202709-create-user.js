module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("User", {
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
            nom_email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            nom_passwordhash: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ind_admin: {
                type: Sequelize.BOOLEAN,
                defaltValue: false,
                allowNull: false,
            },

            nom_telefone: {
                type: Sequelize.STRING,
                allowNull: true,
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
        return queryInterface.dropTable("User");
    },
};
