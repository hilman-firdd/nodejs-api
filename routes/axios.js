const express = require('express');
const router = express.Router()
const controller = require('../controller/index');

router.get('/', controller.axios.getAll);
router.post('/', controller.axios.post);
router.put('/:id', controller.axios.put);
router.delete('/:id', controller.axios.delete);

module.exports = router;