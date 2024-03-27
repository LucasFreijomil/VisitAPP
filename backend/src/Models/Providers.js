const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Providers",{
        cuit:
        {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        razonSocial:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        category:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false, freezeTableName: true })
}