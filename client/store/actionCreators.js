import axios from 'axios';
import {
  loadingTypes,
  types
} from './actions';

export const loading = () => ({
  type: loadingTypes.LOADING,
});

export const loaded = () => ({
  type: loadingTypes.LOADED,
});

const getCategories = (categories) => ({
  type: types.GET_CATEGORIES,
  payload: categories,
});



export const getCategoriesThunk = () => (dispatch) => {
  dispatch(loading());
  return axios
    .get('/api/categories')
    .then(({ data }) => {
      dispatch(getCategories(data));
      dispatch(loaded());
    })
    .catch((e) => {
      console.error(e);
      dispatch(loaded());
      return 'Error fetching categories';
    });
};

export const addCategoryThunk = (obj) => (dispatch) => axios
  .post('/api/category', {
    name: obj.name,
  })
  .then((res) => {
    dispatch({
      type: types.ADD_CATEGORY,
      payload: res.data.categories,
    });
  })
  .catch((e) => {
    console.log(e);
  });

