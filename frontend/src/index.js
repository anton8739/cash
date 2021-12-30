import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import {Provider} from "react-redux";
import {store} from './redux/store'

console.log(process.env.REACT_APP_APPOLO_CLIENT_URL)
const client = new ApolloClient({
    uri: process.env.REACT_APP_APPOLO_CLIENT_URL,
    cache: new InMemoryCache()
})
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <ApolloProvider client={client}>
    <App />
      </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
