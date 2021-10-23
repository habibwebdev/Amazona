import { Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import db from './../utils/db'
import Product from '../models/Product'
import axios from 'axios'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Store } from '../utils/Store'
import ProductItem from '../components/ProductItem'

export default function Home(props) {
  const { products } = props
  const router = useRouter()
  const { state, dispatch } = useContext(Store)

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    // console.log(existItem)
    const quantity = existItem ? existItem.quantity + 1 : 1
    // console.log(product)
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock!!!')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })

    router.push('/cart')
  }
  return (
    <Layout>
      <div>
        <h1>Product</h1>

        <Grid container spacing={3}>
          {/* {data.products.map((product) => ( */}
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}, '-reviews').lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
