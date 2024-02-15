require('dotenv').config();
const { Sequelize } = require('sequelize');
const usersModel = require('./Models/Users.js')
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
  visitasModel(sequelize);
  guardiasModel(sequelize);

  // SEQUELIZE.MODELS

  const { Users, Visitas, Guardias } = sequelize.models;

  // RELACIONALES

  Users.hasMany( Visitas, { foreignKey: 'userId', onDelete: 'CASCADE' } );
  Visitas.belongsTo( Users, { foreignKey: 'userId' } );

  module.exports ={
    ...sequelize.models,
    conn: sequelize };