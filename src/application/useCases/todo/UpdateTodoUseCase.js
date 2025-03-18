import TodoEntity from "../../../domain/entities/Todo";
import NotFoundError from "../../Errors/NotFound";

class UpdateTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(id, data) {
    const todo = new TodoEntity(data)
    const todoUpdated = await this.todoRepository.update(id, todo.update())

    if (!todoUpdated) {
      throw new NotFoundError('todo not found')
    }

    return todoUpdated
  }
}

export default UpdateTodoUseCase
