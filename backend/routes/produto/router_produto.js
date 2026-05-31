/****************************************************************************************
 * Objetivo: Arquivo responsavel pelo gerenciamento das rotas da API referente aos doces
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerProduto = require('../../controller/produto/controller_produto.js')

// Listar todos os doces
router.get('/doces', cors(), async function(request, response){

    let doce = await controllerProduto.listarProdutos()

    response.status(doce.status_code)
    response.json(doce)
})

// Buscar doce por ID
router.get('/doces/:id', cors(), async function(request, response){

    let idDoce = request.params.id

    let doce = await controllerProduto.buscarProdutoId(idDoce)

    response.status(doce.status_code)
    response.json(doce)
})

// Cadastrar doce
router.post('/doces', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let doce = await controllerProduto.inserirProduto(
        dadosBody,
        contentType
    )

    response.status(doce.status_code)
    response.json(doce)
})

// Editar doce
router.put('/doces/:id', cors(), bodyParserJSON, async function(request, response){

    let idDoce = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let doce = await controllerProduto.atualizarProduto(
        dadosBody,
        idDoce,
        contentType
    )

    response.status(doce.status_code)
    response.json(doce)
})

// Remover doce
router.delete('/doces/:id', cors(), async function(request, response){

    let idDoce = request.params.id

    let doce = await controllerProduto.excluirProduto(idDoce)

    response.status(doce.status_code)
    response.json(doce)
})

module.exports = router