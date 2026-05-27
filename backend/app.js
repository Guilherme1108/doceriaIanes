/****************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições da API da Doceria Gourmet Ianes
 * Data: 026/06/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
*****************************************************************************************/

const express       = require('express')
const cors          = require('cors')

const app = express()

//porta
const PORT = process.PORT || 8080

//permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

// Importando rotas
const usuarioRoutes = require('./routes/usuario/router_usuario.js')
const usuarioRoutes = require('./routes/produto/router_produto.js')


// Usando rotas
app.use(filmeRoutes)


app.listen(PORT, function(){
    console.log('API Aguardando Requisições🏎️')
})