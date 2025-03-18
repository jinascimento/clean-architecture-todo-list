import 'dotenv/config'
import express from 'express'
import { connectToDatabase, disconnectFromDatabase } from './infrastructure/database'
import routes from './interfaces/routes'

const app = express()

app.use(express.json())
app.use('/api', routes)

const startServer = async () => {
  try {
    await connectToDatabase()

    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })

    process.on('SIGINT', async () => {
      console.log('Shutting down gracefully...')
      await disconnectFromDatabase()
      process.exit(0)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

startServer()
