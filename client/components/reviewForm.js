import React, { Component } from 'react'
import { connect } from 'react-redux'
import StarRatings from 'react-star-ratings';
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
    this.changeRating = this.changeRating.bind(this)
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

  changeRating(newRating) {
    console.log(newRating)
    this.setState({
      starRating: newRating
    });
  }

  render() {
    const { products } = this.props
    return (
      <>
        <div id='reviewForm'>
          <div style={{ fontSize: '3rem' }}>Write a Product Review</div>
          <h1>Product</h1>
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
            <div>Star Rating</div><br />
            <StarRatings
              rating={this.state.starRating}
              starRatedColor="gold"
              starHoverColor="gold"
              starEmptyColor="gray"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starDimension='25px'
            />
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

const mapStateToProps = ({ products }) => ({ products })

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
