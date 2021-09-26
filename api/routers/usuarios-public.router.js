const express = require('express');
const router = express.Router()

const controller = require('../controllers/usuarios.controller')

router.post('/usuarios', async (req, res) => {
    let usuario = req.body
    try {
        let respuesta_db = await controller.crearUsuario(usuario)
        let info = respuesta_db.rowCount == 1 ? `Usuario creado: ${usuario.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario creado correctamente' : 'No se creo el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El usuario (${usuario.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})

router.post('/login', async (req, res) => {
    let credenciales = req.body
    try {
        let usuario = await controller.login(credenciales)
        let info = usuario
        let message = usuario ? 'Usuario consultado' : 'No se encontro el usuario.'
        return res.send({ ok: usuario !== undefined, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

module.exports = router