/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente aos usuarios
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

const knexConnection = require('../../../knex/knex.js')

const getSelectAllUsers = async function () {
    try {

        let result = await knexConnection('tbl_usuario')
            .select('*')
            .orderBy('id_usuario', 'desc')

        return Array.isArray(result) ? result : false

    } catch {
        return false
    }
}

const getSelectUserById = async function (id) {
    try {

        let result = await knexConnection('tbl_usuario')
            .where('id_usuario', id)

        return Array.isArray(result) ? result : false

    } catch {
        return false
    }
}

const getSelectUserByEmail = async function (email) {
    try {

        let result = await knexConnection('tbl_usuario')
            .where('email', email)

        return Array.isArray(result) ? result : false

    } catch {
        return false
    }
}


const getSelectLastId = async function () {
    try {

        let result = await knexConnection('tbl_usuario')
            .select('id_usuario')
            .orderBy('id_usuario', 'desc')
            .limit(1)

        return Array.isArray(result)
            ? Number(result[0].id_usuario)
            : false

    } catch {
        return false
    }
}

const setInsertUser = async function (usuario) {
    try {

        let result = await knexConnection('tbl_usuario')
            .insert({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            })

        return !!result

    } catch {
        return false
    }
}

const setUpdateUser = async function (usuario) {
    try {

        let result = await knexConnection('tbl_usuario')
            .where('id_usuario', usuario.id_usuario)
            .update({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            })

        return !!result

    } catch {
        return false
    }
}

const setDeleteUser = async function (id) {
    try {

        let result = await knexConnection('tbl_usuario')
            .where('id_usuario', id)
            .del()

        return !!result

    } catch {
        return false
    }
}

module.exports = {
    getSelectAllUsers,
    getSelectUserById,
    getSelectUserByEmail,
    getSelectLastId,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}