const { Router } = require('express');
const { Review } = require('../db/models')


const reviewRouter = Router()

reviewRouter.post('/reviews', async (req, res) => {
  const { productId, starRating, reviewTitle, reviewText } = req.body;
  const userId = req.user.id
  const review = await Review.create({
    userId, productId, starRating, reviewTitle, reviewText
  });
  res.send(review);
});

module.exports = {
  url: '/api',
  router: reviewRouter
};