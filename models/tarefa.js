const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../db");

const Tarefa = sequelize.define('tarefas', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_limite: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
});

Tarefa.sync();

module.exports = Tarefa;