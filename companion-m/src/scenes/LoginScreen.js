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
  }

  render() {
    return (
      <View style={[marginTop.xxl]}>
        <Input label="USERNAME" style={[marginTop.lg, marginLeftRight.xxl]} />
        <Input label="PASSWORD" style={[marginTop.lg, marginLeftRight.xxl]} secureTextEntry />
        <Button style={[marginTop.xxxl, marginLeftRight.xxl]}>
          HELLO
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
