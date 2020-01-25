import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  List,
  FlexboxGrid,
  Col
} from 'rsuite'
import data from '../data'

class IndexPage extends React.Component {
  static getInitialProps () {
    return {
      products: data
    }
  }

  render() {
    const { products } = this.props
    const mappedProducts = products.map((product, productIndex) => {
      const {
        id,
        title,
        description,
        price,
        tags = [],
        country,
        created_at
      } = product

      return (
        <List.Item key={id} index={productIndex}>
          <FlexboxGrid>
            {/*title & description*/}
            <FlexboxGrid.Item colspan={8} style={{
              ...styleCenter,
              flexDirection: 'column',
              alignItems: 'flex-start',
              overflow: 'hidden'
            }}>
              <div style={titleStyle}>{title}</div>
              <div>
                <small>{description}</small>
              </div>
            </FlexboxGrid.Item>
            {/*price*/}
            <FlexboxGrid.Item colspan={4} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>Price</div>
                <div style={dataStyle}>{price}</div>
              </div>
            </FlexboxGrid.Item>
            {/*tags*/}
            <FlexboxGrid.Item colspan={4} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>Tags</div>
                <div style={dataStyle}>
                  <small>{tags.join(' |')}</small>
                </div>
              </div>
            </FlexboxGrid.Item>
            {/*country*/}
            <FlexboxGrid.Item colspan={4} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>Country</div>
                <div style={dataStyle}>
                  <small>{country}</small>
                </div>
              </div>
            </FlexboxGrid.Item>
            {/*created_at*/}
            <FlexboxGrid.Item colspan={4} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>Created</div>
                <div style={dataStyle}>
                  <small>{created_at}</small>
                </div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      )
    })

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

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
}

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
}

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 500
}

const dataStyle = {
  fontSize: '1.2em',
  fontWeight: 500
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
