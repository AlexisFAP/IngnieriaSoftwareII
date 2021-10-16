const { validarToken } = require("../services/jwt.service")

const validarTokenMiddleware = (req, res, next) => {
    let token = req.headers.token
    if (!token) {
        token = req.query.token
    }
    try {
        if (token == 'null' || !token)
            return res.status(401).send({ ok: false, message: 'Token no definido en los headers', info: null })

        let usuario_decodificado = validarToken(token)

        next()
    } catch (error) {
        return res.status(401).send({ ok: false, message: 'Token no valido', info: null })
    }
}

module.exports = { validarTokenMiddleware }