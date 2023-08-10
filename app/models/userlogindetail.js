const { sequelize } = require("sequelize");

`use strict`;
module.exports = (sequelize, DataTypes) => {
    const userlogindetail = sequelize.define('userlogindetail', {
        usrlogid: {
            type: DataTypes.INT,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailaddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdby: DataTypes.STRING,
        createddate: DataTypes.DATE,
        lastmodifiedby: DataTypes.STRING,
        lastmodifieddate: DataTypes.DATE,
        isactive: DataTypes.BOOLEAN
    },
    {
        timestamps: false,
        tableName: 'userlogindetail',
        freezTable: true
    });
    return userlogindetail;
}