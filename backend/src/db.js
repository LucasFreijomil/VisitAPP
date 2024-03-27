require('dotenv').config();
const { Sequelize } = require('sequelize');
const usersModel = require('./Models/Users.js')
const eventModel = require('./Models/Event.js');
const visitasModel = require('./Models/Visitas.js');
const guardiasModel = require('./Models/Guardias.js');
const messagesModel = require('./Models/Messages.js');
const employeesModel = require('./Models/Employees.js');
const providersModel = require('./Models/Providers.js');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env

let sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/Visitapp`, { logging: false, native: false })

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar:', err);
  })

  //  CORE MODELS

  usersModel(sequelize);
  eventModel(sequelize);
  visitasModel(sequelize);
  guardiasModel(sequelize);
  messagesModel(sequelize);
  employeesModel(sequelize);
  providersModel(sequelize);

  // SEQUELIZE.MODELS

  const { Users, Events, Visitas, Employees, Guardias, Messages, Providers } = sequelize.models;

  // RELACIONALES

  Users.belongsToMany( Visitas, { through: 'user/visits', onDelete: 'CASCADE' } );
  Visitas.belongsToMany( Users, { through: 'user/visits' } );

  Users.hasMany( Events, { foreignKey: 'userId', onDelete: 'CASCADE'} )
  Events.belongsTo( Users, { foreignKey: 'userId' } )

  Visitas.belongsToMany( Events, { through: 'events_int_visits', onDelete: 'CASCADE'} );
  Events.belongsToMany( Visitas, { through: 'events_int_visits' } );

  Users.belongsToMany( Messages, {through: 'user/messages', onDelete: 'CASCADE' } )
  Messages.belongsToMany( Users, {through: 'user/messages'} );

  Users.belongsToMany( Employees, {through: 'user/employees', onDelete: 'CASCADE' } );
  Employees.belongsToMany( Users, {through: 'user/employees' } );

  Users.belongsToMany( Providers, {through: 'user/providers', onDelete: 'CASCADE' } );
  Providers.belongsToMany( Users, {through: 'user/providers' } );

  Events.belongsToMany( Employees, {through: 'events/employees', onDelete: 'CASCADE' } );
  Employees.belongsToMany( Events, {through: 'events/employees' } );

  module.exports ={
    ...sequelize.models,
    conn: sequelize };