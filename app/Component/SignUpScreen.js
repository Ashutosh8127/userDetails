import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  TouchableHighlight,
  ActivityIndicator,
  Button,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { DismissKeyboard } from './helper/DismissKeyBoard';
import { api } from '../utils/api';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      email: '',
      contactNo: '',
      username: '',
      password: '',
      cnfmPasswd: '',
      isLoading: false,
      error: '',
    }
  }
  closePopup = () => {
    this.props.navigation.goBack()
  }
  checkDetailsIsValid(details) {
      if(!details.name.trim()){
        return "name";
      }
      if(!details.email.trim()) {
        return "email";
      }
      if(!details.contactNo.trim()) {
        return "contactno";
      }
      if(!details.username.trim()) {
        return "username";
      }
      if(!details.password.trim()) {
        return "password";
      }
      if(!details.cnfmPasswd.trim()) {
        return "cnfmPassword";
      }
      if(details.password!==details.cnfmPasswd) {
        return "password and cnfm password";
      }
  }
  storeData = async (data) => {
    await AsyncStorage.setItem('login', 'true');
    await AsyncStorage.setItem('userDetails', JSON.stringify(data));
    this.props.navigation.navigate('App');
    this.setState({
      name: '',
      email: '',
      contactNo: '',
      username: '',
      password: '',
      isLoading: false
    })
    this.props.navigation.goBack();
  }
  signUpAsync = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let { name, email, contactNo, username, password, cnfmPasswd } = this.state;
    Keyboard.dismiss();
    this.setState({
      isLoading: true,
      error: ''
    });
    if (name.trim() && email.trim() && contactNo.trim() && username.trim() && password.trim()===cnfmPasswd.trim()) {
      if(reg.test(email) === true) {
        api.signUp(name, email, contactNo, username, password)
        .then((data) => {
          api.authUser(username, password)
          .then((authData) => {
            this.storeData(authData)
          })
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
          error: `Please enter valid email`
        });
      }
    } else {
      const details = { name, email, contactNo, username, password, cnfmPasswd }
      const geteror = this.checkDetailsIsValid(details);
      this.setState({
        isLoading: false,
        error: `Please enter valid ${geteror}`
      });
    }
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
    return(
      <DismissKeyboard>
      <ScrollView style={styles.container}>
        <View style={styles.cancelImageContainer}>
          <TouchableHighlight
            onPress={this.closePopup}
            underlayColor='transparent'
          >
            <Image 
              style={styles.cancelImage}
              source={require('../images/Cancel.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={require('../images/analyticsFox.png')}
          />
        </View>
        <View style={styles.signUpContainer}>
          <View style={styles.loginHeadingContainer}>
            <Text style={styles.loginHeadingText}>Sign Up</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={this.state.name}
              placeholder='Name'
              placeholderTextColor='rgba(255,255,255, 0.9)'
              selectionColor='#002d66'
              onChangeText={(text) => this.setState({ name: text })}
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              keyboardAppearance='light'
              enablesReturnKeyAutomatically={true}
              underlineColorAndroid='transparent'
            >
            </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={this.state.email}
              placeholder='E-Mail'
              placeholderTextColor='rgba(255,255,255, 0.9)'
              selectionColor='#002d66'
              onChangeText={(text) => this.setState({ email: text })}
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              keyboardType="email-address"
              keyboardAppearance='light'
              enablesReturnKeyAutomatically={true}
              underlineColorAndroid='transparent'
            >
            </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={this.state.contactNo}
              placeholder='Contanct Number'
              placeholderTextColor='rgba(255,255,255, 0.9)'
              selectionColor='#002d66'
              onChangeText={(text) => this.setState({ contactNo: text })}
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              keyboardType="phone-pad"
              keyboardAppearance='light'
              enablesReturnKeyAutomatically={true}
              underlineColorAndroid='transparent'
            >
            </TextInput>
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
              // onSubmitEditing={this.handleSubmit.bind(this)}
              underlineColorAndroid='transparent'
            />  
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={(input) => { this.passwordInputRef = input; }}
              style={styles.textInput}
              value={this.state.cnfmPasswd}
              placeholder='Cnfm - Password'
              placeholderTextColor='rgba(255,255,255, 0.9)'
              selectionColor='#002d66'
              onChangeText={(text) => this.setState({ cnfmPasswd: text })}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType='go'
              keyboardAppearance='light'
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
              underlineColorAndroid='transparent'
            />  
          </View>
          <TouchableHighlight underlayColor='transparent' style={styles.buttonSignUp} onPress={this.signUpAsync}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableHighlight>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}> you have already a account?</Text>
            {/* <Button title="Login" onPress={this.closePopup} /> */}
            <TouchableHighlight style={{justifyContent: 'center'}} underlayColor='transparent' onPress={this.closePopup}>
              <Text style={{fontSize: 16,color: 'blue', textAlign: 'center',paddingLeft: 10, paddingTop: 10,}}>Login</Text>
            </TouchableHighlight>
          </View>
          {showLoading}
          {showError}
          </View>
      </ScrollView>
      </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(19, 88, 174, 0.4)'
  },
  cancelImageContainer: {
    marginTop: 40,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  signUpContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 25,
    margin: 20,
  },
  loginHeadingContainer: {
    borderBottomWidth: 0.5,
    paddingBottom: 11, 
    marginBottom: 11
  },
  loginHeadingText: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'left',
    paddingLeft: 3
  },
  cancelImage: {
    width: 50,
    height: 50,
  },
  headerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 200,
    height: 100
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
  buttonSignUp: {
    marginTop: 11,
    backgroundColor: 'blue',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  signUpText: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginContainer: {
    // marginTop: 11,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginText: {
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
})