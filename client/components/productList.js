import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex, Stack } from '@chakra-ui/core';
import Loading from './loading';
import ProductCard from './productCard';
import { getProductsThunk } from '../store/productThunks';

const ProductList = ({ loading, products, getProducts }) => {
  // this works like componentDidMount
  useEffect(() => {
    getProducts();
  }, []);

  const showProductsList = () => {
    return products.length
      ? products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))
      : <p>Error fetching products</p>
  }
  return (
    <Flex
      width='100vw'
      minHeight='75vh'
      justify='center'
      align='center'
    >
      <Stack
        bg="#2D3748"
        p='1.5em 2em'
      >
        {
          loading ? <Loading /> : showProductsList()
        }
      </Stack>
    </Flex>
  );
};

const mapStateToProps = ({ loading, products }) => ({ loading, products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
