import ListTodoUseCase from '../../../src/application/useCases/todo/ListTodoUseCase'

describe('ListTodoUseCase', () => {
  let todoRepositoryMock
  let listTodoUseCase

  beforeEach(() => {
    todoRepositoryMock = {
      find: jest.fn(),
    }
    listTodoUseCase = new ListTodoUseCase(todoRepositoryMock)
  })


  describe('execute', () => {
    it('should find and return a todo list', async () => {
      const todoList = [{
        name: 'Test Todo',
        content: 'This is a test',
        status: 'active'
      }]
      const paginationData = {skip: 0, limit: 10}
      todoRepositoryMock.find.mockResolvedValue(todoList)

      const result = await listTodoUseCase.execute({}, paginationData)

      expect(todoRepositoryMock.find).toHaveBeenCalledWith({}, paginationData)
      expect(result).toEqual(todoList)
    })



  })


})
