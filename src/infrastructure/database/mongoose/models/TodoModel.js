import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  })

todoSchema.index({ status: 1 })
const Todo = mongoose.model('Todo', todoSchema)

export default Todo
