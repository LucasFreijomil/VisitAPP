const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("visitas",{
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
        dni:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        empresa:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false, freezeTableName: true })
}