import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/loginForm';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <LoginForm />
        </Provider>
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app)