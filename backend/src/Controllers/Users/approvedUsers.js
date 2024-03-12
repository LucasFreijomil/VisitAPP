const { Users, Events, Visitas } = require("../../db.js");
const { Op, fn, col } = require('sequelize');

const approvedUsers = async(req, res) =>
{
  const { id, email, name, surname, dni } = req.query;
    
  if(id)
  {
      try
      {
          const userById = await Users.findByPk( id,
              {
                where: { isApproved: false },
                  include: [
              {
                  model: Visitas,
                  as: 'Visitas',
                  attributes: ["id", "name", "surname", "dni", "company", "work" ]
              },
              {
                  model: Events,
                  as: 'Events',
                  attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
              }]} );
          res.status(200).json( userById );
      }
      catch(error)
      {
          res.status(500).json( { error_getNotApprovedUserById: error.message } );
      }
  }
  else
  {
      if(email)
      {
          try
          {
              const userByMail= await Users.findOne( { where: { email, isApproved: false }, include:
                  [ {
                      model: Visitas,
                      as: 'Visitas',
                      attributes: ["id", "name", "surname", "dni", "company", "work" ],
                  },
                  {
                      model: Events,
                      as: 'Events',
                      attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                  } ] } );
              res.status(200).json( userByMail );
          }
          catch(error)
          {
              res.status(500).json( {error_getNotApprovedUserByMail: error.message } );
          }
      }
      else
      {
          if(name)
          {
              if(surname)
              {
                  try
                  {
                      const thisNameSurname = await Users.findAll( { where:
                          {
                              name: { [Op.iLike]: `%${name}%`},
                              surname: { [Op.iLike]: `%${surname}%`},
                              isApproved: false }, include:
                          [ {
                              model: Visitas,
                              as: 'Visitas',
                              attributes: ["id", "name", "surname", "dni", "company", "work" ],
                          },
                          {
                              model: Events,
                              as: 'Events',
                              attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                          } ] } );
                      res.status(200).json( thisNameSurname );
                  }
                  catch(error)
                  {
                      res.status(500).json( { error_getNotApprovedByNameSurname: error } );
                  }
              }
              else
              {
                  try
                  {
                      const thisName = await Users.findAll( { where: { name: { [Op.iLike]: `%${name}%`}, isApproved: false }, include:
                          [ {
                              model: Visitas,
                              as: 'Visitas',
                              attributes: ["id", "name", "surname", "dni", "company", "work" ],
                          },
                          {
                              model: Events,
                              as: 'Events',
                              attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                          } ] } );
                      const thisSurname = await Users.findAll( { where: { surname: { [Op.iLike]: `%${name}%`}, isApproved: false }, include:
                          [ {
                              model: Visitas,
                              as: 'Visitas',
                              attributes: ["id", "name", "surname", "dni", "company", "work" ],
                          },
                          {
                              model: Events,
                              as: 'Events',
                              attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                          } ] } );
                      res.status(200).json( [...thisName, ...thisSurname] );
                  }
                  catch(error)
                  {
                      res.status(500).json( { error_getNotApprovedByName: error.message } );
                  }
              }
          }
          else
          {
              if(dni)
              {
                  try
                  {
                      const thisDni = await Users.findAll( { where: { dni, isApproved: false }, include:
                          [ {
                              model: Visitas,
                              as: 'Visitas',
                              attributes: ["id", "name", "surname", "dni", "company", "work" ],
                          },
                          {
                              model: Events,
                              as: 'Events',
                              attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                          } ] } );
                      res.status(200).json( thisDni );
                  }
                  catch(error)
                  {
                      res.status(500).json( { error_getNotApprovedUserByDni: error } );
                  }
              }
              else
              {
                  try
                  {
                      const notApprovedUsers = await Users.findAll( { where: { isApproved: false } } );
                      return res.status(200).json(notApprovedUsers)
                  }
                  catch(error)
                  {
                      return res.status(400).send("Error al obtener los usuarios no aprobados")
                  }
              }
          }
      }
  }
}

module.exports = approvedUsers;