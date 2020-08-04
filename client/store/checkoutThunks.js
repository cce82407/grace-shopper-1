import axios from 'axios';
import stripe from 'stripe';

const response = axios.get('/checkout')
.then(({data}) => {
  stripe.redirectToCheckout(data.session_id)
});