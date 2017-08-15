import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Button from '../common/Button'

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
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <Text>Password</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry
        />
        <Button>HELLO</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
