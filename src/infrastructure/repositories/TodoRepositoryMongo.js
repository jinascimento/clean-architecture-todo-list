import Todo from '../database/mongoose/models/TodoModel'
import TodoRepository from '../../application/repositories/TodoRepository'

class TodoRepositoryMongo extends TodoRepository {

  async find(filter, paginationData) {
    const { skip, limit } = paginationData || { skip: 0, limit: 10 }
    return Todo.find(filter).skip(skip).limit(limit)
  }

  async findById(id) {
    return Todo.findById(id)
  }

  async save(todoData) {
    return Todo.create(todoData)
  }

  async update(id, todoData) {
    return Todo.findByIdAndUpdate(id, todoData, { new: true })
  }

  async destroy(id) {
    return Todo.deleteOne({_id: id })
  }
}

module.exports = TodoRepositoryMongo
