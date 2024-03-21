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
            defaultValue: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
            allowNull: false
        }
    },
    { timestamps: false, freezeTableName: true })
}