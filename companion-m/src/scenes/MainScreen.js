import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../common/Button';
import Input from '../common/Input';
import { marginTop } from '../styles/layout';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activity: null
    };
  }

  componentWillMount() {
    const memberRoute = `http://192.168.0.139:3000/members/${this.props.id}`;
    fetch(memberRoute).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      this.setState({ activity: json.activity });
    }).catch((error) => {
      console.error(error);
    });
  }

  renderActivityLabel() {
    return (
      <View>
        <Text>{this.state.activity}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderActivityLabel()}
        <Button />
        <Button />
        <Button />
        <Button />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
