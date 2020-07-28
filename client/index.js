import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ProductList, LoginForm, Cart } from './components';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <CSSReset />
                    <Route path='/' component={LoginForm} />
                    <Route path='/' component={Cart} />
                    <Route path='/' component={ProductList} />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app)