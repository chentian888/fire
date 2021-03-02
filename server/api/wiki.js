import WikiHouse from '../schema/wikiHouse'
import WikiCharacter from '../schema/wikiCharacter'

export async function getHouses() {
  const data = await WikiHouse.find({})
    .populate({
      path: 'swornMembers.character',
      select: '_id name cname profile'
    })
    .exec()

  return data
}
export async function getHouse(id) {
  const data = await WikiHouse.findOne({ _id: id })
    .populate({ path: 'swornMembers.character', select: '_id name cname profile' })
    .exec()
  return data
}
export async function getCharacters() {
  const data = await WikiCharacter.find({}).exec()
  return data
}
export async function getCharacter(id) {
  const data = await WikiCharacter.findOne({ _id: id }).exec()
  console.log(data)
  return data
}
