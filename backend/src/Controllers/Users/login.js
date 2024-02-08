const {Users} = require("../../Models/Users")
const jwt = require("jsonwebtoken")

const login = async(req, res) => {
    const {name, password} = req.body
    try {
        if(name || password) return res.status(400).send("Data missing")

        const user = Users.findOne({where: {user}})
        if(!user) {
            return res.status(400).send("Usuario no encontrado")
        }
        else {
            if(user.password !== password){
                return res.status(400).send("Contraseña incorrecta")
            }else{
                const userToken = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                const token = jwt.sign(userToken, process.env.SECRET)
                return res.status(500).send({token})
            }
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = login