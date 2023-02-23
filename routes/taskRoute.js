const express = require('express')
const { createtask, editTask, deletetask, getAllTask, sortedTasks } = require('../controllers/tasks')
const { isAuthenticateUser,authorizeRole } = require('../middleware/auth')
const router = express.Router()

router.route('/task').post(isAuthenticateUser,createtask)

router.route('/task/:taskId').patch(isAuthenticateUser,editTask)

router.route('/tasks').get(isAuthenticateUser,getAllTask)

router.route('/tasks/sorted').get(isAuthenticateUser,sortedTasks)

router.route('/task/:taskId').delete(isAuthenticateUser,deletetask)
module.exports = router