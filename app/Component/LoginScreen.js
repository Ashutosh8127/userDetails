import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Keyboard,
  TouchableHighlight,
  Button,
  KeyboardAvoidingView,
  View,
  ScrollView
} from 'react-native';
import { api } from '../utils/api';
import { DismissKeyboard } from './helper/DismissKeyBoard';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state={
      username: '',
      password: '',
      isLoading: false,
      error: '',
    }
  }
  storeData = async (data) => {
    await AsyncStorage.setItem('login', 'true');
    await AsyncStorage.setItem('userDetails', JSON.stringify(data));
  }
  handleSubmit = () => {
    let { username, password } = this.state;
    Keyboard.dismiss();
    this.setState({
      isLoading: true,
      error: ''
    });
    if (username.trim() && password.trim()) {
      api.authUser(username, password)
        .then((authData) => {
          this.storeData(authData);
          setTimeout(() => {
            this.props.navigation.navigate('App');
            this.setState({
              username: '',
              password: '',
              isLoading: false
            });
          }, 1000);
        })
        .catch((e) => {
          this.setState({
            isLoading: false,
            error: e.message
          });
        });
      } else {
        this.setState({
          isLoading: false,
          error: 'Please enter your username & password'
        });
      }
  };
  openSignUpScreen = () => {
    this.props.navigation.navigate('SignUp');
  }
  render() {
    var showError = (
      this.state.error ?
        (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.alertText, { marginRight: 10 }]}>
              {`${this.state.error}`}
            </Text>
          </View>
        ) :
        null
    );
    var showLoading = (
      this.state.isLoading ?
      (
      <ActivityIndicator
        animating={this.state.isLoading}
        color='#ffffff'
        size='large'
      />
      ) :
      null
    );
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={false}>
            <View style={styles.loginContainer}>
              <View style={styles.loginHeadingContainer}>
                <Text style={styles.loginHeadingText}>Login</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.username}
                  placeholder='Username'
                  placeholderTextColor='rgba(255,255,255, 0.9)'
                  selectionColor='#002d66'
                  onChangeText={(text) => this.setState({ username: text })}
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  keyboardAppearance='light'
                  enablesReturnKeyAutomatically={true}
                  onSubmitEditing={(event) => this.passwordInputRef.focus()}
                  underlineColorAndroid='transparent'
                >
                </TextInput>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={(input) => { this.passwordInputRef = input; }}
                  style={styles.textInput}
                  value={this.state.password}
                  placeholder='Password'
                  placeholderTextColor='rgba(255,255,255, 0.9)'
                  selectionColor='#002d66'
                  onChangeText={(text) => this.setState({ password: text })}
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType='go'
                  keyboardAppearance='light'
                  enablesReturnKeyAutomatically={true}
                  blurOnSubmit={true}
                  onSubmitEditing={this.handleSubmit}
                  underlineColorAndroid='transparent'
                />  
              </View>
                <TouchableHighlight style={styles.buttonLogin} underlayColor='transparent' onPress={this.handleSubmit}>
                  <Text style={styles.loginText}>Sign in</Text>
                </TouchableHighlight>
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}> Don't have an account?</Text>
                  <TouchableHighlight style={{justifyContent: 'center'}} underlayColor='transparent' onPress={this.openSignUpScreen}>
                    <Text style={{fontSize: 16, color: 'blue', textAlign: 'center',paddingLeft: 10, paddingTop: 10,}}>Sign Up</Text>
                  </TouchableHighlight>
                </View>
                {showLoading}
                {showError}
            </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#002d66',
    padding: 25,
    margin: 20,
    backgroundColor: 'rgba(19, 88, 174, 0.4)'
  },
  loginHeadingContainer: {
    borderBottomWidth: 0.5,
    paddingBottom: 11, 
    marginBottom: 11
  },
  loginHeadingText: {
    fontSize: 22,
    fontWeight: '200',
    color: '#ffffff',
    textAlign: 'left',
    paddingLeft: 3
  },
  inputContainer: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff'
  },
  textInput: {
    color: '#ffffff',
    fontWeight: 'bold',
    height: 40,
    padding: 3,
  },
  buttonLogin: {
    marginTop: 11,
    backgroundColor: 'blue',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  loginText: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signUpContainer: {
    // marginTop: 11,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signUpText: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(199, 42, 50)',
    alignSelf: 'center',
    textAlign: 'center'
  }
});