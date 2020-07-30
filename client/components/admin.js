import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminConsole extends Component{
  constructor(){
    super()
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
          <h1>Welcome to the Admin Console!</h1>
          <h3>Please select the element you would like to modify:</h3>
          <Link to="/admin/categories" >Categories</Link>
          <Link to="/admin/Products" >Products</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  // getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminConsole);