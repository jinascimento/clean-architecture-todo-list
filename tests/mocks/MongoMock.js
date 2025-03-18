import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class MongoMock {
  constructor() {
    this.mongoServer = null
    this.database = null
  }

  async connect() {
    this.mongoServer = await MongoMemoryServer.create()
    const mongoUri = this.mongoServer.getUri()

    this.database = await mongoose.connect(mongoUri)
  }

  async disconnect() {
    if (this.database) {
      await mongoose.connection.close()
    }

    if (this.mongoServer) {
      await this.mongoServer.stop()
    }
  }

  async dropDatabase() {
    if (this.database) {
      await mongoose.connection.db.dropDatabase()
    }
  }
}

export default new MongoMock();
