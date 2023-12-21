/* Importando a tabela do banco de dados */
const Tasks = require('../models/Task');

module.exports = class controllerTasks {
    static async show(req, res, next) {
        try {
            const tasks = await Tasks.findAll({ raw: true, order: [
                ['createdAt', 'DESC']
            ] });
            res.status(200).render('index', { tasks });
        } catch(err) {
            console.error(err);
        }
    }

    static addTasks(req, res, next) {
        res.status(200).render('addtask');
    }

    static async addTasksPost(req, res, next) {
        try {
            const task = {
                title: req.body.title,
                description: req.body.description
            }

            await Tasks.create(task);

            res.status(303).redirect('/tasks/');
        } catch(err) {
            console.error(err);
            res.status(404).render('404');
        }
    }

    static async toggleTask(req, res, next) {
        try {
            const { id } = req.params;

            let task = await Tasks.findOne({ where: { id }, raw: true });

            console.log('Oi:', task.done)

            if(task.done === 0) {
                await Tasks.update({ done: true }, { where: { id } });
            } else {
                await Tasks.update({ done: false }, { where: { id } });
            }

            res.status(303).redirect('/tasks/');
        } catch(err) {
            console.error(err);
            res.status(404).render('404'); 
        }
    }

    static async edit(req, res, next) {
        try {
            const { id } = req.params;

            const task = await Tasks.findOne({where: { id }, raw: true});
            
            res.status(200).render('edittask', { task });
        } catch(err) {
            console.error(err);
            res.status(404).render('404');
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;

            const task = {
                title: req.body.title,
                description: req.body.description
            };

            await Tasks.update(task, { where: { id } });

            res.status(303).redirect('/tasks/');
        } catch(err) {
            console.error(err);
            res.status(404).render('404');
        }
    }

    static async removeTask(req, res, next) {
        try {
            const { id } = req.body;

            await Tasks.destroy({ where: { id: id } });

            res.status(303).redirect('/tasks/');
        } catch(err) {
            console.error(err);
            res.status(404).render('404');
        }
    }
}