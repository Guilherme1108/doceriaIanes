const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Rotas
const usuarioRoutes = require('./routes/usuario/router_usuario.js');
const produtoRoutes = require('./routes/produto/router_produto.js');
const descarteRoutes = require('./routes/descarte/router_descarte.js');

app.use(usuarioRoutes);
app.use(produtoRoutes);
app.use(descarteRoutes);

app.listen(PORT, () => {
    console.log(`API Aguardando Requisições na porta ${PORT}`);
});