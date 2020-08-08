import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Stack, Heading, Button, Flex, Text, useToast, Input, Image } from '@chakra-ui/core';
import { addToCartThunk } from '../store/cartActions';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const toast = useToast();
  const handleAddToCart = (e, productId, qty) => {
    e.preventDefault();
    addToCart(productId, qty);
    toast({
      title: `${product.name}`,
      description: "added to cart",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: 'bottom'
    })
  };
  return (
    <Flex
      minW='lg'
      maxW='xl'
      direction='Row'
      align='center'
      justify='space-between'
      margin='0.5em 0'
    >
      <Image
        src={product.imgSrcSm}
        alt={product.name}
        height='100px'
        width='100px'
        marginRight='1em'
      />
      <Stack spacing="1">
        <Heading as="h2" size="lg">
          {product.name}
        </Heading>
        <Flex
          align='center'
          justify='flex-end'
        >
          <Text mr='1em'>
            ${+product.price * +quantity}
          </Text>
          <Input
            size='sm'
            width='3em'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            color='black'
            mr='1em'
          />
          <Button
            variantColor="green"
            size="xs"
            onClick={(e) => handleAddToCart(e, product.id, quantity)}
          >
            Add to Cart
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId, quantity = 1) => dispatch(addToCartThunk(productId, quantity)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
