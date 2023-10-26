const express = require('express');
const Veiculo = require('../models/veiculos.model')
const router = express.Router();


router.get("/veiculo/:placa", async (req, res) => {
    const placa = req.params.placa;
    const userId = req.user.id; // Suponhamos que o ID do usuário esteja no objeto req.user após a autenticação.

    if (placa.length < 9 && placa.length > 5) {
        Veiculo.promise()
            .execute("SELECT placa, ajuizamento FROM veiculos WHERE placa = ? AND user_id = ?;", [
                placa,
                userId
            ])
            .then(([rows]) => {
                if (rows[0]) {
                    res.status(200).json({ "placa": rows[0].placa, "ajuizamento": rows[0].ajuizamento });
                } else {
                    res.status(404).json({ "message": "Placa não encontrada no sistema" });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ "error": "Erro ao conectar com o banco" });
            });
    } else {
        res.status(422).json({ "error": "Dados insuficientes ou inválidos" });
    }
});

router.post("/veiculo", async (req, res) => {
    const { numContrato, placa, chassi, renavam, carteira, veiculo, corVeiculo, dataEntrada, ajuizamento } = req.body;
    const userId = req.user.id; // Suponhamos que o ID do usuário esteja no objeto req.user após a autenticação.

    Veiculo.promise()
        .execute("INSERT INTO veiculos (num_contrato, placa, chassi, renavam, carteira, veiculo, cor_veiculo, dt_entrada, ajuizamento, user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [
            numContrato,
            placa,
            chassi,
            renavam,
            carteira,
            veiculo,
            corVeiculo,
            dataEntrada,
            ajuizamento,
            userId
        ])
        .then(() => {
            res.status(200).json({ "message": "Veículo cadastrado com sucesso" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ "error": "Erro ao cadastrar veículo" });
        });
    }

);

router.put("/veiculo", async (req, res) => {
    const { placa, ajuizamento } = req.body;
    const userId = req.user.id; // Suponhamos que o ID do usuário esteja no objeto req.user após a autenticação.

    if (placa && ajuizamento) {
        Veiculo.promise()
            .execute("UPDATE veiculos SET ajuizamento = ? WHERE placa = ? AND user_id = ?;", [
                ajuizamento,
                placa,
                userId
            ])
            .then(() => {
                res.status(200).json({ "message": "Ajuizamento atualizado com sucesso" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ "error": "Falha ao atualizar ajuizamento" });
            });
    } else {
        res.status(422).json({ "error": "Dados insuficientes" });
    }
});

router.delete("/veiculo/:placa", async (req, res) => {
    const placa = req.params.placa;
    const userId = req.user.id; // Suponhamos que o ID do usuário esteja no objeto req.user após a autenticação.

    if (placa) {
        // Procura se a placa está no sistema
        Veiculo.promise()
            .execute("SELECT cod_carro FROM veiculos WHERE BINARY placa = ? AND user_id = ?;", [
                placa,
                userId
            ])
            .then(([rows]) => {
                if (rows[0]) {
                    db.promise()
                        .execute("DELETE FROM veiculos WHERE BINARY placa = ? AND user_id = ?;", [
                            placa,
                            userId
                        ])
                        .then(() => {
                            res.status(200).json({ "message": "Veículo deletado com sucesso" });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).json({ "error": "Erro ao deletar veículo" });
                        });
                } else {
                    res.status(404).json({ "error": "Placa não encontrada no sistema" });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ "error": "Erro ao deletar veículo" });
            });
    } else {
        res.status(422).json({ "error": "Dados insuficientes" });
    }
});

module.exports = router;
