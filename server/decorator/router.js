import { resolve } from 'path'
import Router from 'koa-router'
import R from 'ramda'
import _ from 'lodash'
import glob from 'glob'
let routersMap = new Map()
const symbolPrefix = Symbol('prefix')
const normalizePath = path => (path.startsWith('/') ? path : '/' + path)
const isArray = v => (_.isArray(v) ? v : [v])
export default class Route {
  constructor(app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }
  init() {
    console.info(glob.sync(resolve(this.apiPath, './*.js')))
    glob.sync(resolve(this.apiPath, './*.js')).forEach(require)
    for (let [conf, controller] of routersMap) {
      const controllers = isArray(controller)
      let prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  routersMap.set({ target: target, ...conf }, target[key])
}

export const get = path => router({ method: 'get', path })
export const post = path => router({ method: 'post', path })
export const put = path => router({ method: 'put', path })
export const del = path => router({ method: 'del', path })

const decorate = (args, middleware) => {
  const [target, key, description] = args
  target[key] = isArray(target[key])
  target[key].unshift(middleware)
  return description
}
const convert = middleware => (...args) => decorate(args, middleware)

export const validate = rules =>
  convert(async (ctx, next) => {
    let errors = []
    const passRules = R.forEachObjIndexed((value, key) => {
      errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
    })
    passRules(rules)
    if (errors.length) ctx.throw(412, `${errors.join(', ')}参数缺失`)
    await next()
  })
