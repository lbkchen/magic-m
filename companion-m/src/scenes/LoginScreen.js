import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Button from '../common/Button';
import Input from '../common/Input';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  render() {

    return (
      <View>
        <Text>Username</Text>
        <Input />
        <Text>Password</Text>
        <Input secureTextEntry />
        <Button>HELLO</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
