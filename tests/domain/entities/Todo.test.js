import TodoEntity from '../../../src/domain/entities/Todo'


describe('TodoEntity', () => {
  describe('constructor', () => {
    it('should instance classe and set attributes', async () => {
      const todoAttributes = { name: 'test', content: 'content test', id: '1', status: 'active' }
      const todo = new TodoEntity(todoAttributes)

      expect(todo.toData()).toStrictEqual(todoAttributes)
    })
  })

  describe('create', () => {
    it('should create a todo when attributes is valid and return', async () => {
      const todoAttributes = { name: 'test', content: 'content test', id: '1', status: 'active' }
      const todo = new TodoEntity(todoAttributes)

      expect(todo.create()).toStrictEqual(todoAttributes)
    })

    it('should not create a todo when name is invalid and return exception', async () => {
      const todoAttributes = { name: '', content: 'content test', id: '1' }
      const todo = new TodoEntity(todoAttributes)

      expect(() => todo.create()).toThrow('Name is required')
    })

    it('should not create a todo when name is invalid and return exception', async () => {
      const todoAttributes = { name: '', content: 'content test', id: '1' }
      const todo = new TodoEntity(todoAttributes)

      expect(() => todo.create()).toThrow('Name is required')
    })
  })

  describe('update', () => {
    it('should update a todo when attributes is valid and return', async () => {
      const todoAttributes = { name: 'test', content: 'content test', id: '1', status: 'active' }
      const todo = new TodoEntity(todoAttributes)

      expect(todo.update()).toStrictEqual(todoAttributes)
    })

    it('should not update a todo when name is invalid and return exception', async () => {
      const todoAttributes = { name: '', content: 'content test', id: '1' }
      const todo = new TodoEntity(todoAttributes)

      expect(() => todo.update()).toThrow('Name is required')
    })

    it('should not update a todo when name is invalid and return exception', async () => {
      const todoAttributes = { name: '', content: 'content test', id: '1' }
      const todo = new TodoEntity(todoAttributes)

      expect(() => todo.update()).toThrow('Name is required')
    })
  })


})
