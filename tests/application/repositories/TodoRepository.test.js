import TodoRepository from '../../../src/application/repositories/TodoRepository'

describe('TodoRepository (Abstract Class)', () => {
  it('should throw an error when calling unimplemented methods', async () => {
    const repository = new TodoRepository()

    await expect(repository.find({}, {})).rejects.toThrow('Method not implemented')
    await expect(repository.findById('some-id')).rejects.toThrow('Method not implemented')
    await expect(repository.save({ title: 'Test' })).rejects.toThrow('Method not implemented')
    await expect(repository.update('some-id', { title: 'Updated' })).rejects.toThrow('Method not implemented')
    await expect(repository.destroy('some-id')).rejects.toThrow('Method not implemented')
  })

  it('should not allow instantiation of the abstract class', () => {
    expect(() => new TodoRepository()).not.toThrow()
  })
})
