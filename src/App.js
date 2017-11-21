
import React, { Component } from 'react';
import { Text,  View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

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
    return (
      <Provider store={createStore(reducers)} >
        <LoginForm />        
      </Provider>
    );
  }
}
