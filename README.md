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
