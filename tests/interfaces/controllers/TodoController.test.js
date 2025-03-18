import TodoController from '../../../src/interfaces/controllers/TodoController'
import CreateTodoUseCase from '../../../src/application/useCases/todo/CreateTodoUseCase'
import UpdateTodoUseCase from '../../../src/application/useCases/todo/UpdateTodoUseCase'
import ListTodoUseCase from '../../../src/application/useCases/todo/ListTodoUseCase'
import GetTodoUseCase from '../../../src/application/useCases/todo/GetTodoUseCase'
import DestroyTodoUseCase from '../../../src/application/useCases/todo/DestroyTodoUseCase'
import NotFoundError from '../../../src/application/Errors/NotFound'

jest.mock('../../../src/application/useCases/todo/CreateTodoUseCase')
jest.mock('../../../src/application/useCases/todo/UpdateTodoUseCase')
jest.mock('../../../src/application/useCases/todo/ListTodoUseCase')
jest.mock('../../../src/application/useCases/todo/GetTodoUseCase')
jest.mock('../../../src/application/useCases/todo/DestroyTodoUseCase')

describe('TodoController', () => {
  let req, res

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  });

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('create', () => {
    it('should create a todo and return 201', async () => {
      const mockTodo = { title: 'Test Todo' }
      CreateTodoUseCase.prototype.execute.mockResolvedValue(mockTodo)

      req.body = { title: 'Test Todo' }
      await TodoController.create(req, res)

      expect(CreateTodoUseCase.prototype.execute).toHaveBeenCalledWith({
        title: 'Test Todo',
      })
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(mockTodo)
    })

    it('should return 400 if an error occurs', async () => {
      CreateTodoUseCase.prototype.execute.mockRejectedValue(new Error('Invalid data'))

      req.body = { title: '' }
      await TodoController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid data' })
    })
  })

  describe('findById', () => {
    it('should return a todo by ID', async () => {
      const mockTodo = { id: '1', title: 'Test Todo' }
      GetTodoUseCase.prototype.execute.mockResolvedValue(mockTodo)

      req.params.id = '1'
      await TodoController.findById(req, res)

      expect(GetTodoUseCase.prototype.execute).toHaveBeenCalledWith('1')
      expect(res.json).toHaveBeenCalledWith(mockTodo)
    })

    it('should return 404 if todo is not found', async () => {
      GetTodoUseCase.prototype.execute.mockRejectedValue(new NotFoundError())

      req.params.id = '1'
      await TodoController.findById(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('should return 400 when an unexpected error occurs', async () => {
      const mockError = new Error('Unexpected error')
      GetTodoUseCase.prototype.execute.mockRejectedValue(mockError)

      req.params.id = '1'
      await TodoController.findById(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Unexpected error' })
    })
  })

  describe('index', () => {
    it('should list todos', async () => {
      const mockTodos = [{ id: '1', title: 'Todo 1' }]
      ListTodoUseCase.prototype.execute.mockResolvedValue(mockTodos)

      req.query = { skip: 0, limit: 10 }
      await TodoController.index(req, res)

      expect(ListTodoUseCase.prototype.execute).toHaveBeenCalledWith(
        {},
        { skip: 0, limit: 10 }
      )
      expect(res.json).toHaveBeenCalledWith(mockTodos)
    })

    it('should return 400 when an unexpected error occurs', async () => {
      const mockError = new Error('Unexpected error')
      ListTodoUseCase.prototype.execute.mockRejectedValue(mockError)

      req.query = { skip: 0, limit: 10 }
      await TodoController.index(req, res)

      expect(ListTodoUseCase.prototype.execute).toHaveBeenCalledWith(
        {},
        { skip: 0, limit: 10 }
      )
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Unexpected error' })
    })
  })

  describe('update', () => {
    it('should update a todo and return 200', async () => {
      const mockUpdatedTodo = { id: '1', title: 'Updated Todo' }
      UpdateTodoUseCase.prototype.execute.mockResolvedValue(mockUpdatedTodo)

      req.params.id = '1'
      req.body = { title: 'Updated Todo' }
      await TodoController.update(req, res)

      expect(UpdateTodoUseCase.prototype.execute).toHaveBeenCalledWith('1', {
        title: 'Updated Todo',
      })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockUpdatedTodo)
    })

    it('should return 404 if todo is not found', async () => {
      UpdateTodoUseCase.prototype.execute.mockRejectedValue(new NotFoundError())

      req.params.id = '1'
      req.body = { title: 'Updated Todo' }
      await TodoController.update(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('should return 400 if an exception is thrown', async () => {
      const mockError = new Error('Unexpected error')
      UpdateTodoUseCase.prototype.execute.mockRejectedValue(mockError)

      req.params.id = '1'
      req.body = { title: '' }
      await TodoController.update(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })
  })

  describe('destroy', () => {
    it('should delete a todo and return 204', async () => {
      DestroyTodoUseCase.prototype.execute.mockResolvedValue()

      req.params.id = '1'
      await TodoController.destroy(req, res)

      expect(DestroyTodoUseCase.prototype.execute).toHaveBeenCalledWith('1')
      expect(res.status).toHaveBeenCalledWith(204)
    })

    it('should return 404 if todo is not found', async () => {
      DestroyTodoUseCase.prototype.execute.mockRejectedValue(new NotFoundError())

      req.params.id = '1'
      await TodoController.destroy(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })

    it('should return 400 when an unexpected error occurs', async () => {
      const mockError = new Error('Unexpected error')
      DestroyTodoUseCase.prototype.execute.mockRejectedValue(mockError)

      req.params.id = '1'
      await TodoController.destroy(req, res)

      expect(DestroyTodoUseCase.prototype.execute).toHaveBeenCalledWith('1')
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Unexpected error' })
    })
  })
})
