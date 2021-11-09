const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearAvance = async (avance) => {
    const sql = 'INSERT INTO public.avances (id, titulo, descripcion, fecha, id_postulacion) VALUES($1, $2, $3, $4, $5);'
    const datos = [avance.id, avance.tituli, avance.descripcion, avance.fecha, avance.id_postulacion]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarAvances = async (id) => {
    let sql = 'SELECT * fecha FROM avances'
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

const modificarAvance = async (avance) => {
    const sql = `UPDATE public.avances SET titulo=$1, descripcion=$2, fecha=$3  WHERE id=$4;`
    const datos = [ avance.titulo, avance.descripcion, avance.fecha, avance.id]
    return await _pg.ejecutarQuery(sql, datos)
}


module.exports = { crearAvance, consultarAvances, eliminarAvance, modificarAvance }