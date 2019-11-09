/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppContainer from './app/utils/Navigator';
import { useScreens } from 'react-native-screens';

useScreens()

class App extends Component {
  render() {
    return (
        <AppContainer />
    );  
  }
}
export default App;
