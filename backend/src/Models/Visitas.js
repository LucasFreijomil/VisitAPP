const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Visitas",{
        dni:
        {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
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
        img:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false, freezeTableName: true })
}