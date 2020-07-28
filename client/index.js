import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ProductList, LoginForm } from './components';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={LoginForm} />
                    <Route path='/products' component={ProductList} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app)