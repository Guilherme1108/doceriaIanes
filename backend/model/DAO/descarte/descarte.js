/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente aos descartes
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

const knexConnection = require('../../../knex/knex.js')

const getSelectAllDiscards = async function () {

    try {

        let result = await knexConnection('tbl_descarte')
            .select('*')
            .orderBy('id_descarte', 'desc')

        return result

    } catch (error) {
        return false
    }
}

const setInsertDiscard = async function (descarte) {

    try {

        let result = await knexConnection('tbl_descarte')
            .insert({
                data_descarte: descarte.data_descarte,
                id_usuario: descarte.id_usuario,
                id_produto: descarte.id_produto
            })

        return !!result

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getSelectAllDiscards,
    setInsertDiscard
}