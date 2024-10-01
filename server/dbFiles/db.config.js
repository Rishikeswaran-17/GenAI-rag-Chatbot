require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
        instancename: process.env.DB_INSTANCE_NAME,
    },
    port: parseInt(process.env.DB_PORT, 10),
};
module.exports = config;
