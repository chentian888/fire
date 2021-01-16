import bodyParser from 'koa-bodyparser'
import session from 'koa-session'

export const addBody = app => {
  console.log('setting bodyParser middleware')
  app.use(bodyParser())
}
export const addSession = app => {
  const CONFIG = {
    key: 'koa.sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    signed: true,
    rolling: false
  }
  console.log('setting session middleware')
  app.use(session(CONFIG, app))
}
