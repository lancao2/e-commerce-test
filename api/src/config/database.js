require('dotenv').config();

module.exports= {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    dialect: process.env.DB,
    username: process.env.USER_DB,
    password: process.env.PW_DB,
    database: process.env.NM_DB,
    define: {
        timestamps: true,
        underscored: true,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};