import CreateTodoUseCase from '../../application/useCases/todo/CreateTodoUseCase'
import UpdateTodoUseCase from '../../application/useCases/todo/UpdateTodoUseCase'
import ListTodoUseCase from '../../application/useCases/todo/ListTodoUseCase'
import GetTodoUseCase from '../../application/useCases/todo/GetTodoUseCase'
import DestroyTodoUseCase from '../../application/useCases/todo/DestroyTodoUseCase'
import TodoRepository from '../../infrastructure/repositories/TodoRepositoryMongo'
import NotFoundError from '../../application/Errors/NotFound'

export default {
  index,
  create,
  findById,
  destroy,
  update
}

async function index (req, res) {
  try {
    const { skip, limit, ...queryParams } = req.query
    const listTodoUseCase = new ListTodoUseCase(new TodoRepository())
    const todos = await listTodoUseCase.execute(queryParams, { skip, limit })
    res.json(todos)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

async function create (req, res) {
  try {
    const createTodoUseCase = new CreateTodoUseCase(new TodoRepository())
    const todo = await createTodoUseCase.execute(req.body)
    return res.status(201).json(todo)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

async function findById (req, res) {
  try {
    const getTodoUseCase = new GetTodoUseCase(new TodoRepository())
    const todo = await getTodoUseCase.execute(req.params.id)
    res.json(todo)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(404).json()
    }

    res.status(400).json({ message: e.message })
  }
}

async function destroy (req, res) {
  try {
    const destroyTodoUseCase = new DestroyTodoUseCase(new TodoRepository())
    await destroyTodoUseCase.execute(req.params.id)
    res.status(204).json()
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(404).json()
    }

    res.status(400).json({ message: e.message })
  }
}

async function update (req, res) {
  try {
    const updateTodoUseCase = new UpdateTodoUseCase(new TodoRepository())
    const todoUpdated = await updateTodoUseCase.execute(req.params.id, req.body)
    res.status(200).json(todoUpdated)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(404).json()
    }

    res.status(400).json({ message: e.message })
  }
}
