
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

export default class App extends Component<{}> {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDI9FS-W9_OKt0Nqc-8PE1uD_TMDstXB4Y",
      authDomain: "manager-589b0.firebaseapp.com",
      databaseURL: "https://manager-589b0.firebaseio.com",
      projectId: "manager-589b0",
      storageBucket: "manager-589b0.appspot.com",
      messagingSenderId: "839655804457"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store} >
        <LoginForm />
      </Provider>
    );
  }
}
