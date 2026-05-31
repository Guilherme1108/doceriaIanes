/****************************************************************************************
 * Objetivo: Rotas de descarte
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express = require('express')
const router = express.Router()

const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerDescarte = require('../../controller/descarte/controller_descarte.js')

router.get('/descartes', cors(), async function(request, response){

    let descarte = await controllerDescarte.listarDescartes()

    response.status(descarte.status_code)
    response.json(descarte)
})

router.post('/descartes', cors(), bodyParserJSON, async function(request, response){

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let descarte = await controllerDescarte.inserirDescarte(
        dadosBody,
        contentType
    )

    response.status(descarte.status_code)
    response.json(descarte)
})

module.exports = router