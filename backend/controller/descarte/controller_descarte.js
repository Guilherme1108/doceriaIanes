/*******************************************************************************************************
 * Objetivo: Controller de descarte
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*******************************************************************************************************/

const descarteDAO = require('../../model/DAO/descarte/descarte.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarDescartes = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let result = await descarteDAO.getSelectAllDiscards()

        if (result) {

            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.descartes = result

            return MESSAGES.DEFAULT_HEADER

        } else {

            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

const inserirDescarte = async (descarte, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE

        let result = await descarteDAO.setInsertDiscard(descarte)

        if (result) {

            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

            return MESSAGES.DEFAULT_HEADER

        } else {

            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

module.exports = {
    listarDescartes,
    inserirDescarte
}