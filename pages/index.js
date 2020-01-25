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
  Col,
  Icon
} from 'rsuite'
// import data from '../data'
import ProductList from '../components/ProductList'
import axios from 'axios'
import { API_URL } from '../config'

class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props,
      searchQuery: ''
    }

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
  }

  static async getInitialProps () {
    let products = []
    let finalErrorMessage = ''

    try{
      const queryUrl = `${API_URL}/products`
      const { data } = await axios.get(queryUrl, {
        headers: {
          'Access-Control-Allow-Origin': `*`
        }
      })

      if (Array.isArray(data)) {
        products = data
      }
    } catch (error) {
      let errorMessage = 'Network Error! Please connect to the internet and try again.'

      if (error.response) {
        const { status } = error.response
        if (status && status >= 500) {
          errorMessage = 'Error! Something went wrong. Please try again later.'
        }
      }

      finalErrorMessage = errorMessage
    }

    return {
      products,
      errorMessage: finalErrorMessage
    }
  }

  handleSearchQueryChange (value) {
    this.setState({
      searchQuery: value
    })
  }

  async handleSearchButtonClick () {
    const { searchQuery } = this.state

    try{
      const queryUrl = `${API_URL}/products/search?query=${searchQuery}`
      const { data } = await axios.get(queryUrl, {
        headers: {
          'Access-Control-Allow-Origin': `*`
        }
      })

      if (Array.isArray(data)) {
        this.setState({
          products: data
        })
      }
    } catch (error) {
      let errorMessage = 'Network Error! Please connect to the internet and try again.'

      if (error.response) {
        const { status } = error.response
        if (status && status >= 500) {
          errorMessage = 'Error! Something went wrong. Please try again later.'
        }
      }

      alert(errorMessage)
    }
  }

  componentDidMount () {
    const { errorMessage } = this.props
    if (errorMessage) {
      alert(errorMessage)
    }
  }

  render() {
    const { products } = this.state
    const mappedProducts = products.map((product, productIndex) => (
      <ProductList product={product} productIndex={productIndex} key={productIndex} />
    ))
    const { searchQuery } = this.state

    return (
      <>
        <section className="section flex flex--centered">
          <h2>Sprocket API Demo</h2>
        </section>
        <section className="section section--xs flex flex--centered bg--light">
          <Form layout="inline">
            <FormGroup className="mb--0">
              {/* <ControlLabel>Search Products</ControlLabel> */}
              <FormControl placeholder="Enter Product" name="searchQuery" value={searchQuery} onChange={this.handleSearchQueryChange} />
            </FormGroup>
            <Button appearance="primary" className="mb--0" onClick={this.handleSearchButtonClick}>Search</Button>
          </Form>
        </section>
        <section className="section section--sm">
          <h3 className="align--center mb--2">Products List</h3>
          <div className="responsive--wrapper">
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
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
