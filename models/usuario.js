const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../db");

const Usuario = sequelize.define('usuarios', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
 
});

Usuario.sync();

module.exports = Usuario;