import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import Logout from './logout';
import Loading from './loading';
import { whoami } from '../store/actionCreators';

const LoginForm = ({ user, whoAmI, loading }) => {
  useEffect(() => {
    whoAmI();
  }, []);

  const showLoginOrLogout = () => {
    return user.username ? <Logout /> : <Login />;
  }
  return (
    <div className="box">
      {
        loading ? <Loading /> : showLoginOrLogout()
      }
    </div>
  );
};

const mapStateToProps = ({ user, loading }) => ({ user, loading });
const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
