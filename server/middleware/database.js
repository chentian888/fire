import mongoose from 'mongoose'
import config from '../config'
export const database = app => {
  console.log('setting database middleware')
  mongoose.set('debug', true)
  mongoose.connect(config.db)
  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB')
  })
  mongoose.connection.on('error', async err => {
    console.error(err)
  })
  mongoose.connection.on('disconnected', async () => {
    mongoose.connect(config.db)
  })
}
