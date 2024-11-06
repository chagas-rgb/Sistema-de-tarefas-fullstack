const express = require('express');
const router = express.Router();
const tasks = require('../controllers/task.controller');

router.post('/tasks', tasks.create);
router.get('/tasks', tasks.getAll);
router.put('/tasks/:id', tasks.update);
router.delete('/tasks/:id', tasks.delete);

module.exports = router;

