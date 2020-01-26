// Helpers
export const calculateLowestPriceBound = products => {
  if (products.length < 1) return 0

  const productWithLowestPrice = products.reduce((prev, current) => {
    return (prev.price > current.price) ? prev : current
  })

  return productWithLowestPrice.price
}

export const calculateHighestPriceBound = products => {
  if (products.length < 1) return 0

  const productWithHighestPrice = products.reduce((prev, current) => {
    return (prev.price < current.price) ? prev : current
  })

  return productWithHighestPrice.price
}

export const getAllTags = (products, mapped = true) => {
  if (products.length < 1) return []

  let allTags = products.reduce((prev, current) => {
    return prev.concat(current.tags)
  }, [])

  // return only unique values
  allTags = Array.from(new Set(allTags))

  // sort in ascending order
  allTags = allTags.sort()

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

export const getAllCountries = (products, mapped = true) => {
  if (products.length < 1) return []

  let allCountries = products.reduce((prev, current) => {
    return prev.concat(current.country)
  }, [])

  // return only unique values
  allCountries = Array.from(new Set(allCountries))

  // sort in ascending order
  allCountries = allCountries.sort()

  if (mapped) {
    allCountries = allCountries.map(country => {
      return {
        label: country,
        value: country
      }
    })
  }

  return allCountries
}
