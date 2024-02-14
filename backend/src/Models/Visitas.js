const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Visitas",{
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
        dni:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        company:
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        work:
        {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    { timestamps: false, freezeTableName: true })
}