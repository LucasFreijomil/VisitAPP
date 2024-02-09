const { DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
    sequelize.define("Users", {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        isApproved:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isAdmin:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        username:
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
        },
        reviewImages:
        {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        secQ: //A-N
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        secA: //A-N
        {
            type: DataTypes.STRING,
            allowNull: true
    }},
    { timestamps: false, freezeTableName: true } )
}