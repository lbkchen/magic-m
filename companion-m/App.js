import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './src/scenes/LoginScreen';
import MainScreen from './src/scenes/MainScreen';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={LoginScreen} title="Login" />
          <Scene key="main" component={MainScreen} title="Main" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
