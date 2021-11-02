const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearPostulacion = async (postulacion) => {
    const sql = 'INSERT INTO public.postulaciones (id_usuario,id_reto, descripcion, titulo,estado) VALUES($1, $2, $3, $4,$5);'
    const datos = [postulacion.id_usuario,postulacion.id_reto, postulacion.descripcion,postulacion.titulo,postulacion.estado]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarPostulaciones = async (id) => {
    let sql = 'SELECT * FROM postulaciones'
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

const modificarPostulacion = async (postulacion) => {
    const sql = `UPDATE public.postulaciones SET id_usuario=$1, id_reto=$2, descripcion=$3, titulo=$4 WHERE id=$5;`
    const datos = [postulacion.id_usuario,postulacion.id_reto, postulacion.descipcion, postulacion.titulo,postulacion.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearPostulacion, consultarPostulaciones, eliminarPostulacion, modificarPostulacion}