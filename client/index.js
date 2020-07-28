import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ProductList, LoginForm, Cart, NavBar } from './components';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <CSSReset />
          <Route render={() => <NavBar />} />
          <Switch>
            <Route exact path='/' component={LoginForm} />
            <Route exact path='/' component={Cart} />
            <Route exact path='/products' component={ProductList} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
