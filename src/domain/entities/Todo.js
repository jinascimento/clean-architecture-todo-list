class Todo {

  constructor({ id, name, content }) {
    this.id = id
    this.name = name
    this.content = content
    this.status = 'active'
  }

  create() {
    this.validateName()
    return this.toData()
  }

  update() {
    this.validateName()
    return this.toData()
  }

  toData() {
    const { id, name, content, status } = this
    return { id, name, content, status }
  }

  validateName() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required')
    }
  }

}

export default Todo
