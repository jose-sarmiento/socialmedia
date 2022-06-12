const mongoose = require('mongoose');

const paginate = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 2;
  const limit = parseInt(req.query.limit, 10) || 2;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  results.results = await model
    .find({
      _id: { $ne: mongoose.Types.ObjectId(req.user._id) },
    })
    .populate('author')
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.paginatedResults = results;
  next();
};

module.exports = paginate;
