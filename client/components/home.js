import React from 'react';
import { connect } from 'react-redux';

const Home = () => {
  return (
    <div>
      <h2>Welcome</h2>
    </div>
  )
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);