/****************************************************************************************
 * Objetivo: Arquivo responsavel pelo gerenciamento das rotas da API referente aos usuários
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()

const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerUsuario = require('../../controller/usuario/controller_usuario.js')

/********************************
 * LOGIN
 *******************************/

router.post('/login', cors(), bodyParserJSON, async function(request, response){

    let email = request.body.email
    let senha = request.body.senha

    let usuario = await controllerUsuario.autenticarUsuario(
        email,
        senha
    )

    response.status(usuario.status_code)
    response.json(usuario)
})

/********************************
 * LISTAR TODOS OS USUÁRIOS
 *******************************/

router.get('/usuarios', cors(), async function(request, response){

    let usuario = await controllerUsuario.listarUsuarios()

    response.status(usuario.status_code)
    response.json(usuario)
})

/********************************
 * BUSCAR USUÁRIO POR ID
 *******************************/

router.get('/usuarios/:id', cors(), async function(request, response){

    let idUsuario = request.params.id

    let usuario = await controllerUsuario.buscarUsuarioId(idUsuario)

    response.status(usuario.status_code)
    response.json(usuario)
})

/********************************
 * INSERIR USUÁRIO
 *******************************/

router.post('/usuarios', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let usuario = await controllerUsuario.inserirUsuario(
        dadosBody,
        contentType
    )

    response.status(usuario.status_code)
    response.json(usuario)
})

/********************************
 * ATUALIZAR USUÁRIO
 *******************************/

router.put('/usuarios/:id', cors(), bodyParserJSON, async function(request, response){

    let idUsuario = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let usuario = await controllerUsuario.atualizarUsuario(
        dadosBody,
        idUsuario,
        contentType
    )

    response.status(usuario.status_code)
    response.json(usuario)
})

/********************************
 * EXCLUIR USUÁRIO
 *******************************/

router.delete('/usuarios/:id', cors(), async function(request, response){

    let idUsuario = request.params.id

    let usuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(usuario.status_code)
    response.json(usuario)
})

module.exports = router