const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Messages", {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        body:
        {
            type: DataTypes.TEXT,
            allowNull: true
        },
        general:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        urgent:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        read:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { freezeTableName: true })
}