# manager
* React Native with Redux app
* Part of [The Complete React Native and Redux Course](https://www.udemy.com/the-complete-react-native-and-redux-course/)
by [Stephen Grider](https://github.com/stephengrider)


### react-native, redux, react-redux, firebase, redux-thunk


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

* Create LoginForm.js in the components folder. It returns a Card component. It contains three CardSections. The first two contain the inputs for the login and password and the third one contains the login button.

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
```


&nbsp;
## 04 Handle email change

* Inside src, add the actions folder. Create types.js to hold the actions' type strings in order to help with avoiding typos. Then create index.js and implement the action creator for the email change.

*./src/actions/types.js*
```
export const EMAIL_CHANGED = 'email_changed';
```


*./src/actions/index.js*
```
import { EMAIL_CHANGED } from'./types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
}
```

* In LoginForm.js, add and implement the event handler for the email input form change events. The emailChanged event handler will call the action creator with the 'email_changed' type. First import the connect helper from react-redux and wire the export up with it.

```
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
```
```
class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
```
```
    <CardSection>
      <Input
        label="Email"
        placeholder="yourmail@example.com"
        onChangeText={this.onEmailChange.bind(this)}
      />
    </CardSection>
```
```
export default connect(mapStateToProps, {emailChanged})(LoginForm);
```

* Inside the reducers folder, add AuthReducer.js. It will contain an initial state of an empty string for email and the case for responding to the email changed action by producing state appropriately.

*.src/reducers/AuthReducer.js*
```
import { EMAIL_CHANGED } from'../actions/types';

const INITIAL_STATE = { email: '' };

export default (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
```


* In combineReducers, declare that the auth piece of state is produced by the AuthReducer.

*./src/reducers/index.js*
```
import { combineReducers } from 'redux';
import Authreducer from '.AuthReducer';

export default combineReducers({
  auth: AuthReducer
});
```

* In LoginForm.js, the mapStateToProps function can now be defined. It will be called with the global application state and return the email props which will take value of the auth.email, since auth is the key we assigned the AuthReducer value to in combineReducers and email is the key that pairs the piece of state produced by AuthReducer.

```
const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};
```

* The value in the email input is now the props email.
```
<CardSection>
  <Input
    label="Email"
    placeholder="yourmail@example.com"
    onChangeText={this.onEmailChange.bind(this)}
    value={this.props.email}
  />
</CardSection>
```



&nbsp;
## 05 Handle password change

* In ./src/actions/types.js.

```
export const PASSWORD_CHANGED = 'password_changed';
```

* In ./src/actions/index.js

```
import { PASSWORD_CHANGED } from'./types';

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
}
```

* In .src/reducers/AuthReducer.js

```
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED
 } from'../actions/types';

const INITIAL_STATE = {
  email: '',
  password: ''
 };
```
```
case PASSWORD_CHANGED:
  return { ...state, password: action.payload };
```


* In LoginForm.js, add and implement the event handler for the password input form change events.

```
import { emailChanged, passwordChanged } from '../actions';
```
```
onPasswordChange(text) {
  this.props.passwordChanged(text);
}
```
```
CardSection>
  <Input
    secureTextEntry
    label="Password"
    placeholder="password"
    onChangeText={this.onPasswordChange.bind(this)}
    value={this.props.password}
  />
</CardSection>
```
```
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password
  };
};

export default connect(mapStateToProps, {emailChanged, passwordChanged})(LoginForm);
```


&nbsp;
## 06 Async actions


* Install redux-thunk. [Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods *dispatch* and *getState* as parameters](https://github.com/gaearon/redux-thunk).

```
$ npm install --save redux-thunk
```


* In App.js, apply the redux-thunk middleware to the store creation definition.

```
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
```
```
render() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store} >
      <LoginForm />
    </Provider>
  );
}
```


* In ./src/actions/types.js.

```
export const LOGIN_USER_SUCCESS = 'login_user_success';
```


* In ./src/actions/index.js add an export for the loginUser action creator. This is called with a parameter object containing the email and password data. This action will attempt to sign in the user to firebase.

**With *redux-thunk* installed, *action creators* can not only return *actions* (objects with a *type* property), but they can also return functions that can be called with *dispatch*. This way async actions can be performed.**

```
import { LOGIN_USER_SUCCESS } from'./types';
import firebase from 'firebase';
```
```
export const loginUser =  ( { email, password } ) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      });
  };
}
```

Now the action is dispatched after the callback has received a response (.then runs after the request is completed). We are manually dispatching when we are ready.

* In LoginForm.js, import and connect the loginUser action creator.

```
import { emailChanged, passwordChanged, loginUser } from '../actions';
```
```
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
```

* Create the onButtonPress event handler and call it with the button onPress event.

```
onButtonPress() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}
```
```
<Button onPress={this.onButtonPress.bind(this)}>
```
Now, when the login button is touched, an attempt for user login is performed and the successful login is being handled with an appropriate action being dispatched.



&nbsp;
## 07 Update AuthReducer for LOGIN_USER_SUCCESS

* Edit AuthReducer in order to include the LOGIN_USER_SUCCESS action.

```
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS
 } from'../actions/types';

const INITIAL_STATE = {
   email: '',
   password: '',
   user: null
  };  
```
```
case LOGIN_USER_SUCCESS:
  return { ...state, user: action.payload };
```


&nbsp;
## 08 Create new user

* Add a catch to loginUser, so that on authentication failure an attempt to create a new user will be made.
```
export const loginUser =  ( { email, password } ) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      });
  };
}
```


* Since we come to the same result in both cases of sign-in or create-user, we can refactor by creating the loginUserSuccess helper.

```
const loginUserSuccess = (dispatch, user) =>  {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
};
```
```
export const loginUser =  ( { email, password } ) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user));
      });
  };
}
```


&nbsp;
## 09 Handle login fail


* In ./src/actions/types.js export a constant for login fail.

```
export const LOGIN_USER_FAIL = 'login_user_fail';
```

* In ./src/actions/index.js, configure the loginUserFail helper which dispatches an action with a type of LOGIN_USER_FAIL.

```
import { LOGIN_USER_FAIL } from'./types';
```
```
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
```

* Handle the case with another catch.

```
export const loginUser =  ( { email, password } ) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
           .catch(() => loginUserFail(dispatch));
      });
  };
}
```

* Update AuthReducer for LOGIN_USER_FAIL. Initialize the error piece of state.

```
import { LOGIN_USER_FAIL } from'../actions/types';
```
```
const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: ''
 };
```

* On failure show an error message and clear the password. Add the clearing of the error message in the case of successful login.

```
case LOGIN_USER_SUCCESS:
  return { ...state, user: action.payload, error: '' };
case LOGIN_USER_FAIL:
  return { ...state, error: 'Authentication Failed.', password: '' };
```


* In LoginForm.js, map the error state to props.

```
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error
  };
};
```

* And display the styled error message above the button.

```
import { Text } from 'react-native';
```
```
<Text style={styles.errorTextStyle}>
  {this.props.error}
</Text>
```
```
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
```



&nbsp;
## 10 Show a spinner

* In ./src/actions/types.js export a constant for user login.

```
export const LOGIN_USER = 'login_user';
```


* In ./src/actions/index.js, dispatch the action with a type of LOGIN_USER before the firebase authentication for signing in begins.

```
import { LOGIN_USER } from'./types';
```
```
export const loginUser =  ( { email, password } ) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });    
    firebase.auth().signInWithEmailAndPassword(email, password)
```


* Update AuthReducer for LOGIN_USER. Introduce the loading piece of state and set it to true in the case of LOGIN_USER. Clear the error in the case of LOGIN_USER. Set loading to false on other cases. Also clear the email and password on successful login.

```
import { LOGIN_USER } from'../actions/types';
```
```
const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
 };
```
```
case LOGIN_USER:
  return { ...state, loading: true, error: '' };
case LOGIN_USER_SUCCESS:
  return { ...state, user: action.payload, loading: false, error: '', email: '', password: '' };
case LOGIN_USER_FAIL:
  return { ...state, error: 'Authentication Failed.', loading: false, password: '' };
```


* In LoginForm.js, map the loading state to props.

```
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};
```

* Import Spinner.

```
import { Spinner } from './common';
```

* Define the renderButtonOrSpinner helper method and replace the Button code with it.

```
renderButtonOrSpinner() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }
  return (
    <Button onPress={this.onButtonPress.bind(this)}>
      Login
    </Button>
  );
}
```

```
<CardSection>
  { this.renderButtonOrSpinner() }
</CardSection>
```







&nbsp;
## 10 react-native-router-flux

* Install the react-native-router-flux library.

```
$ npm install --save react-native-router-flux
```

* In src, create Router.js.

*./src/Router.js*
```
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
  return (
    <Router>
      <Scene
        key="login"
        component={LoginForm}
        title="Please Login"
        initial
      />
    </Router>
  );
};

export default RouterComponent;
```

* In App.js

```
import Router from './Router';
```

and replace the LoginForm tag

```
return (
  <Provider store={store} >
    <Router />
  </Provider>
);
```
