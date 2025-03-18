import TodoController from '../controllers/TodoController'
import express from 'express'

const router = express.Router()
router.route('/').get(TodoController.index)
router.route('/').post(TodoController.create)
router.route('/:id').get(TodoController.findById)
router.route('/:id').put(TodoController.update)
router.route('/:id').delete(TodoController.destroy)

export default router
