/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
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

  const [sortBy, setSortBy] = useState('');

  const showProductsList = () => {
    return products.length
      ? products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))
      : <p>Error fetching products</p>
  }

  const handleSort = async (e) => {
    setSortBy(e.target.value)
    products = await sortProducts(e.target.value);
  }

  return (
    <Flex
      width='100vw'
      minHeight='75vh'
      justify='center'
      align='center'
      direction='column'
    >
      <Stack
        bg="#2D3748"
        p='1.5em 2em'
        align='center'
      >
        <label>
          Sort By:
          <select onChange={handleSort} value={sortBy} style={{ color: 'black' }}>
            <option value=''>-- Select --</option>
            <option value='Price High to Low'>Price High to Low</option>
            <option value='Price Low to High'>Price Low to High</option>
            <option value='Name A to Z'>Name A to Z</option>
            <option value='Name Z to A'>Name Z to A</option>
          </select>
        </label>
        <div className='productList'>
          {
            loading ? <Loading /> : showProductsList()
          }
        </div>
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
