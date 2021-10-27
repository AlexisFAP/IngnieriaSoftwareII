const { crearToken} = require('../services/jwt.service');
const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearUsuario = async (user) => {
    const sql = 'INSERT INTO public.usuarios (nombre_completo, cargo, clave,usuario, telefono, correo) VALUES($1, $2, md5($3), $4, $5, $6);'
    const datos = [user.nombre_completo, user.cargo, user.clave, user.usuario, user.telefono, user.correo]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarUsuarios = async (id) => {
    let sql = 'SELECT id, nombre_completo, cargo, usuario, telefono, correo  FROM usuarios'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarUsuario = async (id) => {
    const sql = 'DELETE FROM public.usuarios WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarUsuario = async (usuario) => {
    const sql = `UPDATE public.usuarios SET nombre_completo=$1, cargo=$2, usuario=$3, telefono=$4, correo=$5  WHERE id=$6;`
    const datos = [usuario.nombre_completo, usuario.cargo, usuario.usuario, usuario.telefono, usuario.correo, usuario.id]
    return await _pg.ejecutarQuery(sql, datos)
}

const login = async (credenciales) => {
    let sql = 'SELECT id, nombre_completo, cargo, usuario, telefono, correo FROM usuarios WHERE correo=$1 and clave=md5($2)'
    const datos = [credenciales.correo, credenciales.clave]
    let respuesta_db = await _pg.ejecutarQuery(sql, datos)
    let usuario = respuesta_db.rowCount == 1 ? respuesta_db.rows[0] : null
    if (usuario) {
        let token = crearToken(usuario)
        return { token, nombre_completo: usuario.nombre_completo, id:usuario.id, rol:usuario.cargo}
    } else {
        return undefined
    }
}

module.exports = {crearUsuario, consultarUsuarios, eliminarUsuario, modificarUsuario, login }