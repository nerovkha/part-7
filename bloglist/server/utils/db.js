import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import config from './config.js'

const connectToDatabase = async () => {
  let uri = config.MONGODB_URI

  if (!uri) {
    if (config.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI must be set in production')
    }

    const memoryServer = await MongoMemoryServer.create()
    uri = memoryServer.getUri('bloglist')
    console.log('no MONGODB_URI configured, using an in-memory database')
  }

  await mongoose.connect(uri)
  console.log('connected to', config.MONGODB_URI ? 'MongoDB' : 'in-memory MongoDB')
}

export default connectToDatabase
