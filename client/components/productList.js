/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex, Stack } from '@chakra-ui/core';
import Loading from './loading';
import ProductCard from './productCard';
import { getProductsThunk, sortProductsThunk } from '../store/productThunks';

const ProductList = ({ loading, products, getProducts, sortProducts }) => {
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

  const handleSort = async (e)=> {
    products = await sortProducts(e.target.value);
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
        <label>
          Sort By: 
          <select onChange={handleSort}>
            <option>-- Select --</option>
            <option>Price High to Low</option>
            <option>Price Low to High</option>
            <option>Name A to Z</option>
            <option>Name Z to A</option>
          </select>
        </label>
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
  sortProducts: (type) => dispatch(sortProductsThunk(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
