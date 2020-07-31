import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCard from '../productCard'

class SingleCategory extends Component {

  render() {
    const { match: { params: { name, id } }, products } = this.props
    return (
      <>
        <h1>{name.toUpperCase()}</h1><br />
        <div>
          {products.filter(product => product.categoryId === id).map(cProduct => (
            <div key={cProduct.id}>
              <ProductCard product={cProduct} />
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


export default connect(mapStateToProps)(SingleCategory)