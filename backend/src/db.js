require('dotenv').config();
const { Sequelize } = require('sequelize');
const usersModel = require('./Models/Users.js')
const eventModel = require('./Models/Event.js');
const visitasModel = require('./Models/Visitas.js');
const guardiasModel = require('./Models/Guardias.js')
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

  // SEQUELIZE.MODELS

  const { Users, Events, Visitas, Guardias } = sequelize.models;

  // RELACIONALES

  Users.hasMany( Visitas, { foreignKey: 'userId', onDelete: 'CASCADE' } );
  Visitas.belongsTo( Users, { foreignKey: 'userId' } );

  Users.hasMany( Events, { foreignKey: 'userId', onDelete: 'CASCADE'} )
  Events.belongsTo( Users, { foreignKey: 'userId' } )

  Visitas.belongsToMany( Events, { through: 'events_int_visits', onDelete: 'CASCADE'} );
  Events.belongsToMany( Visitas, { through: 'events_int_visits' } );

  module.exports ={
    ...sequelize.models,
    conn: sequelize };