import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Flex, Image, Heading, Button, Input, useToast, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import { addToCartThunk } from '../../store/cartActions'

const ProductPage = ({ product, addToCart, categories }) => {
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

  const categoryName = categories.find(c => c.id === product.categoryId).name;

  return (
    <div>
      <Breadcrumb
        style={{
          color: 'white',
          backgroundColor: '#1a202c'
        }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/categories/${categoryName}`}>{categoryName}</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        justify='center'
        m='2em'
        wrap='wrap'
      >
        <Flex m='1em'>
          <Image
            src={product.imgSrcLg}
            w='400px'
            h='400px'
          />
        </Flex>
        <Flex
          w='400px'
          bg='#2D3748'
          m='1em'
          direction='column'
          justifyContent='space-between'
          p='1em'
        >
          <Heading
            as='h2'
            size='lg'
            className='heading'
            textAlign='center'
            marginBottom='1em'
          >
            {product.name}
          </Heading>
          <p>
            {product.description}
          </p>
          <Flex
            justify='space-between'
            align='center'
          >
            <Flex
              align='center'
              justify='center'
              m='1em'
            >
              <Heading as='h4' size='lg' mr='1em'>
                ${+product.price}
              </Heading>
            </Flex>
            <Flex
              justify='center'
              align='center'
            >
              <Input
                size='sm'
                width='3em'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                color='black'
                placeholder='1'
                m='1em'
              />
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
      </Flex>
    </div>
  );
}

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId, quantity = 1) => dispatch(addToCartThunk(productId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);