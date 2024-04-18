const express = require('express')
const router = express.Router()

const listController = require('../../controller/todoController')

// router.route('/').get(listController.handleGetAllTasks)
router.route('/').get(listController.handleSendPages)

/*
router.route('/').post(listController.handleAddTask)
router.route('/:id').patch(listController.handleUpdateTask)
router.route('/:id').delete(listController.handleDeleteTask)
*/

module.exports = router