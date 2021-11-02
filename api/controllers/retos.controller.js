const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearReto = async (reto) => {
    const sql = 'INSERT INTO public.retos (id_usuario, id_tipo_reto, dependencia, problema, antecedentes, interesados, impacto_esperado,  premio, fecha, portada,estado) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11);'
    const datos = [reto.id_usuario, reto.id_tipo_reto, reto.dependencia, reto.problema, reto.antecedentes, reto.interesados, reto.impacto_esperado, reto.premio, reto.fecha, reto.portada,reto.estado]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarRetos = async (id) => {
    let sql = 'SELECT * FROM retos'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarReto= async (reto) => {
    const sql = 'DELETE FROM public.retos WHERE id=$1';
    const datos = [reto.id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarReto = async (reto) => {
    const sql = `UPDATE public.retos SET estado=$1 WHERE id=$2;`
    const datos = [reto.estado,reto.id]
    return await _pg.ejecutarQuery(sql, datos)
}

const ultimoId = async (id) => {
    const sql = `SELECT id FROM public.retos order by id desc LIMIT 1;`
    const datos = []
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearReto, consultarRetos, eliminarReto, modificarReto, ultimoId}