import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  Button,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { capitalize } from '../utils/utils';
import Separator from './helper/Seperator';

export default class Dashboard extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Welcome to the app!',
    headerRight: () => (
      <TouchableHighlight
        onPress={() => { navigation.navigate('Edit')}}
        color="#fff"
        underlayColor="transparent"
        style={{ width: 50, height: 50, flex: 1,justifyContent: 'center'}}
      >
        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Edit</Text>
      </TouchableHighlight>
    )
  });
  _isMounted = false;
  constructor(props) {
    super(props)
    this.state={
      name: '',
      username: '',
      email: '',
      mobile: '',
      password: ''
    }
  }
  updateDetails = async () => {
    let userDetails = await AsyncStorage.getItem('userDetails');
    let details = JSON.parse(userDetails);
    if(details) {
      this.setState({
        name: details.Name,
        username: details.UserName,
        email: details.Email,
        mobile: details.Phone,
        password: details.Password
      })
    } else {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    }
  }
  async componentDidMount() {
    this._isMounted = true;
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        if(this._isMounted) {
          this.updateDetails()
        }
      })
      let userDetails = await AsyncStorage.getItem('userDetails');
      let details = JSON.parse(userDetails);
      if(details) {
        if(this._isMounted) {
          this.setState({
            name: details.Name,
            username: details.UserName,
            email: details.Email,
            mobile: details.Phone,
            password: details.Password
          })
        }
      } else {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      }
    }
  componentWillUnmount () {
    this._isMounted = false;
    this.focusListener.remove()
  }
  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
    renderProfileDetails() {
      const { name, username, email, mobile, password } = this.state;
      const rowsDetails = {
        name,
        username,
        email,
        mobile,
        password
      };
      return (
        Object.keys(rowsDetails).map((topic) => {
          return(
            <View key={topic}>
              <View style={styles.rowContainer}>
                <Text style={styles.rowTitle}>
                  {capitalize(topic)}
                </Text>
                <Text style={styles.rowContent}>
                  {rowsDetails[topic]}
                </Text>
              </View>
              <Separator />
            </View>
          )
        })
      );
    };
    render() {
      return (
        <View style={styles.mainContainer}>
          <ScrollView  contentContainerStyle={styles.container}>
          {this.renderProfileDetails()}
          <View style={{marginTop: 10}}>
          <Button title="sign me out :)" onPress={this.signOutAsync} />
          </View>
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    container: {
      backgroundColor: '#F5FCFF'
    },
    rowContainer: {
      backgroundColor: '#ffffff',
      padding: 10
    },
    rowTitle: {
      fontSize: 16,
      color: 'rgb(14, 122, 254)'
    },
    rowContent: {
      fontSize: 19,
      color: '#000000'
    }
  });