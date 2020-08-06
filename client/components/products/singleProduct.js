import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import ProductCard from '../productCard'



class SingleProduct extends Component {

  componentDidMount() {
    const div = document.getElementById('something')
    axios.get('/image').then(({ data }) => { div.innerHTML = data })
  }

  render() {
    const { match: { params: { name } }, products } = this.props
    const currentProduct = products.find(product => product.name === name)
    return (
      <>
        <ProductCard product={currentProduct} />
        <div id='something' />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
};



export default connect(mapStateToProps)(SingleProduct)