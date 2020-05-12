module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "User",
            [
                {
                    nom_name: "Alan Romulo",
                    nom_email: "alanromulo@gmail.com",
                    nom_passwordhash:
                        "$2a$08$/fMLXbxCdVZmhiKjaCAM2.T4bs2qnBlXJb6vFHGStLIzynnQ4kf5W",
                    ind_admin: false,
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Marisa Silva",
                    nom_email: "marisa@gmail.com",
                    nom_passwordhash:
                        "$2a$08$nngJbNvMRK1byW0P0wc61eOxg68J2lgYVdK6v.OcaZsZKam0b.IX.",
                    ind_admin: false,
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Matheus Jorge",
                    nom_email: "mjorge@gmail.com",
                    nom_passwordhash:
                        "$2a$08$Vs9q1S3hwLcFH/jUwAWFbuNqE6ZinmiFrtstn9uitMwHtcFso7Zzm",
                    ind_admin: false,
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Henrique Santos",
                    nom_email: "santos123@gmail.com",
                    nom_passwordhash:
                        "$2a$08$/w0kVRuswQGFM4cpVht7NepAaG1KWSEAbt95n4dRbzUyhDz5emgmS",
                    ind_admin: false,
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Kaique Ferreira",
                    nom_email: "kai2020@gmail.com",
                    nom_passwordhash:
                        "$2a$08$51pMN3QRjOz8ThRU2Jf9yut1/vJqtIUHfV2yJJk1VrbBQp4gWm2Be",
                    ind_admin: false,
                    num_cidadeid: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Francisco Maia",
                    nom_email: "Maia2018@gmail.com",
                    nom_passwordhash:
                        "$2a$08$TeY0cASI6f6COgX4C4NUTuSIg5gWzilf6NfYz1Yk0zn4gFizx.mGS",
                    ind_admin: false,
                    num_cidadeid: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nom_name: "Nayara Azevedo",
                    nom_email: "nayara321@gmail.com",
                    nom_passwordhash:
                        "$2a$08$h8QbpY4uw0nJjLzkD1UFiOS/8B2VogtkuBN02DkvCkvbKAU7wsU3m",
                    ind_admin: false,
                    num_cidadeid: 1,
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
