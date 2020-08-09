import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import ProductCard from '../productCard'



class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: null
    }
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    axios.get(`/api/products/${id}`)
      .then(({ data }) => {
        this.setState({ product: data })
      })
      .catch(console.log)
  }

  render() {
    const { product } = this.state
    return (
      <>
        {
          product && <ProductCard product={product} />
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
};



export default connect(mapStateToProps)(SingleProduct)