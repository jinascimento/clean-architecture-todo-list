import mongoose from 'mongoose'
import UpdateTodoUseCase from '../../../src/application/useCases/todo/UpdateTodoUseCase'

describe('UpdateTodoUseCase', () => {
  let todoRepositoryMock
  let updateTodoUseCase
  let todoId = 1

  beforeEach(() => {
    todoRepositoryMock = {
      update: jest.fn(),
    }

    updateTodoUseCase = new UpdateTodoUseCase(todoRepositoryMock)
  })


  describe('execute', () => {
    it('should update a todo', async () => {
      const todoData = { name: 'Test Todo', content: 'This is a test' }
      const todoUpdated = { ...todoData, id: todoId }
      todoRepositoryMock.update.mockResolvedValue(todoUpdated)

      const result = await updateTodoUseCase.execute(todoId, todoData)
      expect(todoRepositoryMock.update).toHaveBeenCalledWith(todoId, { ...todoData, status: 'active' })

      expect(result).toEqual(todoUpdated)
    })

    it('should throw an error if the todo was not found', async () => {
      const todoData = { name: 'Test Todo', content: 'This is a test' }

      todoRepositoryMock.update.mockResolvedValue(undefined)

      await expect(updateTodoUseCase.execute(todoId, todoData)).rejects.toThrow('Todo not found')
    })



  })


})
