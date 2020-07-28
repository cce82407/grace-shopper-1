import React from 'react';

const Categories = (categories) => {
  return (
    <>
      <div>Categories</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
