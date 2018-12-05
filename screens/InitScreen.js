import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import t from 'tcomb-form-native';
import * as Expo from 'expo';
import * as firebase from 'firebase';

import * as GOOGLE from '../constants/Google';
import firebaseService from '../services/firebase';

const Form = t.form.Form;

const Name = t.struct({
  firstName: t.String,
  lastName: t.String,
});

const options = {
  fields: {
    firstName: {
      label: 'First name',
      placeholder: 'Enter your first name',
      error: 'First name is required.',
      autoCapitalize: 'words',
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Enter your last name',
      error: 'Last name is required.',
      autoCapitalize: 'words',
    }
  }
};

class InitScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: '',
    }
  }

  storeItem = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      return error;
    }
  };

  retrieveItem = async (key) => {
    try {
      const res = await AsyncStorage.getItem(key);
      return res;
    } catch (error) {
      return error;
    }
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    
    if (value !== null) {
      const { firstName, lastName } = value;
      this.storeItem('name', JSON.stringify({
        firstName,
        lastName,
      }))
      .then(() => {
        this.setState({ error: '' });
      })
      .catch(error => {
        this.setState({ error });
      });
    }
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: GOOGLE.IOS_CLIENT_ID,
        iosClientId: GOOGLE.ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken);

        firebaseService.auth().signInAndRetrieveDataWithCredential(credential)
          .then(() => {
            console.log('yay');
            this.storeItem('userToken', result.accessToken);
          })
          .catch(error => {
            console.log(error);
            return {error: true};
          });

        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      console.log(e);
      return {error: true};
    }
  };

  //Fix sign in with google later

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.title}>
          Getting started
        </Text>
        <Button
          title="Sign in with Google"
          onPress={this.signInWithGoogleAsync}
        />
        <Text style={styles.or}>
          OR
        </Text>
        <Form 
          type={Name} 
          options={options}
          ref={c => this._form = c}
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
        {this.state.error ? <p style={{color: 'red'}}>{error.message}</p> : null}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 20,
  },
  or: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
  },
});

export default InitScreen;