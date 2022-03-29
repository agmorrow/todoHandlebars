const router = require('express').Router();
const { createTodo } = require('../../../controllers/todoController');

router.post('/', createTodo);
module.exports = router;