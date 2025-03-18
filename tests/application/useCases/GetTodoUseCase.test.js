import mongoose from 'mongoose'
import GetTodoUseCase from '../../../src/application/useCases/todo/GetTodoUseCase'

describe('GetTodoUseCase', () => {
  let todoRepositoryMock
  let getTodoUseCase
  let todoId = 1

  beforeEach(() => {
    todoRepositoryMock = {
      findById: jest.fn(),
    }

    getTodoUseCase = new GetTodoUseCase(todoRepositoryMock)
  })


  describe('execute', () => {
    it('should find and return a todo', async () => {
      todoRepositoryMock.findById.mockResolvedValue({
        id: 1,
        name: 'Test Todo',
        content: 'This is a test',
        status: 'active'
      })

      await getTodoUseCase.execute(todoId)
      expect(todoRepositoryMock.findById).toHaveBeenCalledWith(todoId)
    })

    it('should throw an error if the todo was not found', async () => {
      todoRepositoryMock.findById.mockResolvedValue(undefined)

      await expect(getTodoUseCase.execute(todoId)).rejects.toThrow('Todo not found')
    })


  })


})
