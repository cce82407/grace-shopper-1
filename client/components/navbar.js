import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@chakra-ui/core';
import Categories from './categories';
import { whoami } from '../store/userActions';

const NavBar = ({ whoAmI, user }) => {
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    whoAmI();
    const productsDrop = document.getElementById('productsDrop');
    const dropDown = document.getElementById('dropDown');
    const svg = productsDrop.querySelector('svg');

    productsDrop.addEventListener('mouseenter', () => {
      dropDown.classList.add('showMenu');
      svg.classList.add('rotate');
    });
    productsDrop.addEventListener('mouseleave', () => {
      dropDown.classList.remove('showMenu');
      svg.classList.remove('rotate');
    });
  }, []);

  useEffect(() => {
    if (user.role === 'admin') {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [user]);

  return (
    <div>
      <nav className="" role="navigation" aria-label="main navigation">
        <div className='navLogo'>
          <Link to="/">Grace&apos;s Hopper</Link>
        </div>
        <div className='dropContainer' id='productsDrop'>
          <Link to="/products" className='navLink'>Products <Icon name='chevron-down' /></Link>
          <div className='dropDown' id='dropDown'>
            <Categories />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {
            isAdmin &&
            <Link to="/admin" className='navLink'>Admin</Link>
          }
          <Link to="/shopping-cart" className='navLink'>Cart</Link>
          <Link to="/login" className='navLink'>{user.username ? 'Log Out' : 'Login'}</Link>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
