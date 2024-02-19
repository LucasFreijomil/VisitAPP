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
            type: DataTypes.DATE,
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
        visitId:
        {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false
        },
        userId:
        {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false
        }
    }, { timestamps: false, freezeTableName: true })
}