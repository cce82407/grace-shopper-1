/* eslint-disable no-alert */
/* eslint-disable no-lonely-if */
import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import axios from 'axios';
import CardSection from './cardSelection';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    await axios.get(`/checkout/secret/${window.location.pathname.slice(10)}`)
      .then(async(data)=>{
        const result = await stripe.confirmCardPayment(`${data.data.client_secret}`, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Jenny Rosen',
            },
          }
        });

        if (result.error) {
          alert('insufficient funds')
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            window.location.pathname='/success';
          }
        }


      })

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe} type='submit' className='button is-danger'>Confirm order</button>
    </form>
  );
}

export default connect(null, null)(CheckoutForm);