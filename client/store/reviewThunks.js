import axios from 'axios'
import { reviewTypes } from './actions'
import { loaded, loading } from './actionCreators'

const createReview = ({ productId, starRating, reviewTitle, reviewText }) => {

  return {
    type: reviewTypes.CREATE_REVIEW,
    payload: {
      id: null,
      userId: null,
      productId: productId,
      starRating: starRating,
      reviewTitle: newTitle,
      reviewText: reviewText,
    }
  }
}


export const createReviewThunk = (productId, starRating, reviewTitle, reviewText) => {
  console.log('createReviewThunk has been called')
  return (dispatch) => {
    dispatch(loading())
    return axios.post('/reviews', { productId, starRating, reviewTitle, reviewText })
      .then(({ data }) => {
        dispatch(createReview(data))
        dispatch(loaded())
      })
      .catch((e) => {
        console.log('failed to load reviews')
        console.log(e)
      })
  }
}



