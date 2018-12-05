import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import InitScreen from '../screens/InitScreen';
import JoinScreen from '../screens/JoinScreen';

const AppStack = createStackNavigator({ Join: JoinScreen });
const AuthStack = createStackNavigator({ Init: InitScreen });

// https://reactnavigation.org/docs/en/auth-flow.html
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));