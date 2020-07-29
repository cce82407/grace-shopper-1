import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Stack, Heading, Flex, Button } from '@chakra-ui/core';
import { getCartThunk, removeFromCartThunk } from '../store/actionCreators';

const Cart = ({ cart, getCart, remove }) => {
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <Stack spacing={4}>
        {
          !!cart.products && cart.products.map((product) => (
            <Flex
              key={product.id}
              align="center"
              justify="flex-start"
              direction="column"
            >
              <Heading as="h3" size="md">
                {product.name}
              </Heading>
              <Heading as="h2" size="sm">
                ${product.price} Qty: {product.productCart.quantity}
              </Heading>
              <p>
                Total: {product.price * product.productCart.quantity}
              </p>
              <Button
                variantColor='red'
                size='xs'
                onClick={() => remove(product.id)}
              >
                Remove
              </Button>
            </Flex>
          ))
        }
      </Stack>
      <p>Total: {cart.total}</p>
    </div>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCartThunk()),
  remove: (id) => dispatch(removeFromCartThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
