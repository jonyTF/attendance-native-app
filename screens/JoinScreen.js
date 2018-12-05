import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

class JoinScreen extends Component {
  static navigationOptions = {
    title: 'Join',
  };

  constructor(props) {
    super(props);

    this.state = {
      roomCode: '',
      placeholder: 'Enter room code',
    }
  }

  onSubmit = () => {
    
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={{textAlign: 'center', fontSize: 25}}>Join a room:</Text>
        <TextInput 
          style={styles.textInput}
          autoCapitalize="none"
          placeholder={this.state.placeholder}
          maxLength={6}
          returnKeyType="go"
          onChangeText={roomCode => this.setState({ roomCode })}
          onFocus={() => this.setState({ placeholder: '' })}
          onBlur={() => this.setState({ placeholder: 'Enter room code' })}
          onSubmitEditing={this.onSubmit}
        />
        <Button
          title="Join"
          onPress={this.onSubmit}
        />
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
  textInput: {
    height: 50,
    fontSize: 40,
    padding: 5,
    textAlign: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default JoinScreen;