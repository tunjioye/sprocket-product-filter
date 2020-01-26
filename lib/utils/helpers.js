// Helpers
export const calculateLowestPriceBound = products => {
  return (products.length > 0)
    ? Math.min.apply(Math, products.map(product => product.price))
    : 0
}

export const calculateHighestPriceBound = products => {
  return (products.length > 0)
    ? Math.max.apply(Math, products.map(product => product.price))
    : 0
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

export const sortByOptions = [
  {
    label: 'newest',
    value: 'newest'
  },
  {
    label: 'relevance',
    value: 'relevance'
  },
  {
    label: 'title',
    value: 'title'
  },
  {
    label: 'price',
    value: 'price'
  },
  {
    label: 'country',
    value: 'country'
  }
]

export const sortOrderOptions = [
  {
    label: 'Ascending',
    value: 'asc'
  },
  {
    label: 'Descending',
    value: 'desc'
  }
]
