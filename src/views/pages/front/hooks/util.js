//UTILS STARTS HERE
export const paginateArray = (array, itemsPerPage, currentPage) => {
  //console.log('Input parameters:', { array, itemsPerPage, currentPage })

  if (!Array.isArray(array)) return []

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return array.slice(startIndex, endIndex)
}


// ** Returns sorted array
export const sortCompare = (key) => (a, b) => {
  const fieldA = key === "price" ? parseFloat(a[key]) : a[key]
  const fieldB = key === "price" ? parseFloat(b[key]) : b[key]

  let comparison = 0
  if (fieldA > fieldB) {
    comparison = 1
  } else if (fieldA < fieldB) {
    comparison = -1
  }
  return comparison
}


// ** Returns number range
export const getRandomInt = (min, max) => {
  if (min > max) {
    const temp = max
    /* eslint-disable no-param-reassign */
    max = min
    min = temp
    /* eslint-enable */
  }

  if (min <= 0) {
    return Math.floor(Math.random() * (max + Math.abs(min) + 1)) + min
  }
  return Math.floor(Math.random() * max) + min
}

// ** Returns random date
export const randomDate = (start, end) => {
  const diff = end.getTime() - start.getTime()
  const newDiff = diff * Math.random()
  const date = new Date(start.getTime() + newDiff)
  return date
}


export const getSortBy = (sortBy) => {
  let sortDesc = false
  const sortByKey = (() => {
    if (sortBy === "price-desc") {
      sortDesc = true
      return "price"
    }
    if (sortBy === "price-asc") {
      return "price"
    }
    sortDesc = true
    return "id"
  })()

  return { sortByKey, sortDesc }
}
