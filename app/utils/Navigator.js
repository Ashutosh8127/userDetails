import React, {Component} from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../Component/SplashScreen';
import DashBoard from '../Component/Dashboard';
import LoginScreen from '../Component/LoginScreen';
import SinUpScreen from '../Component/SignUpScreen';
import EditUserInfo from '../Component/EditUserInfo';

const SplashStack = createStackNavigator({ Splash: SplashScreen });
const AppStack = createStackNavigator({
  Home: { screen: DashBoard },
  Edit: {screen: EditUserInfo}
});
const AuthStack = createStackNavigator({ SignIn: {screen: LoginScreen}, SignUp: {screen: SinUpScreen} },
    {
    mode: 'modal',
    headerMode: 'none',
  });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashStack,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);