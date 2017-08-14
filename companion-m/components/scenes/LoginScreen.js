import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

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
        <TextInput
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
      <Text>Password</Text>
        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry
        />
      </View>
    );
  }
}
