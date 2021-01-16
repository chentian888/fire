import { resolve } from 'path'
import _ from 'lodash'
const env = process.env.NODE_ENV || 'development'
const host = process.env.HOST || 'localhost'
const config = require(resolve(__dirname, `${env}.json`))

export default _.assign({ env, host }, config)
