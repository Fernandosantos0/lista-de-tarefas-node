require('dotenv').config();
const colors = require('colors');
const { Sequelize } = require('sequelize');

const conexao = new Sequelize(process.env.DATABASE, 'root', process.env.PASSWORD, {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

try {
    conexao.authenticate();
    console.warn('Conexão com o MySQL realizado com sucesso'.blue.bold);
} catch(err) {
    console.error('Não foi possível se conectar ao MySQL'.red.bold);
    console.error(err);
}

module.exports = conexao;