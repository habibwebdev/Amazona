import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, requied: true },
    slug: { type: String, requied: true, unique: true },
    category: { type: String, requied: true },
    image: { type: String, requied: true },
    price: { type: Number, requied: true },
    brand: { type: String, requied: true },
    rating: { type: Number, requied: true, default: 0 },
    numReviews: { type: Number, requied: true, default: 0 },
    countInStock: { type: Number, requied: true, default: 0 },
    description: { type: String, requied: true },
  },
  {
    timestamps: true,
  }
)

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
