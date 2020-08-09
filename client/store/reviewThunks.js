import axios from 'axios'
import { reviewTypes } from './actions'
import { loaded, loading } from './actionCreators'

const createReview = ({ id, userId, productId, starRating, reviewTitle, reviewText }) => {

  return {
    type: reviewTypes.CREATE_REVIEW,
    payload: {
      id,
      userId,
      productId,
      starRating,
      reviewTitle,
      reviewText,
    }
  }
}


export const createReviewThunk = (productId, starRating, reviewTitle, reviewText) => {
  console.log('createReviewThunk has been called')
  return (dispatch) => {
    dispatch(loading())
    return axios.post('/api/reviews', { productId, starRating, reviewTitle, reviewText })
      .then(({ data }) => {
        dispatch(createReview(data))
        dispatch(loaded())
      })
      .catch(() => {
        dispatch(loaded())
      })
  }
}



