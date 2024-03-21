require('dotenv').config();
const { Sequelize } = require('sequelize');
const usersModel = require('./Models/Users.js')
const eventModel = require('./Models/Event.js');
const visitasModel = require('./Models/Visitas.js');
const guardiasModel = require('./Models/Guardias.js');
const messagesModel = require('./Models/Messages.js');
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

  // SEQUELIZE.MODELS

  const { Users, Events, Visitas, Guardias, Messages } = sequelize.models;

  // RELACIONALES

  Users.belongsToMany( Visitas, { through: 'user/visits', onDelete: 'CASCADE' } );
  Visitas.belongsToMany( Users, { through: 'user/visits' } );

  Users.hasMany( Events, { foreignKey: 'userId', onDelete: 'CASCADE'} )
  Events.belongsTo( Users, { foreignKey: 'userId' } )

  Visitas.belongsToMany( Events, { through: 'events_int_visits', onDelete: 'CASCADE'} );
  Events.belongsToMany( Visitas, { through: 'events_int_visits' } );

  Users.belongsToMany( Messages, {through: 'user/messages', onDelete: 'CASCADE' } )
  Messages.belongsToMany( Users, {through: 'user/messages'} );


  module.exports ={
    ...sequelize.models,
    conn: sequelize };