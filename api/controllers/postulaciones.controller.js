const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearPostulacion = async (usuario) => {
    const sql = 'INSERT INTO public.postulaciones (id, id_usuario, nombre_usuario, cargo_usuario,id_reto,nombre_reto, descripcion) VALUES($1, $2, $3, $4, $5, $6, $7);'
    const datos = [postulacion.id, postulacion.id_usuario, postulacion.nombre_usuario, postulacion.cargo_usuario,postulacion.id_reto, postulacion.nombre_reto, postulacion.descipcion]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarPostulaciones = async (id) => {
    let sql = 'SELECT id, id_usuario, nombre_usuario, cargo_usuario,id_reto, nombre_reto, descripcion  FROM postulaciones'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarPostulacion = async (id) => {
    const sql = 'DELETE FROM public.postulaciones WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarPostulacion = async (usuario) => {
    const sql = `UPDATE public.postulaciones SET id_usuario=$1, nombre_usuario=$2, cargo_usuario=$3, id_reto=$4, nombre_reto=$5, descripcion=$6 WHERE id=$7;`
    const datos = [postulacion.id_usuario, postulacion.nombre_usuario, postulacion.cargo_usuario,postulacion.id_reto, postulacion.nombre_reto, postulacion.descipcion, postulacion.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearPostulacion, consultarPostulaciones, eliminarPostulacion, modificarPostulacion}