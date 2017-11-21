# manager
* React Native with Redux app
* Part of [The Complete React Native and Redux Course](https://www.udemy.com/the-complete-react-native-and-redux-course/)
by [Stephen Grider](https://github.com/stephengrider)


## Dev Tools
### Node, NPM, Yarn, Atom, Genymotion
### react-native, redux, react-redux

&nbsp;
## 00 Initialize the *manager* app

* Initialize a new project for the application with the react-native cli.

```
$ react native init manager
```

* Install Redux and react-redux

```
$  npm install --save redux react-redux

```


&nbsp;
## 01 Basic react native with redux boilerplate

* Create the src folder, move App.js in it and edit index.js in order to find the new location of App.js.

*./index.js*

```
import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('manager', () => App);
```
* Create the reducers folder inside src. Create index.js inside reducers and inside combineReducers add a default reducer that returns an empty list.

*./src/reducers/index.js*

```
import { combineReducers } from 'redux';

export default combineReducers({
  defaultReducer: () => [];
});
```

* Remove the default content out of App.js and replace it with the following basic boilerplate code for a react native with redux app.

*./src/App.js*
```
import React, { Component } from 'react';
import { Text,  View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={createStore(reducers)} >
        <View>
          <Text>
            React Native with Redux app basic boilerplate
          </Text>
        </View>
      </Provider>
    );
  }
}
```


&nbsp;
## 02 Firebase setup

* Install firebase.
```
$ npm install --save firebase
```

* Create a new project in https://console.firebase.google.com/. In develop, authentication, configure sign-in method by enabling the e-mail/password option. Copy the initialization code from the modal that pops up by clicking on the *web setup* link and paste it inside the componentWillMount lifecycle method definition inside App.js, after importing the firebase library.

```
```

```
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
```

&nbsp;
## 03 Login form

* Get a copy of the common components in the src/components folder.

* Create LoginForm.js in the components folder. It returns a Card component. It contains three CardSections. The firsttwo are the inputs for the login and password and the third one is the button.

*./src/components/LoginForm.js*
```
import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
  render() {
    return (
      <Card>

        <CardSection>
          <Input
            label="Email"
            placeholder="yourmail@example.com"
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
          />
        </CardSection>

        <CardSection>
          <Button>
            Login
          </Button>
        </CardSection>

      </Card>
    );
  }
}

export default LoginForm;
```

* Import LoginForm in App and render it.

```
import LoginForm from './components/LoginForm';
```
```
  render() {
    return (
      <Provider store={createStore(reducers)} >
        <LoginForm />        
      </Provider>
    );
  }
