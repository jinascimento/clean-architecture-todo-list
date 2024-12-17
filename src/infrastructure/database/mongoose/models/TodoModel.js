import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    content: {
      type: String
    }
  },
  {
    timestamps: true
  })

todoSchema.index({ date: 1 })
const Todo = mongoose.model('Todo', todoSchema)

export default Todo
