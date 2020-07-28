import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav>
        <Link to='/products'>Shop By Category</Link>
        {'  '}
        <Link to='/musicians'>Rent a Musician</Link>
      </nav>
    </div>
  );
};

export default NavBar;
