/******************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados no Mysql referente aos produtos
 * Data: 27/05/2026
 * Autor: Guilherme Moreira
 * Versão: 1.0
******************************************************************************************/

// Obtém a instância de conexão do Knex
const knexConnection = require('../../../knex/knex.js')

// Função para pegar todos os produtos
const getSelectAllProducts = async function () {
    try {

        let result = await knexConnection('tbl_produto')
            .select('*')
            .orderBy('id_produto', 'desc');

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Função para buscar produto pelo ID
const getSelectProductById = async function (id) {
    try {

        let result = await knexConnection('tbl_produto')
            .where('id_produto', id);

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Função para pegar o último ID cadastrado
const getSelectLastId = async function () {
    try {

        let result = await knexConnection('tbl_produto')
            .select('id_produto')
            .orderBy('id_produto', 'desc')
            .limit(1);

        if (Array.isArray(result))
            return Number(result[0].id_produto);
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Função para inserir produto
const setInsertProduct = async function (produto) {
    try {

        let result = await knexConnection('tbl_produto')
            .insert({
                nome: produto.nome,
                tipo: produto.tipo,
                massa: produto.massa,
                recheio: produto.recheio,
                cobertura: produto.cobertura,
                peso: produto.peso,
                porcoes: produto.porcoes,
                preco: produto.preco,
                quantidade: produto.quantidade,
                validade: produto.validade
            });

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Função para atualizar produto
const setUpdateProduct = async function (produto) {
    try {

        let result = await knexConnection('tbl_produto')
            .where('id_produto', produto.id_produto)
            .update({
                nome: produto.nome,
                tipo: produto.tipo,
                massa: produto.massa,
                recheio: produto.recheio,
                cobertura: produto.cobertura,
                peso: produto.peso,
                porcoes: produto.porcoes,
                preco: produto.preco,
                quantidade: produto.quantidade,
                validade: produto.validade
            });

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

// Função para excluir produto
const setDeleteProduct = async function (id) {
    try {

        let result = await knexConnection('tbl_produto')
            .where('id_produto', id)
            .del();

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

module.exports = {
    getSelectAllProducts,
    getSelectProductById,
    getSelectLastId,
    setInsertProduct,
    setUpdateProduct,
    setDeleteProduct
};