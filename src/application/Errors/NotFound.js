export default class NotFoundError extends Error {
  constructor () {
    super('Todo not found')
  }
}
