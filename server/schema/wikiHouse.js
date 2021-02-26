import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const WikiHouseSchema = new Schema({
  name: String,
  cname: String,
  words: String,
  intro: String,
  cover: String,
  wikiId: Number,
  sections: Mixed,
  swornMembers: [
    {
      character: {
        type: String,
        ref: 'WikiCharacter'
      },
      text: String
    }
  ],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

const WikiHouse = mongoose.model('WikiHouse', WikiHouseSchema)
export default WikiHouse
