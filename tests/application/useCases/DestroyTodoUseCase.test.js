import mongoose from 'mongoose'
import DestroyTodoUseCase from '../../../src/application/useCases/todo/DestroyTodoUseCase'

describe('DestroyTodoUseCase', () => {
  let todoRepositoryMock
  let destroyTodoUseCase
  let todoId = 1

  beforeEach(() => {
    todoRepositoryMock = {
      destroy: jest.fn(),
    }

    destroyTodoUseCase = new DestroyTodoUseCase(todoRepositoryMock)
  })


  describe('execute', () => {
    it('should destroy a todo', async () => {
      todoRepositoryMock.destroy.mockResolvedValue({ deletedCount: 1 })

      await destroyTodoUseCase.execute(todoId)
      expect(todoRepositoryMock.destroy).toHaveBeenCalledWith(todoId)
    })

    it('should throw an error if the todo was not deleted', async () => {
      todoRepositoryMock.destroy.mockResolvedValue({ deletedCount: 0 })

      await expect(destroyTodoUseCase.execute(todoId)).rejects.toThrow('Todo not found')
    })

  })


})
