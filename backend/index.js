const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/mydb",{ useNewUrlParser: true, useUnifiedTopology: true })
//mongodb+srv;//logantenchy:ns4rJEwUYvKIKhLK@cluster0.bnwcg0e.mongodb.net/teste

//Configurar middlewares e roteadores
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',require('./routes/user.route'))
app.use('/veiculo',require('./routes/veiculos.route'))
app.listen(port,()=>{
    console.log('port running on '+port)
})