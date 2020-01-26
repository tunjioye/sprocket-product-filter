import { useSelector } from 'react-redux'
import ProductList from './ProductList'
import {
  List,
  Icon
} from 'rsuite'

const Products = props => {
  const {
    products = []
  } = props
  const mappedProducts = products.map((product, productIndex) => (
    <ProductList product={product} productIndex={productIndex} key={productIndex} />
  ))

  return (
    <div className="responsive--wrapper">
      {products.length > 0
        ? (
          <List hover>
            {mappedProducts}
          </List>
        )
        : (
          <div className="section bg--light align--center text--dark">
            <Icon className="mb--1" icon="ban" size="3x" style={{ color: '#f44336' }} />
            <p className="font__size--xlarge">No Products Found</p>
          </div>
        )
      }
    </div>
  )
}

export default Products
