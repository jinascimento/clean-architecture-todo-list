import TodoEntity from '../../../domain/entities/Todo'

class CreateTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(data) {
    const todo = new TodoEntity(data)
    return this.todoRepository.save(todo.create())
  }
}

export default CreateTodoUseCase
