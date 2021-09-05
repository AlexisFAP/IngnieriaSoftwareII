const express = require('express')

const app = express()

app.use(express.json())

const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)

const port = 3000