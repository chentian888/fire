import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const WikiCharacterSchema  = new Schema({
  _id: String,
  wikiId: Number,
  nmId: String,
  chId: String,
  name: String,
  cname: String,
  playedBy: String,
  profile: String,
  images: [String],
  sections: Mixed,
  intro: [String],
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

const WikiCharacter = mongoose.model('WikiCharacter', WikiCharacterSchema)

export default WikiCharacter
