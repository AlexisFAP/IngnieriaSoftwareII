const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()

const crearDocumento = async (documento) => {
    const sql = 'INSERT INTO public.documentos (nombre) VALUES($1);'
    const datos = [documento.nombre]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarDocumentos = async (id) => {
    let sql = 'SELECT * FROM documentos'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarDocumento = async (id) => {
    const sql = 'DELETE FROM public.documentos WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarDocumento = async (documento) => {
    const sql = `UPDATE public.documentos SET nombre=$1 WHERE id=$2;`
    const datos = [ documento.nombre, documento.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = { crearDocumento, consultarDocumentos, eliminarDocumento, modificarDocumento }