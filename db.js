const { Sequelize } = require('sequelize');
const Logger = require('./utils/logger');



const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: (msg) => Logger.info(msg),
});

sequelize.authenticate()
  .then(async () => {
    await sequelize.sync();
    Logger.info('Connection has been established successfully.');
  })
  .catch(error => {
    Logger.error('Unable to connect to the database:', error);
    process.exit(1);
  });


module.exports = sequelize;