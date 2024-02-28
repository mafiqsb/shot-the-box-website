'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

if (process.env.DATABASE_URL) {
  // Use the external database URL provided by Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'dpg-cnfaf0icn0vc73e6os00-a',
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false, // Set to false if using a self-signed certificate
    },
  });
} else {
  // Fallback to individual connection parameters
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    host: 'your-database-host.render.com', // Replace with your Render PostgreSQL host
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false, // Set to false if using a self-signed certificate
    },
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.images = require('./imagedetails')(sequelize, Sequelize.DataTypes);
db.users = require('./user.js')(sequelize, Sequelize.DataTypes);
db.email_subscribers = require('./emailsubscribers.js')(
  sequelize,
  Sequelize.DataTypes
);

module.exports = db;
