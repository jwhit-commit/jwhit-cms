// Import dependencies
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Initialize Sequelize
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL); // When deploying to Heroku, add url to .env to inialize to jawsdb
} else {
    // Otherwise, deploy to local mysql
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
  );
}

module.exports = sequelize;
