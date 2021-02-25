import WikiHouse from '../schema/wikiHouse'

export async function getHouses() {
  const data = await WikiHouse.find({})
    .populate({
      path: 'swornMembers.character',
      select: '_id name cname profile'
    })
    .exec()

  return data
}
export async function getHouse(id) {}
export async function getCharacters() {}
export async function getCharacter(id) {}
