import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsThunk } from '../store/productThunks';
import AddProductForm from './addProductForm';


class AdminProducts extends Component {
  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <AddProductForm />
        <h1>Select the product you would like to edit.</h1>
        <div>
          {
          products.map(product => {
            return (
              <div key={product.id}>
                <Link to={`/product/${product.id}`} className='title tag is-white is-large'>{product.name}</Link>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);