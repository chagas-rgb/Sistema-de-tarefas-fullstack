const sql = require('../config/db.config');

const Task = function(task) {
    this.nome = task.nome;
    this.custo = task.custo;
    this.data_limite = task.data_limite;
    this.concluida = task.concluida;
};

Task.create = (newTask, result) => {
    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newTask });
    });
};

Task.getAll = (result) => {
    sql.query("SELECT * FROM tasks", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Task.update = (id, task, result) => {
    sql.query("UPDATE tasks SET nome = ?, custo = ?, data_limite = ?, concluida = ? WHERE id = ?", 
    [task.nome, task.custo, task.data_limite, task.concluida, id],
    (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Task.remove = (id, result) => {
    sql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Task;
