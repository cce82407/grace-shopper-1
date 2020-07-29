import React from 'react';
import { connect } from 'react-redux';

const Categories = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      {
        categories && <p>TODO: edit categories page</p>
      }
    </div>
  )
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Categories);
