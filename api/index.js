const express = require('express')
const cors = require('cors')

const upload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(cors())
//
app.use(upload())
app.use("/files",express.static('./uploads'));

// ****************** IMPORTAR RUTAS PUBLICAS *************
const router_usuario_public =  require('./routers/usuarios-public.router');
app.use(router_usuario_public)

// ****************** IMPORTAR RUTAS PRIVADAS *************
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

const auth_middleware = require('./controllers/auth.middleware');
app.use('/', auth_middleware.validarTokenMiddleware)

app.use('/', (req, res)=>{
  let info={ok:false, message:'404 not found', info:null}
  res.status(404).send(info)
})

const router_archivos =  require('./routers/archivos.router');
app.use(router_archivos)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listen on port:${port}`)
})