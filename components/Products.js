import React from 'react'
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
    <>
      {products.length > 0
        ? (
          <div className="responsive--wrapper">
            <List hover>
              {mappedProducts}
            </List>
          </div>
        )
        : (
          <div className="section bg--light align--center text--dark">
            <Icon className="mb--1" icon="ban" size="3x" style={{ color: '#f44336' }} />
            <p className="font__size--xlarge">No Products Found</p>
          </div>
        )
      }
    </>
  )
}

export default Products
