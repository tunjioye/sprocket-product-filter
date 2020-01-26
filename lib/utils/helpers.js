// Helpers
export const calculateLowestPriceBound = products => {
  const productWithLowestPrice = products.reduce((prev, current) => {
    return (prev.price > current.price) ? prev : current
  })

  return productWithLowestPrice.price
}

export const calculateHighestPriceBound = products => {
  const productWithHighestPrice = products.reduce((prev, current) => {
    return (prev.price < current.price) ? prev : current
  })

  return productWithHighestPrice.price
}

export const getAllTags = (products, mapped = true) => {
  let allTags = products.reduce((prev, current) => {
    return prev.concat(current.tags)
  }, [])

  if (mapped) {
    allTags = allTags.map(tag => {
      return {
        label: tag,
        value: tag
      }
    })
  }

  return allTags
}
