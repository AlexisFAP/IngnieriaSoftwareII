const express = require('express')
const cors = require('cors')
//
const upload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(cors())
//
app.use(upload())

const router_usuario_public =  require('./routers/usuarios-public.router');
app.use(router_usuario_public)

const router_usuario_private =  require('./routers/usuarios-private.router');
app.use(router_usuario_private)

const router_tiporeto =  require('./routers/tiporeto.router');
app.use(router_tiporeto)

const router_reto =  require('./routers/retos.router');
app.use(router_reto)

const router_postulacion =  require('./routers/postulaciones.router');
app.use(router_postulacion)

const router_documento =  require('./routers/documentos.router');
app.use(router_documento)

const router_avance =  require('./routers/avances.router');
app.use(router_avance)


//
const router_upload = require('./services/upload')
app.use(router_upload)

const port = 3001

app.listen(port, () => {
    console.log(`API: http://localhost:${port}`)
  })