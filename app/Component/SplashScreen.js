import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.check();
  }

  check = async () => {
    const login = await AsyncStorage.getItem('login');
    this.props.navigation.navigate(login ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ margin: 20, alignSelf: 'stretch'}}
          source={require('../images/analyticsFox.png')}
        />
        <ActivityIndicator 
         size="large"
        />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})