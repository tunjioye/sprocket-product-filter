import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormControl,
  // ControlLabel,
  Button,
  FlexboxGrid,
  Col,
  Loader,
  RangeSlider,
  Input,
  Divider,
  SelectPicker
} from 'rsuite'
// import data from '../data'
import Products from '../components/Products'
import axios from 'axios'
import { API_URL } from '../config'

class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props,
      searchQuery: '',
      loading: false,
      searchQueryResponse: true,
      price: 0,
      priceLowestBound: 0,
      priceHighestBound: 0,
      tags: []
    }

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handlePriceLowestBoundChange = this.handlePriceLowestBoundChange.bind(this)
    this.handlePriceHighestBoundChange = this.handlePriceHighestBoundChange.bind(this)
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this)
    this.calculateLowestPriceBound = this.calculateLowestPriceBound.bind(this)
    this.calculateHighestPriceBound = this.calculateHighestPriceBound.bind(this)
    this.getAllTags = this.getAllTags.bind(this)
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

  handlePriceChange (value) {
    this.setState({
      price: value
    })
  }

  handlePriceLowestBoundChange (value) {
    this.setState({
      priceLowestBound: value
    })
  }

  handlePriceHighestBoundChange (value) {
    this.setState({
      priceHighestBound: value
    })
  }

  handlePriceRangeChange (rangeValue) {
    this.setState({
      priceLowestBound: rangeValue[0],
      priceHighestBound: rangeValue[1]
    })
  }

  calculateLowestPriceBound (products) {
    const productWithLowestPrice = products.reduce((prev, current) => {
      return (prev.price > current.price) ? prev : current
    })
    return productWithLowestPrice.price
  }

  calculateHighestPriceBound (products) {
    const productWithHighestPrice = products.reduce((prev, current) => {
      return (prev.price < current.price) ? prev : current
    })
    return productWithHighestPrice.price
  }

  getAllTags (products) {
    let allTags = products.reduce((prev, current) => {
      return prev.concat(current.tags)
    }, [])
    allTags = allTags.map(tag => {
      return {
        label: tag,
        value: tag
      }
    })
    return allTags
  }

  async handleSearchButtonClick () {
    const { searchQuery } = this.state
    this.setState({
      loading: true
    })

    try{
      const queryUrl = `${API_URL}/products/search?query=${searchQuery}`
      const { data } = await axios.get(queryUrl, {
        headers: {
          'Access-Control-Allow-Origin': `*`
        }
      })

      if (Array.isArray(data)) {
        this.setState({
          products: data,
          searchQueryResponse: true,
          priceLowestBound: this.calculateLowestPriceBound(data),
          priceHighestBound: this.calculateHighestPriceBound(data),
          tags: this.getAllTags(data)
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

    this.setState({
      loading: false
    })
  }

  componentDidMount () {
    const { errorMessage } = this.props
    if (errorMessage) {
      alert(errorMessage)
    }
  }

  render() {
    const { products } = this.state
    const {
      searchQuery,
      loading,
      searchQueryResponse,
      priceLowestBound,
      priceHighestBound,
      tags
    } = this.state

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
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={22}>
              {loading
                ? (
                  <div className="align--center">
                    <Loader size="md" content="Loading Products ..." />
                  </div>
                )
                : searchQueryResponse
                  ? (
                    <FlexboxGrid>
                      <FlexboxGrid.Item componentClass={Col} colspan={24} md={5}>
                        <div className="mb--1">
                          <h6 className="mb--1">Price</h6>
                          <div>
                            <FlexboxGrid className="mb--05" justify="space-between">
                              <FlexboxGrid.Item componentClass={Col} colspan={11}>
                                <Input
                                  type="number"
                                  min={0}
                                  max={priceHighestBound}
                                  step="0.01"
                                  placeholder="0"
                                  value={priceLowestBound}
                                  onChange={this.handlePriceLowestBoundChange}
                                />
                              </FlexboxGrid.Item>
                              <FlexboxGrid.Item componentClass={Col} colspan={11}>
                                <Input
                                  type="number"
                                  min={priceLowestBound}
                                  max={priceHighestBound}
                                  step="0.01"
                                  placeholder="0"
                                  value={priceHighestBound}
                                  onChange={this.handlePriceHighestBoundChange}
                                />
                              </FlexboxGrid.Item>
                            </FlexboxGrid>
                          </div>
                        </div>
                        <Divider />
                        <div className="mb--1">
                          <h6 className="mb--1">Tags</h6>
                          <div>
                            <SelectPicker
                              data={tags}
                              appearance="default"
                              placeholder="Tags"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                        <Divider />
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item componentClass={Col} colspan={24} md={1}>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                        <Products products={products} />
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  )
                  : (
                    <Products products={products} />
                  )
              }
            </FlexboxGrid.Item>
          </FlexboxGrid>
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
