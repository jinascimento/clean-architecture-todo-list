import NotFoundError from "../../Errors/NotFound";

class DestroyTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(id) {
    const todo = await this.todoRepository.destroy(id)

    if (todo?.deletedCount === 0) {
      throw new NotFoundError()
    }
  }
}

export default DestroyTodoUseCase
