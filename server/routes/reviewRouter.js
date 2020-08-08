const { Router } = require('express');
const { Review } = require('../db/models')


const reviewRouter = Router()

reviewRouter.post('/', async (req, res) => {
  const { userId, productId, starRating, reviewTitle, reviewText } = req.body;
  const review = await Review.create({
    userId, productId, starRating, reviewTitle, reviewText
  });
  res.send(review);
});

module.exports = {
  url: '/reviews',
  router: reviewRouter
};