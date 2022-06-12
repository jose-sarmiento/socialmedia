
const paginate = (model) => async (req, res, next) => {
  const { sort, limit, page } = req.query
  const query = { _id: req.user._id }
  const pageNumber = Number(page) || 1
  const pageSize = Number(limit) || 25
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = pageNumber * pageSize
  const response = {}

  // sorting
  let result = model.find(query)
  if (sort) {
    const sortFormatted = sort.split(',').join(' ')
    result = result.sort(sortFormatted)
  } else {
    result = result.sort('createdAt')
  }

  // pagination
  if (page) {
    result = result.skip(startIndex)
  }
  if (limit) {
    result = result.limit(pageSize)
  }

  response.docs = await result
  response.nbDocs = response.docs.length

  if (endIndex < await model.countDocuments().exec()) {
    response.next = {
      page: pageNumber + 1,
      limit: pageSize
    }
  }

  if (startIndex > 0) {
    response.previous = {
      page: pageNumber - 1,
      limit: pageSize
    }
  }
  res.paginatedResults = response

  next()

}

module.exports = paginate
