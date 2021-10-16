const express = require('express');
const { crearDocumento } = require('../controllers/documentos.controller');
const router = express.Router()

router.post('/upload', async (req, res) => {
    try {
        let file = req.files.file
        let nombre = file.name
        await file.mv('./uploads/' + nombre)

        let response_db = await crearDocumento({ nombre})
        return res.send({ ok: true, message: 'Archivo guardado', info: { nombre } })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

module.exports = router