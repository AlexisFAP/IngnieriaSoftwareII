const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearAvance = async (avance) => {
    const sql = 'INSERT INTO public.avances (fecha, id_postulacion) VALUES($1, $2);'
    const datos = [avance.fecha, avance.id_postulacion]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarAvances = async (id) => {
    let sql = 'SELECT * FROM avances'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarAvance = async (avance) => {
    const sql = 'DELETE FROM public.avances WHERE id=$1';
    const datos = [avance.id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarAvance = async (avance) => {
    const sql = `UPDATE public.avances SET titulo=$1, descripcion=$2 WHERE id=$3;`
    const datos = [ avance.titulo, avance.descripcion, avance.id]
    return await _pg.ejecutarQuery(sql, datos)
}

const ultimoId = async () => {
    const sql = `SELECT id FROM public.postulaciones order by id desc LIMIT 1;`
    const datos = []
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearAvance, consultarAvances, eliminarAvance, modificarAvance, ultimoId }