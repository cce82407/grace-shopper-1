import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProductCard } from '../productCard'

class SingleProduct extends Component {

  render() {

    const { match: { params: { name } }, products } = this.props
    const product = products.find(product => product.name === name)
    return (
      <>
        <ProductCard product={product} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
};



export default connect(mapStateToProps)(SingleProduct)