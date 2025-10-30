require('dotenv').config();

const base = {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'easyfood',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: false,
    define: {
        underscored: true
    },
};

module.exports = {
    development: base,
    test: { ...base, database: `${base.database}_test`, logging: false },
    production: base,
};
