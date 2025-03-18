import mongoose from 'mongoose'
import CreateTodoUseCase from '../../../src/application/useCases/todo/CreateTodoUseCase'

describe('CreateTodoUseCase', () => {
  let todoRepositoryMock
  let createTodoUseCase

  beforeEach(() => {
    todoRepositoryMock = {
      save: jest.fn(),
    }
    createTodoUseCase = new CreateTodoUseCase(todoRepositoryMock)
  })


  describe('execute', () => {
    it('should save a todo', async () => {
      const todoData = { name: 'Test Todo', content: 'This is a test' }
      const savedTodo = { ...todoData, status: 'active' }
      todoRepositoryMock.save.mockResolvedValue(savedTodo)

      const result = await createTodoUseCase.execute(todoData)

      expect(todoRepositoryMock.save).toHaveBeenCalledWith({
        name: 'Test Todo',
        content: 'This is a test',
        status: 'active'
      })
      expect(result).toEqual(savedTodo)
    })

    it('should throw an error if the repository fails', async () => {
      const todoData = { name: 'Test Todo', content: 'This is a test' }
      const mockError = new Error('Failed to save todo')
      todoRepositoryMock.save.mockRejectedValue(mockError)

      await expect(createTodoUseCase.execute(todoData)).rejects.toThrow('Failed to save todo')

      expect(todoRepositoryMock.save).toHaveBeenCalledWith({
        name: 'Test Todo',
        content: 'This is a test',
        status: 'active',
      });
    });

  })


})
