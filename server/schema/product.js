import mongoose from 'mongoose'
const { Schema } = mongoose

const PorductSchema = new Schema({
  title: String,
  price: Number,
  intro: String,
  parameters: [{ key: String, value: String }],
  images: [String]
})

const Porduct = mongoose.model('Porduct', PorductSchema)

export default Porduct
