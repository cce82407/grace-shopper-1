import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CSSReset, } from '@chakra-ui/core';
import store from './store';
import {
  ProductList, LoginPage, CartPage, NavBar, Categories, Home, AdminConsole, AdminProducts, AdminCategories, EditProduct, SingleCategory, EditCategory, SingleProduct, ReviewForm
} from './components';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <CSSReset />
        <Route render={() => <NavBar />} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shopping-cart" component={CartPage} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/admin" component={AdminConsole} />
          <Route exact path="/categories/:name" component={SingleCategory} />
          <BrowserRouter
            basename='/admin'
          >
            <Route exact path="/categories" component={AdminCategories} />
            <Route exact path="/products" component={AdminProducts} />
            <Route exact path="/product/:id" component={EditProduct} />
            <Route exact path="/category/:id" component={EditCategory} />
            <Route exact path="/categories/:name/:name" component={SingleProduct} />
            <Route exact path="/review" component={ReviewForm} />
          </BrowserRouter>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
