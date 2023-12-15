const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db");
const Usuarios = require('../models/usuario'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const senhaEncriptada = await bcrypt.hash(req.body.senha, 10);
        const query = `INSERT INTO usuarios (username, email, senha, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
        const replacements = [req.body.username, req.body.email, senhaEncriptada, new Date(), new Date()];

        const [results, metadata] = await sequelize.query(query, { replacements });

        res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso",
            results: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// GET para listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const query = "SELECT * FROM usuarios";
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        res.json({
            success: true,
            usuarios: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.put('/:id', async(req, res) => {
    const id = req.params.id; //pega o id enviado pela requisição
    const { senha } = req.body; //campo a ser alterado
    try{
        
        await sequelize.query("UPDATE usuarios SET senha = ? WHERE id = ?", { replacements: [senha, id], type: QueryTypes.UPDATE });
        res.status(200).json({ message: 'Senha alterada com sucesso.' }); //statusCode indica ok no update
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }
});

//Deletar um cliente que deseja ser removido do banco de dados.
router.delete('/:id', async(req, res) => {
    const {id} = req.params; //pega o id enviado pela requisição para ser excluído
    try{
        await sequelize.query("DELETE FROM usuarios WHERE id = ?", { replacements: [id], type: QueryTypes.DELETE });
        res.status(200).json({ message: 'Usuário deletado com sucesso.' }); //statusCode indica ok no delete
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }
});

module.exports = router;