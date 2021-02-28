import { controller, get, post } from '../decorator/router'
import api from '../api'

@controller('/wiki')
export default class WikiController {
  @get('/houses')
  async getHouses(ctx, next) {
    const data = await api.wiki.getHouses()
    console.log(data)
    ctx.body = {
      data,
      success: true
    }
  }

  @get('/houses/:_id')
  async getHouse(ctx, next) {
    const { params } = ctx
    const { _id } = params
    if (!_id) return (ctx.body = { success: false, err: '_id is required' })
    const data = await api.wiki.getHouse(_id)
    ctx.body = {
      data,
      success: true
    }
  }

  @get('/characters')
  async getCharacters(ctx, next) {
    const data = await api.wiki.getCharacters()
    ctx.body = {
      data,
      success: true
    }
  }

  @get('/characters/:_id')
  async getCharacter() {
    await api.wiki.getCharacter()
  }
}
