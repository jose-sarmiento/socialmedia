const mongoose = require('mongoose');

const paginate = (model, specificOnly = false) => {
   return async (req, res, next) => {
      const { sort, limit, page } = req.query;
      let query;
      if (specificOnly) {
         const userId = req.params.userId;
         query = {
            author: {
               $eq: mongoose.Types.ObjectId(userId ? userId : req.user._id),
            },
         };
      } else {
         query = { author: { $ne: mongoose.Types.ObjectId(req.user._id) } };
      }
      const pageNumber = Number(page) || 1;
      const pageSize = Number(limit) || 25;
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = pageNumber * pageSize;
      const response = {};

      //sorting
      let result = model.find(query);
      if (sort) {
         const sortFormatted = sort.split(',').join(' ');
         result = result.sort(sortFormatted);
      } else {
         result = result.sort('createdAt');
      }

      // pagination
      if (page) result = result.skip(startIndex);
      if (limit) result = result.limit(pageSize);

      response.docs = await result
         .sort({ createdAt: -1 })
         .populate('author', 'firstname lastname username profileImage')
         .populate({
            path : 'sharedPost',
            populate : {
                path : 'author',
                select: 'firstname lastname username profileImage'
            }
          });
      response.nbDocs = response.docs.length;

      if (endIndex < (await model.countDocuments().exec())) {
         response.next = {
            page: pageNumber + 1,
            limit: pageSize,
         };
      }

      if (startIndex > 0) {
         response.previous = {
            page: pageNumber - 1,
            limit: pageSize,
         };
      }
      res.paginatedResults = response;

      next();
   };
};

module.exports = paginate;
