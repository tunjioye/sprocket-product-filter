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
  SelectPicker,
  InputPicker
} from 'rsuite'
import Products from '../components/Products'
import axios from 'axios'
import { API_URL } from '../config'
import {
  calculateLowestPriceBound,
  calculateHighestPriceBound,
  getAllTags,
  getAllCountries,
  sortByOptions,
  sortOrderOptions
} from '../lib/utils/helpers'

class IndexPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ...props,
      searchQuery: '',
      loading: false,
      country: null,
      sort_attribute: null,
      sort_order: null,
      limit: 100,
      offset: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
    this.fetchProductsViaQuery = this.fetchProductsViaQuery.bind(this)
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
      errorMessage: finalErrorMessage,
      priceLowestBound: calculateLowestPriceBound(products),
      priceHighestBound: calculateHighestPriceBound(products),
      tags: getAllTags(products),
      countries: getAllCountries(products)
    }
  }

  handleInputChange (key, value, filterProducts = false) {
    this.setState({
      [key]: value
    })

    if (filterProducts) setTimeout(() => this.filterProducts(), 500)
  }

  handlePriceRangeChange (rangeValue) {
    this.setState({
      priceLowestBound: rangeValue[0],
      priceHighestBound: rangeValue[1]
    })
  }

  async handleSearchButtonClick (e) {
    e.preventDefault()

    // reset filtering and sorting fields
    this.setState({
      country: null,
      sort_attribute: null,
      sort_order: null,
      limit: 100,
      offset: 0
    })

    const { searchQuery } = this.state
    let queryUrl = `${API_URL}/products/search?query=${searchQuery}`
    setTimeout(() => this.fetchProductsViaQuery(queryUrl), 500)
  }

  filterProducts () {
    const {
      searchQuery,
      // priceLowestBound,
      // priceHighestBound,
      country,
      sort_attribute,
      sort_order
    } = this.state

    // set sort_order based on sort_attribute
    if (sort_attribute && !sort_order) {
      this.setState({
        sort_order: 'asc'
      })
    }
    if (!sort_attribute) {
      this.setState({
        sort_order: null
      })
    }

    let queryUrl = `${API_URL}/products/search?query=${searchQuery}`
    // queryUrl = (priceLowestBound && priceHighestBound)
    //   ? `${queryUrl}&price=${priceLowestBound},${priceHighestBound}`
    //   : queryUrl
    queryUrl = (country)
      ? `${queryUrl}&country=${country}`
      : queryUrl
    queryUrl = (sort_attribute && sort_order)
      ? `${queryUrl}&sort_attribute=${sort_attribute}&sort_order=${sort_order}`
      : queryUrl
    setTimeout(() => this.fetchProductsViaQuery(queryUrl), 500)
  }

  async fetchProductsViaQuery (queryUrl) {
    this.setState({
      loading: true
    })

    try{
      const { data } = await axios.get(queryUrl, {
        headers: {
          'Access-Control-Allow-Origin': `*`
        }
      })

      if (Array.isArray(data)) {
        this.setState({
          products: data,
          priceLowestBound: calculateLowestPriceBound(data),
          priceHighestBound: calculateHighestPriceBound(data),
          tags: getAllTags(data),
          countries: getAllCountries(data)
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
    if (errorMessage) alert(errorMessage)
  }

  render() {
    const { products } = this.state
    const {
      searchQuery,
      loading,
      priceLowestBound,
      priceHighestBound,
      countries,
      country,
      sort_attribute,
      sort_order
    } = this.state

    return (
      <>
        <div className="content--wrapper">
          <section className="section flex flex--centered">
            <h2>Sprocket API Demo</h2>
          </section>
          <section className="section section--xs flex flex--centered bg--light">
            <Form layout="inline">
              <FormGroup className="mb--0">
                {/* <ControlLabel>Search Products</ControlLabel> */}
                <FormControl
                  placeholder="Search Products, title, price, country etc"
                  name="searchQuery"
                  value={searchQuery}
                  onChange={(value) => this.handleInputChange('searchQuery', value)}
                />
              </FormGroup>
              <Button type="submit" appearance="primary" className="mb--0" onClick={this.handleSearchButtonClick}>Search</Button>
            </Form>
          </section>
          <section className="section section--sm">
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item componentClass={Col} colspan={24} md={22}>
                <FlexboxGrid justify="space-between">
                  <FlexboxGrid.Item className="mb--2" componentClass={Col} colspan={24} xs={5}>
                    <div className="mb--1">
                      <h6 className="mb--05">
                        <small>Filter By</small>
                      </h6>
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
                          <Button block type="submit" appearance="primary" className="mb--0" onClick={this.filterProducts}>Go</Button>
                        </div>
                      </div>
                      <div className="mb--1">
                      <h6 className="mb--1">Countries</h6>
                      <div>
                        <SelectPicker
                          data={countries}
                          appearance="default"
                          placeholder="Select Country"
                          value={country}
                          style={{ width: '100%' }}
                          onChange={(value) => this.handleInputChange('country', value, true)}
                        />
                      </div>
                    </div>
                    </div>
                    <Divider />
                    <div className="mb--1">
                      <h6 className="mb--05">
                        <small>Sort</small>
                      </h6>
                      <div className="mb--1">
                        <h6 className="mb--1">Sort By</h6>
                        <div>
                          <InputPicker
                            data={sortByOptions}
                            placeholder="Sort By"
                            style={{ width: '100%' }}
                            value={sort_attribute}
                            onChange={(value) => this.handleInputChange('sort_attribute', value, true)}
                          />
                        </div>
                      </div>
                      <div className="mb--1">
                        <h6 className="mb--1">Sort Order</h6>
                        <div>
                          <InputPicker
                            data={sortOrderOptions}
                            placeholder="Sort Order"
                            style={{ width: '100%' }}
                            value={sort_order}
                            onChange={(value) => this.handleInputChange('sort_order', value, true)}
                          />
                        </div>
                      </div>
                    </div>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item componentClass={Col} colspan={24} xs={18}>
                    <h3 className="align--center mb--2">Products List</h3>
                    <div className="align--center mb--1">
                      result : <b>{products.length} products</b> | search : <b>{searchQuery}</b> | price range : <b>{priceLowestBound},{priceHighestBound}</b> | country : <b>{country}</b> | sort by : <b>{sort_attribute}</b> | sort order : <b>{sort_order}</b>
                    </div>
                    {loading
                      ? (
                        <div className="align--center">
                          <Loader size="md" content="Loading Products ..." />
                        </div>
                      )
                      : (
                          <Products products={products} />
                        )
                      }
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </section>
        </div>
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
