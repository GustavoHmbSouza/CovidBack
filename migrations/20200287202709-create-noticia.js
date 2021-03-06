module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Noticia", {
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
            nom_subtitulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dat_data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            nom_conteudo: {
                type: Sequelize.STRING(5000),
                allowNull: false,
            },
            nom_imagem: {
                type: Sequelize.STRING,
                allowNull: true,
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
            num_userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "User",
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
        return queryInterface.dropTable("Noticia");
    },
};
