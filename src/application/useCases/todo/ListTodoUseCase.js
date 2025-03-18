class ListTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(data, paginationData) {
    return this.todoRepository.find(data, paginationData)
  }
}

export default ListTodoUseCase
