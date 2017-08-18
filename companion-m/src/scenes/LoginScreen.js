import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../common/Button';
import Input from '../common/Input';
import { marginTop } from '../styles/layout';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.credentials = {
      email: 'lbkchen@gmail.com',
      password: 'password',
    }

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  setEmail(text) {
    this.credentials.email = text;
  }

  setPassword(text) {
    this.credentials.password = text;
  }

  loginUser() {
    const authRoute = 'http://192.168.0.139:3000/members/sign_in';
    fetch(authRoute, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member: {
          email: this.credentials.email,
          password: this.credentials.password,
        },
      }),
    }).then((response) => {
      console.log(response);
      if (response.ok === true) {
        return response.json();
      } else {
        console.error(response);
      }
    }).then((json) => {
      console.log(json);
      Actions.main({ id: json.id });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={[marginTop.xxl]}>
        <Input
          label="EMAIL"
          style={[marginTop.lg, marginLeftRight.xxl]}
          onChangeText={this.setEmail}
          text={this.credentials.email}
        />
        <Input
          label="PASSWORD"
          style={[marginTop.lg, marginLeftRight.xxl]}
          onChangeText={this.setPassword}
          text={this.credentials.password}
          secureTextEntry
        />
        <Button
          style={[marginTop.xxxl, marginLeftRight.xxl, styles.button]}
          onPress={this.loginUser}
          text="LOGIN"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});
