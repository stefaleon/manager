import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          initial
        />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
