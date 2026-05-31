/*******************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de produtos
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*******************************************************************************************************/

const productDAO = require('../../model/DAO/produto/produto.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarProdutos = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultProduto = await productDAO.getSelectAllProducts()

        if (resultProduto) {

            if (resultProduto.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.produtos = resultProduto

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

const buscarProdutoId = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultProduto = await productDAO.getSelectProductById(Number(id))

            if (resultProduto) {

                if (resultProduto.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.produto = resultProduto

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

const inserirProduto = async (produto, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProduto(produto)

            if (!validar) {

                let resultProduto = await productDAO.setInsertProduct(produto)

                if (resultProduto) {

                    let lastId = await productDAO.getSelectLastId()

                    produto.id_produto = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.produto = produto

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

const atualizarProduto = async (produto, id, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProduto(produto)

            if (!validar) {

                let validarID = await buscarProdutoId(id)

                if (validarID.status_code == 200) {

                    produto.id_produto = Number(id)

                    let resultProduto = await productDAO.setUpdateProduct(produto)

                    if (resultProduto) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.produto = produto

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

const excluirProduto = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await buscarProdutoId(id)

        if (validarId.status_code == 200) {

            let resultProduto = await productDAO.setDeleteProduct(Number(id))

            if (resultProduto) {

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

const validarDadosProduto = async function (produto) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (
        produto.nome == '' ||
        produto.nome == undefined ||
        produto.nome == null ||
        produto.nome.length > 255
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        produto.preco == undefined ||
        produto.preco == null ||
        isNaN(produto.preco)
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Preço incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        produto.quantidade == undefined ||
        produto.quantidade == null ||
        isNaN(produto.quantidade)
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Quantidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        produto.validade == undefined ||
        produto.validade == null ||
        produto.validade.length != 10
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Validade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }
}

module.exports = {
    listarProdutos,
    buscarProdutoId,
    inserirProduto,
    atualizarProduto,
    excluirProduto
}