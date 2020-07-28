import { LOGIN, LOGOUT, LOGIN_FAIL, LOADED, LOADING, GET_PRODUCTS, ADD_TO_CART, types, GET_CART } from './actions';
import axios from 'axios';

const login = (username) => {
    return {
        type: LOGIN,
        username
    }
}
const logout = () => {
    return {
        type: LOGOUT
    }
}

const loginFail = (message) => {
    return {
        type: LOGIN_FAIL,
        message
    }
}

export const loading = () => {
    return {
        type: LOADING
    }
}

export const loaded = () => {
    return {
        type: LOADED
    }
}

const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

const addToCart = (cart) => {
    return {
        type: ADD_TO_CART,
        cart
    }
}

const getCart = (cart) => {
    return {
        type: GET_CART,
        cart
    }
}

export const loginThunk = (username, password) => {
    return (dispatch) => {
        dispatch(loading());
        return axios.post('/user/login', { username, password })
            .then((res) => {
                console.log(res.data)
                dispatch(login(username));
                dispatch(loaded());
            })
            .catch((res) => {
                dispatch(loginFail('Incorrect username or password'));
                dispatch(loaded());
            })
    }
}
export const whoami = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/user/whoami')
            .then(({ data }) => {
                if (data.loggedIn) {
                    dispatch(login(data.username));
                } else {
                    dispatch(logout())
                }
                dispatch(loaded());
            })
    }
}

export const logoutThunk = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/user/logout')
            .then(() => {
                dispatch(logout());
                dispatch(loaded());
            })
            .catch((e) => {
                dispatch(loaded());
                console.log(e)
            })
    }
}

export const getProductsThunk = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/api/products')
            .then(({ data }) => {
                dispatch(getProducts(data));
                dispatch(loaded());
            })
            .catch((e) => {
                console.error(e);
                dispatch(loaded());
                return 'Error fetching products'
            })
    }
}

export const addProductThunk = (obj) => async (dispatch) => {
    return axios.post('/api/products', {
        price: obj.price,
        name: obj.name,
        description: obj.description,
        categoryId: obj.categoryId
    })
        .then(() => axios.get('/api/products'))
        .then((res) => {
            dispatch({
                type: types.ADD_PRODUCT,
                payload: res.data.products
            })
        })
        .catch((e) => {
            console.log(e);
        })
}

export const addCategoryThunk = (obj) => async (dispatch) => {
    return axios.post('/api/category', {
        name: obj.name,
    })
        .then(() => axios.get('/api/category'))
        .then((res) => {
            dispatch({
                type: types.ADD_CATEGORY,
                payload: res.data.categories
            })
        })
        .catch((e) => {
            console.log(e);
        })
}

export const addToCartThunk = (productId, quantity) => {
    return (dispatch) => {
        dispatch(loading())
        return axios.post(`/cart/add/${productId}?quantity=${quantity}`)
            .then(({ data }) => {
                dispatch(addToCart(data));
                dispatch(loaded());
            })
    }
}

export const getCartThunk = () => {
    return (dispatch) => {
        dispatch(loading());
        return axios.get('/cart/get')
            .then(({ data }) => {
                dispatch(getCart(data));
                dispatch(loaded());
            })
    }
}
