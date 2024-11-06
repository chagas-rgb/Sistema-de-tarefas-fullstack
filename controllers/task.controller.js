const Task = require('../models/task.model');

exports.create = (req, res) => {
    const newTask = new Task(req.body);

    Task.create(newTask, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.getAll = (req, res) => {
    Task.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    Task.update(req.params.id, new Task(req.body), (err, data) => {
        if (err)
            res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Task.remove(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message });
        else res.send({ message: "Task was deleted successfully!" });
    });
};
