import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductsThunk } from '../../store/productThunks'
import { Link } from 'react-router-dom'

class SingleCategory extends Component {
  async componentDidMount() {
    await this.props.getProducts()
  }

  render() {
    const { match: { params: { name, id } }, products } = this.props
    return (
      <>
        <h1>{name.toUpperCase()}</h1><br />
        <div>
          {products.filter(product => product.categoryId === id).map(cProduct => (
            <div key={cProduct.id} className='box'>
              <Link to={`products/${cProduct.name}`}>{cProduct.name}</Link>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
};

const mapDispatchToProps = (dispatch) => {
  return { getProducts: () => dispatch(getProductsThunk()) }
};


export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)