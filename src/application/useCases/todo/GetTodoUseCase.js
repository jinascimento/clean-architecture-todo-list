import NotFoundError from '../../Errors/NotFound'

class GetTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(id) {
    const todo = await this.todoRepository.findById(id)

    if (!todo) {
      throw new NotFoundError()
    }

    return todo
  }
}

export default GetTodoUseCase
