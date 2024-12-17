import TodoController from '../controllers/TodoController'
import express from 'express'

const router = express.Router()
router.route('/').get(TodoController.index)
// router.get('/:id', TodoController.findById)
// router.put('/', TodoController.update)
// router.post('/', TodoController.create)
// router.delete('/', TodoController.destroy)

export default router
