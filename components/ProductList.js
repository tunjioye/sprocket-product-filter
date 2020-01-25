import { useSelector } from 'react-redux'
import {
  List,
  FlexboxGrid
} from 'rsuite'

const ProductList = props => {
  const {
    product = {},
    productIndex
  } = props
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

export default ProductList
