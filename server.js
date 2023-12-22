/* Importando os módulos */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const colors = require('colors');
const routes = require('./routes/routesTasks');
const morgan = require('morgan');
const path = require('path');

/* Importando a conexão com o MySQL */
const conexao = require('./db');

/* Invocando o express */
const app = express();

/* Configurando o view template */
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

/* Habilitando o envio de dados pelo body */
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

/* Criando uma pasta estática */
app.use(express.static(path.join(__dirname, 'public')));

/* Usando o sistema de rotas */
app.use('/tasks', routes);

/* MORGAN */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms HTTP/:http-version" :user-agent :total-time[digits] :remote-addr'));

/* Subindo o servidor */
conexao.sync()
    .then(() => {
        const port = process.env.PORT || 3001;
        const host = 'localhost';
        app.listen(port, host, () => {
            console.warn('Inicializando o Express JS'.yellow.bold);
            console.log(`Server ON - http://${host}:${port}/tasks`.green.bold);
        });
    })
    .catch(err => {
        console.log(err);
    });