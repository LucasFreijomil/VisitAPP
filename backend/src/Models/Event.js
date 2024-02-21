const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Events", {
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
        date:
        { 
            type: DataTypes.STRING,
            allowNull: true
        },
        startsAt:
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        endsAt:
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        body:
        {
            type: DataTypes.TEXT,
            allowNull: true
        },
        alarm:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userId:
        {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: true
        }
    }, { timestamps: false, freezeTableName: true })
}