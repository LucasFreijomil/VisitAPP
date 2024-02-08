const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Guardias", {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: //Revisar seguridad de contraseñas
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false
        }},
        { timestamps: false, freezeTableName: true })
}