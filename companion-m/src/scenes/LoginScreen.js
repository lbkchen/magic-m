import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Button from '../common/Button';
import Input from '../common/Input';
import { marginTop } from '../styles/layout';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.credentials = {
      username: '',
      password: '',
    }

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(text) {
    this.credentials.username = text;
  }

  setPassword(text) {
    this.credentials.password = text;
  }

  loginUser() {
    const authRoute = '';
    fetch(authRoute, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.credentials.username,
        password: this.credentials.password,
      }),
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
    }).catch((error) => {
      console.error(error); 
    });
  }

  render() {
    return (
      <View style={[marginTop.xxl]}>
        <Input
          label="USERNAME"
          style={[marginTop.lg, marginLeftRight.xxl]}
          onChangeText={this.setUsername}
        />
        <Input
          label="PASSWORD"
          style={[marginTop.lg, marginLeftRight.xxl]}
          onChangeText={this.setPassword}
          secureTextEntry
        />
        <Button style={[marginTop.xxxl, marginLeftRight.xxl]}>
          HELLO
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
