import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App.js';
import reducers from './reducers'

import axios from 'axios'
window.axios = axios; // to test backend route without loggin in

//create new instance of redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//Provider reads changes from redux store and informs
//child components about state change
ReactDOM.render(<Provider store = {store}><App/></Provider>, document.querySelector("#root"));

console.log(process.env.REACT_APP_STRIPE_KEY + process.env.NODE_ENV);