import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Button, Flex, useToast, Input, Image, } from '@chakra-ui/core';
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
      width='300px'
      direction='column'
      align='center'
      justify='space-between'
      margin='2em'
      bg='#4A5568'
      p='1em'
    >
      <Image
        src={product.imgSrcSm}
        alt={product.name}
        height='200px'
        width='200px'
        m='1em'
      />
      <Flex
        direction='column'
        justify='space-between'
        height='150px'
        width='100%'
      >
        <Heading as="h3" size="md" isTruncated>
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </Heading>
        <Flex
          align='center'
          justify='center'
          m='1em'
        >
          <Heading as='h4' size='md' mr='1em'>
            ${+product.price * +quantity}
          </Heading>
          <Input
            size='sm'
            width='3em'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            color='black'
          />
        </Flex>
        <Flex justify='center'>
          <Button
            variantColor="green"
            size="md"
            onClick={(e) => handleAddToCart(e, product.id, quantity)}
          >
            Add to Cart
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId, quantity = 1) => dispatch(addToCartThunk(productId, quantity)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
