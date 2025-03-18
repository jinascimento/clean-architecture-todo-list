import mongoMock from '../../mocks/MongoMock'
import TodoModel from '../../../src/infrastructure/database/mongoose/models/TodoModel'
import TodoRepositoryMongo from '../../../src/infrastructure/repositories/TodoRepositoryMongo'

beforeAll(async () => {
  await mongoMock.connect()
});

afterAll(async () => {
  await mongoMock.disconnect()
});

beforeEach(async () => {
  await mongoMock.dropDatabase()
})

describe('TodoRepositoryMongo', () => {
  describe('save', () => {
    it('should save a todo in the database', async () => {
      const repository = new TodoRepositoryMongo()

      const todoData = { name: 'Test Task', content: 'Test Description', status: 'active' }
      const todo = await repository.save(todoData)

      const savedTodo = await TodoModel.findById(todo.id)
      expect(savedTodo.name).toBe(todoData.name)
    })
  })

  describe('findById', () => {
    it('should find a todo by ID', async () => {
      const todo = await TodoModel.create({
        name: 'Find Task',
        content: 'Find Description',
        status: 'active'
      })

      const repository = new TodoRepositoryMongo()
      const foundTodo = await repository.findById(todo.id)

      expect(foundTodo.name).toBe(todo.name)
    })
  })

  describe('find', () => {
    it('should find a todo list', async () => {
      const todo = await TodoModel.create({
        name: 'Find Task',
        content: 'Find Description',
        status: 'active'
      })

      const repository = new TodoRepositoryMongo()
      const foundTodo = await repository.find()

      expect(foundTodo.length).toEqual(1)
    })
  })

  describe('update', () => {
    it('should update a todo', async () => {
      const todo = await TodoModel.create({
        name: 'Find Task',
        content: 'Description',
        status: 'active'
      })

      const repository = new TodoRepositoryMongo()
      const todoUpdated = await repository.update(todo.id, { name: 'Update Task' })

      expect(todoUpdated.name).toEqual('Update Task')
    })
  })

  describe('destroy', () => {
    it('should destroy a todo', async () => {
      const todo = await TodoModel.create({
        name: 'Find Task',
        content: 'Description',
        status: 'active'
      })

      const repository = new TodoRepositoryMongo()
      await repository.destroy(todo.id)
      const todoList = await repository.find()

      expect(todoList.length).toEqual(0)
    })
  })
})
