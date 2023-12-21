const express = require('express');
const routes = express.Router();

const controllerTasks = require('../controllers/controllerTasks');

/* Rotas */
routes.get('/', controllerTasks.show);
routes.get('/add', controllerTasks.addTasks);
routes.post('/add', controllerTasks.addTasksPost);
routes.get('/check/:id', controllerTasks.toggleTask);
routes.get('/edit/:id', controllerTasks.edit);
routes.post('/update/:id', controllerTasks.update);
routes.post('/delete', controllerTasks.removeTask);

module.exports = routes;