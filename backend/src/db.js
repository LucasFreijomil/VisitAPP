require('dotenv').config();
const { Sequelize } = require('sequelize');
const usersModel = require('./Models/Users.js')
const visitasModel = require('./Models/Visitas.js');
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

  //

  const { Users, Visitas } = sequelize.models;

  module.exports ={
    ...sequelize.models,
    conn: sequelize };