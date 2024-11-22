const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TarefasKanban',
    password: '12345',
    port: 5432,
});

app.use(cors());
app.use(express.json());

// Rota para buscar todas as tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tarefas');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Rota para buscar uma tarefa por ID
app.get('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tarefas WHERE id_tarefa = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
});

// Rota para adicionar uma tarefa
app.post('/tarefas', async (req, res) => {
    const { id_usuario, descricao, nome_setor, prioridade, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tarefas (id_usuario, descricao, nome_setor, prioridade, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id_usuario, descricao, nome_setor, prioridade, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
});

// Rota para deletar uma tarefa
app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tarefas WHERE id_tarefa = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

// Rota para adicionar um usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email, data_nascimento } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, data_nascimento) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, data_nascimento]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar usuário' });
    }
});

// Rota para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});