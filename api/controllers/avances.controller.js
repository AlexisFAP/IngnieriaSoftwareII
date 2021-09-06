const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearAvance = async (usuario) => {
    const sql = 'INSERT INTO public.avances (id, id_usuario, nombre_usuario, id_reto,nombre_reto, descripcion, fecha) VALUES($1, $2, $3, $4, $5, $6, $7);'
    const datos = [avance.id, avance.id_usuario, avance.nombre_usuario, avance.id_reto, avance.nombre_reto, avance.descipcion, avance.fecha]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarAvances = async (id) => {
    let sql = 'SELECT id, id_usuario, nombre_usuario, id_reto,nombre_reto, descripcion, fecha  FROM avances'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarAvance = async (id) => {
    const sql = 'DELETE FROM public.avances WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarAvance = async (usuario) => {
    const sql = `UPDATE public.avances SET id_usuario=$1, nombre_usuario=$2, id_reto=$3, nombre_reto=$4, descripcion=$5, fecha=$6  WHERE id=$7;`
    const datos = [avance.id_usuario, avance.nombre_usuario, avance.id_reto, avance.nombre_reto, avance.descipcion, avance.fecha, avance.id]
    return await _pg.ejecutarQuery(sql, datos)
}


module.exports = { crearAvance, consultarAvances, eliminarAvance, modificarAvance }