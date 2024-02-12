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
        isApproved:     //default: false    null: false
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isAdmin:        //default: false    null: false
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        name:           //STRING            null: false
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname:        //STRING            null: false
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        username:       //STRING            null: false
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:       //STRING            null: true
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        email:          //STRING            null: false
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        reviewImages:   //ARRAY(STRING)     null: true
        {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        secQ:           //STRING            null: true
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        secA:           //STRING            null: true
        {
            type: DataTypes.STRING,
            allowNull: true
    }},
    { timestamps: false, freezeTableName: true } )
}