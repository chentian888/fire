import bcrypt from 'bcrypt'
import { controller, get, post, validate } from '../decorator/router'
import api from '../api'
import { adminLogin } from '../controller/admin'
@controller('/admin')
export default class AdminController {
  @post('/login')
  @validate({ body: ['email', 'password'] })
  async login(ctx, next) {
    await adminLogin(ctx, next)
  }

  @post('/logout')
  async logout() {}
}
