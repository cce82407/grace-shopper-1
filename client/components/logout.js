import React from 'react';
import { connect } from 'react-redux';
import { logoutThunk } from '../store/actionCreators';

const Logout = ({ user, logout }) => {
    return (
        <div>
            <h2>Welcome {user.username}!</h2>
            <button
                onClick={() => logout()}
            >
                Logout
            </button>
        </div>
    );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);