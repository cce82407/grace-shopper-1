import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesThunk } from '../../store/actionCreators'



class SingleCategory extends Component {

  render() {
    const { match: { params: { name } } } = this.props
    return (
      <>
        <h1>{name}</h1>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)