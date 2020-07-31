import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { loginThunk } from '../store/userActions';

const Login = ({ login, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .catch((err) => {
        toast({
          title: "Login Failed",
          description: "Please enter a valid username and password.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  return (
    <form className='form'>
      <label
        htmlFor='username'
        className='label'
      >
        Username:
        <input
          type="text"
          value={username}
          id="username"
          placeholder="rebelalliance"
          onChange={
            (e) => setUsername(e.target.value)
          }
          className='input'
        />
      </label>
      <label
        htmlFor='username'
        className='label'
      >
        Password:
        <input
          type="password"
          value={password}
          id="password"
          placeholder="usetheforce"
          required
          onChange={
            (e) => setPassword(e.target.value)
          }
          className='input'
        />
      </label>
      <Button
        type="submit"
        onClick={handleSubmit}
        size='lg'
        variantColor='green'
      >
        Login
      </Button>
      <p>{user && user.message}</p>
    </form>
  );
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginThunk(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
