import express from 'express'
import TodoRoute from './todoRoute'

const api = express()

api.use('/todos', TodoRoute)

export default api
