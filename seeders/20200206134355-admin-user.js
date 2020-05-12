module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "User",
            [
                {
                    nom_name: "Gustavos H. M. B. Souza",
                    nom_email: "gustavohmbsouza@gmail.com",
                    nom_passwordhash:
                        "$2a$08$xdDrXlNUZ00St1qJK9o2oe4WzHiAafEthoxsqr37JOdBjWaoQgHx6",
                    ind_admin: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("User", null, {});
    },
};
