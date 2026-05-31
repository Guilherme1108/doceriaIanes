/*******************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de usuários
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*******************************************************************************************************/

const usuarioDAO = require('../../model/DAO/usuario/usuario.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarUsuarios = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultUsuario = await usuarioDAO.getSelectAllUsers()

        if (resultUsuario) {

            if (resultUsuario.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.usuarios = resultUsuario

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarUsuarioId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultUsuario = await usuarioDAO.getSelectUserById(Number(id))

            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.usuario = resultUsuario

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const autenticarUsuario = async function (email, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (
            email == '' ||
            email == undefined ||
            email == null ||
            senha == '' ||
            senha == undefined ||
            senha == null
        ) {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email ou senha inválidos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

        let resultUsuario = await usuarioDAO.getSelectUserByEmail(email)

        if (resultUsuario) {

            if (resultUsuario.length > 0) {

                if (resultUsuario[0].senha == senha) {

                    delete resultUsuario[0].senha

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = 'Login realizado com sucesso'
                    MESSAGES.DEFAULT_HEADER.items.usuario = resultUsuario[0]

                    return MESSAGES.DEFAULT_HEADER

                } else {

                    MESSAGES.ERROR_NOT_FOUND.message = 'Usuário ou senha inválidos'
                    return MESSAGES.ERROR_NOT_FOUND

                }

            } else {

                MESSAGES.ERROR_NOT_FOUND.message = 'Usuário ou senha inválidos'
                return MESSAGES.ERROR_NOT_FOUND

            }

        } else {

            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

const inserirUsuario = async (usuario, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosUsuario(usuario)

            if (!validar) {

                let resultUsuario = await usuarioDAO.setInsertUser(usuario)

                if (resultUsuario) {

                    let lastId = await usuarioDAO.getSelectLastId()

                    usuario.id_usuario = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.usuario = usuario

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return validar
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarUsuario = async (usuario, id, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosUsuario(usuario)

            if (!validar) {

                let validarID = await buscarUsuarioId(id)

                if (validarID.status_code == 200) {

                    usuario.id_usuario = Number(id)

                    let resultUsuario = await usuarioDAO.setUpdateUser(usuario)

                    if (resultUsuario) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.usuario = usuario

                        return MESSAGES.DEFAULT_HEADER

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                } else {
                    return validarID
                }

            } else {
                return validar
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirUsuario = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarUsuarioId(id)

        if (validarId.status_code == 200) {

            let resultUsuario = await usuarioDAO.setDeleteUser(Number(id))

            if (resultUsuario) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return validarId
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosUsuario = async function (usuario) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (
        usuario.nome == '' ||
        usuario.nome == undefined ||
        usuario.nome == null ||
        usuario.nome.length > 255
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        usuario.email == '' ||
        usuario.email == undefined ||
        usuario.email == null ||
        usuario.email.length > 255
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        usuario.senha == '' ||
        usuario.senha == undefined ||
        usuario.senha == null ||
        usuario.senha.length > 255
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Senha incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }
}

module.exports = {
    listarUsuarios,
    buscarUsuarioId,
    autenticarUsuario,
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario
}