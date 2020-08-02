import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductsThunk } from '../../store/productThunks'


class SingleCategory extends Component {
  async componentDidMount() {
    await this.props.getProducts()
  }

  render() {
    const { match: { params: { name } }, products, categories } = this.props
    return (
      <>
        <h1>{name.toUpperCase()}</h1><br />
        <div>
          {products.filter(product => product.categoryId === (categories.find(category => category.name === name)).id).map(cProduct => (
            <div key={cProduct.id} className='box'>
              <Link to={`${name}/${cProduct.name}`}>{cProduct.name}</Link>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products, categories: state.categories }
};

const mapDispatchToProps = (dispatch) => {
  return { getProducts: () => dispatch(getProductsThunk()) }
};


export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)