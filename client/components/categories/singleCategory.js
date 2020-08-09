import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductsThunk } from '../../store/productThunks'
import { getCategoriesThunk } from '../../store/actionCreators';


class SingleCategory extends Component {
  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getCategories()
  }

  render() {
    const { match: { params: { name } }, products, categories } = this.props
    return (
      <>
        <h1>{name.toUpperCase()}</h1><br />
        <div>
          {
            !!products.length && !!categories.length &&
            products.filter(product => product.categoryId === (categories.find(category => category.name === name)).id)
              .map(cProduct => (
                <div key={cProduct.id} className='box'>
                  <Link to={`/products/${cProduct.id}`}>{cProduct.name}</Link>
                </div>
              ))
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.products, categories: state.categories }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProductsThunk()),
    getCategories: () => dispatch(getCategoriesThunk()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)