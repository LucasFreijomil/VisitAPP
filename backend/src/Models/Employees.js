const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Employees",{
        dni:
        {
            primaryKey: true,
            type: DataTypes.STRING,
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
        },
        labor:
        {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
    { timestamps: false, freezeTableName: true })
}