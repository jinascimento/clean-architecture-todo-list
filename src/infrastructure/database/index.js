import mongoose from 'mongoose'

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log('Database connected successfully')
    return connection
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1) // Exit process with failure
  }
}

const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Database disconnected successfully')
  } catch (error) {
    console.error('Error during database disconnection:', error)
  }
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
}
