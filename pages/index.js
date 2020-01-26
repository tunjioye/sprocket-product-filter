import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  FlexboxGrid,
  Col,
  Loader,
  Input,
  InputGroup,
  Divider,
  SelectPicker
} from 'rsuite'
import Products from '../components/Products'
import axios from 'axios'
import { API_URL } from '../config'
import {
  calculateLowestPriceBound,
  calculateHighestPriceBound,
  getAllTags
} from '../lib/utils/helpers'

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

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this)
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

  handleInputChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handlePriceRangeChange (rangeValue) {
    this.setState({
      priceLowestBound: rangeValue[0],
      priceHighestBound: rangeValue[1]
    })
  }

  async handleSearchButtonClick (e) {
    e.preventDefault()

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
          priceLowestBound: calculateLowestPriceBound(data),
          priceHighestBound: calculateHighestPriceBound(data),
          tags: getAllTags(data)
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
              <FormControl
                placeholder="Enter Product"
                name="searchQuery"
                value={searchQuery}
                onChange={(value) => this.handleInputChange('searchQuery', value)}
              />
            </FormGroup>
            <Button type="submit" appearance="primary" className="mb--0" onClick={this.handleSearchButtonClick}>Search</Button>
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
                            <InputGroup className="mb--05">
                              <Input
                                type="number"
                                min={0}
                                max={priceHighestBound}
                                step="0.01"
                                placeholder="0"
                                value={priceLowestBound}
                                onChange={(value) => this.handleInputChange('priceLowestBound', value)}
                              />
                              <InputGroup.Addon>to</InputGroup.Addon>
                              <Input
                                type="number"
                                min={priceLowestBound}
                                max={priceHighestBound}
                                step="0.01"
                                placeholder="0"
                                value={priceHighestBound}
                                onChange={(value) => this.handleInputChange('priceHighestBound', value)}
                              />
                            </InputGroup>
                            <Button block appearance="primary" className="mb--0" onClick={() => {console.log('filering by price')}}>Go</Button>
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

const inputGroupButtonPrimary = {
  color: '#fff',
  borderBottomRightRadius: '4px',
  borderTopRightRadius: '4px',
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
