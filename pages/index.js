import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormControl,
  // ControlLabel,
  Button,
  List,
  FlexboxGrid,
  Col
} from 'rsuite'
import data from '../data'
import ProductList from '../components/ProductList'

class IndexPage extends React.Component {
  static getInitialProps () {
    return {
      products: data
    }
  }

  render() {
    const { products } = this.props
    const mappedProducts = products.map((product, productIndex) => (
      <ProductList product={product} productIndex={productIndex} key={productIndex} />
    ))

    return (
      <>
        <section className="section flex flex--centered">
          <h2>Sprocket API Demo</h2>
        </section>
        <section className="section section--xs flex flex--centered bg--light">
          <Form layout="inline">
            <FormGroup className="mb--0">
              {/* <ControlLabel>Search Products</ControlLabel> */}
              <FormControl placeholder="Enter Product" name="product_title" />
            </FormGroup>
            <Button appearance="primary" className="mb--0">Search</Button>
          </Form>
        </section>
        <section className="section section--sm">
          <h3 className="align--center mb--2">Products List</h3>
          <div className="responsive--wrapper">
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                <List hover>
                  {mappedProducts}
                </List>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
