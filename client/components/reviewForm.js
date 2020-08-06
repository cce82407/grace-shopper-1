import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductsThunk } from '../store/productThunks'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: '',
      starRating: 0,
      reviewTitle: '',
      reviewText: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()
  }

  handleInputChange({ target }) {
    const { value, name } = target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { products } = this.props
    return (
      <>
        <div id='reviewForm'>
          <div style={{ fontSize: '3rem' }}>Write a Product Review</div>
          <h1>Choose a Product</h1>
          <form>
            <select
              name="product"
              className='reviewForm'
              value={this.state.product}
              onChange={this.handleInputChange}
            >
              <option hidden>--Select A Product--</option>
              {products.map((product) => (
                <option className='reviewForm' key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label htmlFor='rating'>Overall Rating <br />
              <input id='rating' className='reviewForm' name='starRating' type='number' min='0' max='5' step='1' value={this.state.starRating} onChange={this.handleInputChange} />
            </label>
            <br />
            <br />
            <label htmlFor='title'>Review Title <br />
              <input id='title' className='reviewForm' name='reviewTitle' type='text' value={this.state.reviewTitle} onChange={this.handleInputChange} placeholder='Title of your review' />
            </label>
            <br />
            <br />
            <label htmlFor='text'>Review Text <br />
              <textarea id='text' className='reviewForm' rows='4' cols='50' name='reviewText' type='text' value={this.state.reviewText} onChange={this.handleInputChange} placeholder='What did you like or dislike about the product? ' />
            </label>
            <br />
            <br />
            <input className='reviewForm' type='submit' value='Submit Review' />
          </form>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)

/**
 * Amazon Structure:
 * Create Review (Title)
 * Image and name of Product
 * Overall Rating (stars)
 * Add a headline "whats most important to know"
 * Write your review "what did you like or dislike?" What did you use this product for?
 */