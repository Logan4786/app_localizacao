const express = require('express')
const User = require('../models/user.model')
const router = express.Router()


router.post('/signup',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            if(user==null){
                const user = User({
                    email:req.body.email,
                    password:req.body.password
                })
                user.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.json(err)
                    }else{
                        console.log(user)
                        res.json(user)
                    }
                    
                })
            }else{

            res.json({
                message:'email não é valido'
            })   
            }
        }
    })
    
})

router.post('/signin',(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            res.json(user)   
        }
    })
})

router.get("/veiculo/:placa", async (req, res) => {
    const placa = req.params.placa;
    const userId = req.user.id; // Suponhamos que o ID do usuário esteja no objeto req.user após a autenticação.

    if (placa.length < 9 && placa.length > 5) {
        db.promise()
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







module.exports = router