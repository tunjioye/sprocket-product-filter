import React from 'react'
import {
  Pagination
} from 'rsuite'

const PaginationCode = props => {
  const {
    productsTotal,
    limit,
    currentPage,
    handleInputChange
  } = props

  return (
    <>
      {productsTotal > 0 &&
        <div className="align--center mb--1">
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            pages={parseInt(productsTotal/limit)}
            maxButtons={5}
            activePage={currentPage}
            onSelect={(value) => handleInputChange('currentPage', value, true)}
          />
        </div>
      }
    </>
  )
}

export default PaginationCode
